import _ from "lodash";

export const initialState = {
  raw: null,
  store: null,
  storeError: null,

  verifying: false,
  verifyTriggered: false,

  certificateHash: false,
  certificateIssued: false,
  certificateNotRevoked: false,
  // certificateIssuer: false,

  certificateHashError: null,
  certificateIssuedError: null,
  certificateNotRevokedError: null
  // certificateIssuerError: null,
};

// Actions
export const types = {
  UPDATE_CERTIFICATE: "UPDATE_CERTIFICATE",
  LOADING_STORE_SUCCESS: "LOADING_STORE_SUCCESS",
  LOADING_STORE_FAILURE: "LOADING_STORE_FAILURE",

  VERIFYING_CERTIFICATE: "VERIFYING_CERTIFICATE",
  VERIFYING_CERTIFICATE_COMPLETE: "VERIFYING_CERTIFICATE_COMPLETE",

  VERIFYING_CERTIFICATE_HASH_SUCCESS: "VERIFYING_CERTIFICATE_HASH_SUCCESS",
  VERIFYING_CERTIFICATE_HASH_FAILURE: "VERIFYING_CERTIFICATE_HASH_FAILURE",

  VERIFYING_CERTIFICATE_ISSUED_SUCCESS: "VERIFYING_CERTIFICATE_ISSUED_SUCCESS",
  VERIFYING_CERTIFICATE_ISSUED_FAILURE: "VERIFYING_CERTIFICATE_ISSUED_FAILURE",

  VERIFYING_CERTIFICATE_REVOCATION_SUCCESS:
    "VERIFYING_CERTIFICATE_REVOCATION_SUCCESS",
  VERIFYING_CERTIFICATE_REVOCATION_FAILURE:
    "VERIFYING_CERTIFICATE_REVOCATION_FAILURE"
  /*
  VERIFYING_CERTIFICATE_ISSUER_SUCCESS: "VERIFYING_CERTIFICATE_ISSUER_SUCCESS",
  VERIFYING_CERTIFICATE_ISSUER_FAILURE: "VERIFYING_CERTIFICATE_ISSUER_FAILURE",
  */
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_CERTIFICATE:
      return {
        ...initialState,
        raw: action.payload
      };
    case types.LOADING_STORE_SUCCESS:
      return {
        ...state,
        store: action.payload,
        storeError: null
      };
    case types.LOADING_STORE_FAILURE:
      return {
        ...state,
        storeError: action.payload
      };
    case types.VERIFYING_CERTIFICATE:
      return {
        ...state,
        verifying: true,
        verifyTriggered: true,
        certificateHash: false,
        certificateIssued: false,
        certificateNotRevoked: false,
        certificateHashError: null,
        certificateIssuedError: null,
        certificateNotRevokedError: null
      };
    case types.VERIFYING_CERTIFICATE_COMPLETE:
      return {
        ...state,
        verifying: false,
        verified: true,
        verificationWarning: action.payload
      };
    case types.VERIFYING_CERTIFICATE_HASH_SUCCESS:
      return {
        ...state,
        certificateHash: true,
        certificateHashError: null
      };
    case types.VERIFYING_CERTIFICATE_HASH_FAILURE:
      return {
        ...state,
        certificateHash: false,
        certificateHashError: action.payload
      };
    case types.VERIFYING_CERTIFICATE_ISSUED_SUCCESS:
      return {
        ...state,
        certificateIssued: true,
        certificateIssuedError: null
      };
    case types.VERIFYING_CERTIFICATE_ISSUED_FAILURE:
      return {
        ...state,
        certificateIssued: false,
        certificateIssuedError: action.payload
      };
    case types.VERIFYING_CERTIFICATE_REVOCATION_SUCCESS:
      return {
        ...state,
        certificateNotRevoked: true,
        certificateNotRevokedError: null
      };
    case types.VERIFYING_CERTIFICATE_REVOCATION_FAILURE:
      return {
        ...state,
        certificateNotRevoked: false,
        certificateNotRevokedError: action.payload
      };
    default:
      return state;
  }
}

// Action Creators
export function updateCertificate(payload) {
  return {
    type: types.UPDATE_CERTIFICATE,
    payload
  };
}
export function verifyCertificate(payload) {
  return {
    type: types.VERIFYING_CERTIFICATE,
    payload
  };
}

// Selectors
export function getCertificate(store) {
  return store.certificate.raw;
}

export function getCertificateStore(store) {
  return store.certificate.store;
}

export function getCertificateRoot(store) {
  return _.get(store.certificate.raw, "signature.merkleRoot", null);
}

export function getContractStoreAddress(store) {
  return _.get(store.certificate.raw, "verification.contractAddress", null);
}

export function getVerifyTriggered(store) {
  return store.certificate.verifyTriggered;
}

export function getVerifying(store) {
  return store.certificate.verifying;
}

export function getHashVerified(store) {
  return store.certificate.certificateHash;
}

export function getIssued(store) {
  return store.certificate.certificateIssued;
}

export function getNotRevoked(store) {
  return store.certificate.certificateNotRevoked;
}

export function getHashError(store) {
  return store.certificate.certificateHashError;
}

export function getIssuedError(store) {
  return store.certificate.certificateIssuedError;
}

export function getNotRevokedError(store) {
  return store.certificate.certificateNotRevokedError;
}
