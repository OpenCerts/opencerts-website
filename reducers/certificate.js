import _ from "lodash";

export const initialState = {
  raw: null,
  store: null,
  storeError: null,

  issuerIdentity: null,

  verifying: false,
  verifyTriggered: false,

  certificateHash: false,
  certificateIssued: false,
  certificateNotRevoked: false,
  certificateIssuer: false,

  certificateHashVerifying: false,
  certificateIssuedVerifying: false,
  certificateNotRevokedVerifying: false,
  certificateIssuerVerifying: false,

  certificateHashError: null,
  certificateIssuedError: null,
  certificateNotRevokedError: null,
  certificateIssuerError: null
};

// Actions
export const types = {
  UPDATE_CERTIFICATE: "UPDATE_CERTIFICATE",
  UPDATE_FILTERED_CERTIFICATE: "UPDATE_FILTERED_CERTIFICATE",

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
    "VERIFYING_CERTIFICATE_REVOCATION_FAILURE",

  VERIFYING_CERTIFICATE_ISSUER_SUCCESS: "VERIFYING_CERTIFICATE_ISSUER_SUCCESS",
  VERIFYING_CERTIFICATE_ISSUER_FAILURE: "VERIFYING_CERTIFICATE_ISSUER_FAILURE"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_CERTIFICATE:
      return {
        ...initialState,
        raw: action.payload
      };
    case types.UPDATE_FILTERED_CERTIFICATE:
      return {
        ...state,
        raw: action.payload.certificate
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
        issuerIdentity: null,

        certificateHash: false,
        certificateIssued: false,
        certificateNotRevoked: false,
        certificateIssuer: false,

        certificateHashVerifying: true,
        certificateIssuedVerifying: true,
        certificateNotRevokedVerifying: true,
        certificateIssuerVerifying: true,

        certificateHashError: null,
        certificateIssuedError: null,
        certificateNotRevokedError: null,
        certificateIssuerError: null
      };
    case types.VERIFYING_CERTIFICATE_HASH_SUCCESS:
      return {
        ...state,
        certificateHash: true,
        certificateHashError: null,
        certificateHashVerifying: false
      };
    case types.VERIFYING_CERTIFICATE_HASH_FAILURE:
      return {
        ...state,
        certificateHash: false,
        certificateHashError: action.payload,
        certificateHashVerifying: false
      };
    case types.VERIFYING_CERTIFICATE_ISSUED_SUCCESS:
      return {
        ...state,
        certificateIssued: true,
        certificateIssuedError: null,
        certificateIssuedVerifying: false
      };
    case types.VERIFYING_CERTIFICATE_ISSUED_FAILURE:
      return {
        ...state,
        certificateIssued: false,
        certificateIssuedError: action.payload,
        certificateIssuedVerifying: false
      };
    case types.VERIFYING_CERTIFICATE_REVOCATION_SUCCESS:
      return {
        ...state,
        certificateNotRevoked: true,
        certificateNotRevokedError: null,
        certificateNotRevokedVerifying: false
      };
    case types.VERIFYING_CERTIFICATE_REVOCATION_FAILURE:
      return {
        ...state,
        certificateNotRevoked: false,
        certificateNotRevokedError: action.payload,
        certificateNotRevokedVerifying: false
      };
    case types.VERIFYING_CERTIFICATE_ISSUER_FAILURE:
      return {
        ...state,
        certificateIssuer: false,
        certificateIssuerVerifying: false,
        certificateIssuerError: action.payload
      };
    case types.VERIFYING_CERTIFICATE_ISSUER_SUCCESS:
      return {
        ...state,
        issuerIdentity: action.payload,
        certificateIssuer: true,
        certificateIssuerVerifying: false,
        certificateIssuerError: null
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

export function updateFilteredCertificate(payload) {
  return {
    type: types.UPDATE_FILTERED_CERTIFICATE,
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

export function getIssuerError(store) {
  return store.certificate.certificateIssuerError;
}

export function getIsIssuerVerified(store) {
  return store.certificate.certificateIssuer;
}

export function getCertificateHashVerifying(store) {
  return store.certificate.certificateHashVerifying;
}

export function getCertificateIssuedVerifying(store) {
  return store.certificate.certificateIssuedVerifying;
}

export function getCertificateNotRevokedVerifying(store) {
  return store.certificate.certificateNotRevokedVerifying;
}

export function getCertificateIssuerVerifying(store) {
  return store.certificate.certificateIssuerVerifying;
}

export function getIssuerIdentity(store) {
  return store.certificate.issuerIdentity;
}
