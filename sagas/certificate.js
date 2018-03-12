import _ from "lodash";
import { put, all, call } from "redux-saga/effects";
import { Certificate } from "@govtechsg/open-certificate";
import { types } from "../reducers/certificate";
import getWeb3 from "../services/web3/getWeb3";
import CertificateStoreDefinition from "../services/contracts/CertificateStore.json";
import fetchIssuers from "../services/issuers";
import { combinedHash } from "../utils";

export function* loadCertificateContract({ payload }) {
  const contractStoreAddress = _.get(
    payload,
    "verification.contractAddress",
    null
  );

  try {
    const { abi } = CertificateStoreDefinition;
    const web3 = yield getWeb3();
    const contract = new web3.eth.Contract(abi, contractStoreAddress);
    // Hack to allow React Dev Tools to print contract object
    contract.toJSON = () =>
      `Contract Functions: ${Object.keys(contract).join("(), ")}()`;
    yield put({
      type: types.LOADING_STORE_SUCCESS,
      payload: { contract }
    });
  } catch (e) {
    yield put({
      type: types.LOADING_STORE_FAILURE,
      payload: e
    });
  }
}

export function* verifyCertificateHash({ payload }) {
  try {
    const { certificate } = payload;
    new Certificate(certificate).verify();

    yield put({
      type: types.VERIFYING_CERTIFICATE_HASH_SUCCESS
    });
  } catch (e) {
    yield put({
      type: types.VERIFYING_CERTIFICATE_HASH_FAILURE,
      payload: e.message
    });
  }
}

export function* verifyCertificateIssued({ payload }) {
  try {
    const { certificate, certificateStore } = payload;
    const merkleRoot = `0x${_.get(certificate, "signature.merkleRoot", null)}`;

    // Checks if certificate has been issued
    const isIssued = yield certificateStore.contract.methods
      .isCertificateIssued(merkleRoot)
      .call();
    if (!isIssued) throw new Error("Certificate has not been issued");

    yield put({
      type: types.VERIFYING_CERTIFICATE_ISSUED_SUCCESS
    });
  } catch (e) {
    yield put({
      type: types.VERIFYING_CERTIFICATE_ISSUED_FAILURE,
      payload: e.message
    });
  }
}

export function* verifyCertificateNotRevoked({ payload }) {
  try {
    const { certificate, certificateStore } = payload;
    const targetHash = _.get(certificate, "signature.targetHash", null);
    const proof = _.get(certificate, "signature.proof", null);

    // Checks if certificate and path towards merkle root has been revoked
    const combinedHashes = [`0x${targetHash}`];

    proof.reduce((accumulator, currentValue) => {
      const combined = combinedHash(accumulator, currentValue).toString("hex");
      combinedHashes.push(`0x${combined}`);
      return combined;
    }, targetHash);

    for (let i = 0; i < combinedHashes.length; i += 1) {
      const hash = combinedHashes[i];
      const isRevoked = yield certificateStore.contract.methods
        .isRevoked(hash)
        .call();
      if (isRevoked)
        throw new Error(`Certificate has been revoked, revoked hash: ${hash}`);
    }
    yield put({
      type: types.VERIFYING_CERTIFICATE_REVOCATION_SUCCESS
    });
  } catch (e) {
    yield put({
      type: types.VERIFYING_CERTIFICATE_REVOCATION_FAILURE,
      payload: e.message
    });
  }
}

export function* verifyCertificateIssuer({ payload }) {
  try {
    const { certificate, certificateStore, issuers } = payload;
    const certificateIssuer = _.get(certificate, "badge.issuer", null);

    if (certificateIssuer == null || certificateIssuer.id == null) {
      throw new Error("Certificate has no issuer");
    }

    const address = _.get(certificateStore, "contract.address", null);
    const valid = issuers[address] != null;

    if (valid) {
      yield put({
        type: types.VERIFYING_CERTIFICATE_ISSUER_SUCCESS
      });
    } else {
      yield put({
        type: types.VERIFYING_CERTIFICATE_ISSUER_FAILURE
      });
    }
  } catch (e) {
    yield put({
      type: types.VERIFYING_CERTIFICATE_ISSUER_FAILURE,
      payload: e.message
    });
  }
}

export function* verifyCertificate({ payload }) {
  yield all([
    call(verifyCertificateHash, { payload }),
    call(verifyCertificateIssued, { payload }),
    call(verifyCertificateNotRevoked, { payload }),
    call(verifyCertificateIssuer, { payload })
  ]);
  yield put({
    type: types.VERIFYING_CERTIFICATE_COMPLETE
  });
}

export function* loadIssuerList() {
  try {
    yield put({
      type: types.LOADING_ISSUER_LIST
    });

    const issuers = yield fetchIssuers();

    yield put({
      type: types.LOADING_ISSUER_LIST_SUCCESS,
      payload: issuers
    });
  } catch (e) {
    yield put({
      type: types.LOADING_ISSUER_LIST_FAILURE,
      payload: e.message
    });
  }
}

export default loadCertificateContract;
