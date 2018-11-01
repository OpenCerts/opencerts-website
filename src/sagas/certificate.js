import { some, get, partition, compact, filter, isEmpty } from "lodash";
import { put, all, call } from "redux-saga/effects";
import { certificateData, verifySignature } from "@govtechsg/open-certificate";
import { isValidAddress as isEthereumAddress } from "ethereumjs-utils";
import Router from "next/router";
import { getLogger } from "../utils/logger";
import {
  types,
  verifyingCertificateIssuerSuccess
} from "../reducers/certificate";
import DocumentStoreDefinition from "../services/contracts/DocumentStore.json";
import fetchIssuers from "../services/issuers";
import { combinedHash } from "../utils";
import { ensResolveAddress, getText } from "../services/ens";

import { getSelectedWeb3 } from "./application";

const { trace, error } = getLogger("saga:certificate");

export function* loadCertificateContracts({ payload }) {
  try {
    const data = certificateData(payload);
    trace(`Loading certificate: ${data}`);
    const unresolvedContractStoreAddresses = get(data, "issuers", []).map(
      issuer => issuer.certificateStore
    );
    const web3 = yield getSelectedWeb3();
    const contractStoreAddresses = yield all(
      unresolvedContractStoreAddresses.map(unresolvedAddress =>
        call(ensResolveAddress, unresolvedAddress)
      )
    );
    trace(`Resolved certificate's store addresses, ${contractStoreAddresses}`);

    const { abi } = DocumentStoreDefinition;

    const contracts = contractStoreAddresses.map(
      address => new web3.eth.Contract(abi, address)
    );

    yield put({
      type: types.LOADING_STORE_SUCCESS
    });
    return contracts;
  } catch (e) {
    yield put({
      type: types.LOADING_STORE_FAILURE,
      payload: e
    });
    return null;
  }
}

export function* verifyCertificateHash({ certificate }) {
  const verified = verifySignature(certificate);
  if (verified) {
    yield put({
      type: types.VERIFYING_CERTIFICATE_HASH_SUCCESS
    });
    return true;
  }
  yield put({
    type: types.VERIFYING_CERTIFICATE_HASH_FAILURE
  });
  return false;
}

export function* verifyCertificateIssued({ certificate, certificateStores }) {
  try {
    const merkleRoot = `0x${get(certificate, "signature.merkleRoot", "")}`;

    // Checks if certificate has been issued on ALL store
    const issuedStatuses = yield all(
      certificateStores.map(store =>
        store.methods.isIssued(merkleRoot).call()
      )
    );
    const isIssued = issuedStatuses.reduce((prev, curr) => prev && curr, true);
    if (!isIssued) throw new Error("Certificate has not been issued");

    yield put({
      type: types.VERIFYING_CERTIFICATE_ISSUED_SUCCESS
    });
    return true;
  } catch (e) {
    yield put({
      type: types.VERIFYING_CERTIFICATE_ISSUED_FAILURE,
      payload: e.message
    });
    return false;
  }
}

export function* verifyCertificateNotRevoked({
  certificate,
  certificateStores
}) {
  try {
    const targetHash = get(certificate, "signature.targetHash", null);
    const proof = get(certificate, "signature.proof", null);

    // Checks if certificate and path towards merkle root has been revoked
    const combinedHashes = [`0x${targetHash}`];

    proof.reduce((accumulator, currentValue) => {
      const combined = combinedHash(accumulator, currentValue).toString("hex");
      combinedHashes.push(`0x${combined}`);
      return combined;
    }, targetHash);

    for (let i = 0; i < combinedHashes.length; i += 1) {
      const hash = combinedHashes[i];

      // Check if certificate is revoked on ALL store
      const revokedStatus = yield all(
        certificateStores.map(store => store.methods.isRevoked(hash).call())
      );
      const isRevoked = revokedStatus.reduce(
        (prev, curr) => prev || curr,
        false
      );
      if (isRevoked)
        throw new Error(`Certificate has been revoked, revoked hash: ${hash}`);
    }

    yield put({
      type: types.VERIFYING_CERTIFICATE_REVOCATION_SUCCESS
    });
    return true;
  } catch (e) {
    yield put({
      type: types.VERIFYING_CERTIFICATE_REVOCATION_FAILURE,
      payload: e.message
    });
    return false;
  }
}

