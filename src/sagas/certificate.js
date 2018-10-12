import { some, get } from "lodash";
import { put, all, call } from "redux-saga/effects";
import { certificateData, verifySignature } from "@govtechsg/open-certificate";
import Router from "next/router";
import { types } from "../reducers/certificate";
import CertificateStoreDefinition from "../services/contracts/CertificateStore.json";
import fetchIssuers from "../services/issuers";
import { combinedHash } from "../utils";
import { ensResolveAddress } from "../services/ens";

import { getSelectedWeb3 } from "./application";

export function* loadCertificateContracts({ payload }) {
  try {
    const data = certificateData(payload);
    console.log(data);
    const unresolvedContractStoreAddresses = get(data, "issuers", []).map(
      issuer => issuer.certificateStore
    );
    // resolve ens here
    const web3 = yield getSelectedWeb3();
    const contractStoreAddresses = yield all(
      unresolvedContractStoreAddresses.map(unresolvedAddress =>
        call(ensResolveAddress, unresolvedAddress)
      )
    );
    console.log("contract store addresses", contractStoreAddresses);

    const { abi } = CertificateStoreDefinition;

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
        store.methods.isCertificateIssued(merkleRoot).call()
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
  const approvedENSDomains = [/(opencerts.eth)$/, /(opencerts2.test)$/];
  return some(
    approvedENSDomains.map(domainMask => domainMask.test(issuerAddress))
  );
}

export function* verifyCertificateIssuer({ certificate }) {
  try {
    const registeredIssuers = yield fetchIssuers();

    const data = certificateData(certificate);
    const contractStoreAddresses = get(data, "issuers", []).map(
      issuer => issuer.certificateStore
    );

    console.log(
      `verifying contract store addresses: ${contractStoreAddresses}`
    );

    const issuerIdentities = contractStoreAddresses.map(store => {
      const identity = registeredIssuers[store.toUpperCase()];

      if (isApprovedENSDomain(store)) {
        return "TODO: fetch text from ENS";
      }
      if (!identity)
        throw new Error(`Issuer identity cannot be verified: ${store}`);
      return identity;
    });

    yield put({
      type: types.VERIFYING_CERTIFICATE_ISSUER_SUCCESS,
      payload: issuerIdentities
    });
    return true;
  } catch (e) {
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