function isApprovedENSDomain(issuerAddress) {
  trace(`Checking if ${issuerAddress} is opencerts TLD`);
  const approvedENSDomains = [/(opencerts.eth)$/];
  return some(
    approvedENSDomains.map(domainMask =>
      domainMask.test(issuerAddress.toLowerCase())
    )
  );
}

export function* lookupEthereumAddresses(ethereumAddressIssuers) {
  const registeredIssuers = yield fetchIssuers();

  return ethereumAddressIssuers.map(store => {
    const identity = registeredIssuers[store.toUpperCase()];

    if (!identity) {
      throw new Error(`Issuer identity cannot be verified: ${store}`);
    }

    return identity;
  });
}

export function* resolveEnsNamesToText(ensNames) {
  trace("resolving ", ensNames);
  if (some(ensNames.map(ensName => !isApprovedENSDomain(ensName)))) {
    const invalidEns = filter(ensNames, !isApprovedENSDomain);

    const invalidEnsError = new Error(
      `Issuer identity cannot be verified: ${invalidEns}`
    );
    error(invalidEnsError);
    throw invalidEnsError;
  }

  const getTextResults = yield all(
    ensNames.map(ensName => call(getText, ensName, "issuerName"))
  );
  trace(`Got texts records for ${ensNames}`, getTextResults);
  trace(getTextResults);
  return getTextResults;
}

export function* verifyCertificateIssuer({ certificate }) {
  try {
    const data = certificateData(certificate);
    const contractStoreAddresses = get(data, "issuers", []).map(
      issuer => issuer.certificateStore
    );
    trace(
      `Attempting to verify certificate issuers: ${contractStoreAddresses}`
    );

    const [ethereumAddressIssuers, unresolvedEnsNames] = partition(
      contractStoreAddresses,
      isEthereumAddress
    );

    let resolvedEnsTexts = [];
    let issuerIdentitiesFromRegistry = [];

    trace("ethereumAddressIssuers", ethereumAddressIssuers);
    trace("unresolvedEnsNames", unresolvedEnsNames);
    if (!isEmpty(compact(unresolvedEnsNames))) {
      resolvedEnsTexts = yield call(resolveEnsNamesToText, unresolvedEnsNames);
      trace(`Resolved ens name ${unresolvedEnsNames} to ${resolvedEnsTexts}`);
    }
    if (!isEmpty(compact(ethereumAddressIssuers))) {
      issuerIdentitiesFromRegistry = yield call(
        lookupEthereumAddresses,
        ethereumAddressIssuers
      );
      trace(
        `Resolved ethereum address ${ethereumAddressIssuers} to ${issuerIdentitiesFromRegistry}`
      );
    }

    const combinedIssuerIdentities = compact(
      issuerIdentitiesFromRegistry.concat(resolvedEnsTexts)
    );

    if (combinedIssuerIdentities.length === 0) {
      throw new Error(`Issuer identity missing in certificate`);
    }

    trace("combinedIssuerIdentities", combinedIssuerIdentities);
    yield put(verifyingCertificateIssuerSuccess(combinedIssuerIdentities));
    return true;
  } catch (e) {
    error(e);
    yield put({
      type: types.VERIFYING_CERTIFICATE_ISSUER_FAILURE,
      payload: e.message
    });
    return false;
  }
}

export function* verifyCertificate({ payload }) {
  yield put({
    type: types.VERIFYING_CERTIFICATE
  });
  const certificateStores = yield call(loadCertificateContracts, { payload });
  const args = { certificateStores, certificate: payload };
  const verificationStatuses = yield all([
    call(verifyCertificateHash, args),
    call(verifyCertificateIssued, args),
    call(verifyCertificateNotRevoked, args),
    call(verifyCertificateIssuer, args)
  ]);
  const verified = verificationStatuses.reduce((prev, curr) => prev && curr);
  if (verified) {
    Router.push("/viewer");
  }
}

export function* networkReset() {
  yield put({
    type: types.NETWORK_RESET
  });
}

export default loadCertificateContracts;
