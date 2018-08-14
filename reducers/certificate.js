export const initialState = {
  raw: null,
  store: null,
  storeError: null,
  storeLoading: false,

  issuerIdentity: null,

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
  NETWORK_RESET: "NETWORK_RESET", // For network change

  UPDATE_CERTIFICATE: "UPDATE_CERTIFICATE",
  UPDATE_FILTERED_CERTIFICATE: "UPDATE_FILTERED_CERTIFICATE",

  LOADING_STORE_SUCCESS: "LOADING_STORE_SUCCESS",
  LOADING_STORE_FAILURE: "LOADING_STORE_FAILURE",

  VERIFYING_CERTIFICATE: "VERIFYING_CERTIFICATE",

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
    case types.NETWORK_RESET:
      return {
        ...initialState
      };
    case types.UPDATE_CERTIFICATE:
      return {
        ...initialState,
        raw: action.payload,
        store: null,
        storeError: null,
        storeLoading: true
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
        storeError: null,
        storeLoading: false
      };
    case types.LOADING_STORE_FAILURE:
      return {
        ...state,
        storeError: action.payload,
        storeLoading: false
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
export function getIssuerIdentityStatus(store) {
  const {
    issuerIdentity,
    certificateIssuerVerifying,
    certificateIssuerError,
    certificateIssuer
  } = store.certificate;
  return {
    identity: issuerIdentity,
    verified: certificateIssuer,
    verifying: certificateIssuerVerifying,
    error: certificateIssuerError
  };
}

export function getHashStatus(store) {
  const {
    certificateHash,
    certificateHashError,
    certificateHashVerifying
  } = store.certificate;
  return {
    verified: certificateHash,
    verifying: certificateHashVerifying,
    error: certificateHashError
  };
}

export function getIssuedStatus(store) {
  const {
    certificateIssued,
    certificateIssuedError,
    certificateIssuedVerifying
  } = store.certificate;
  return {
    verified: certificateIssued,
    verifying: certificateIssuedVerifying,
    error: certificateIssuedError
  };
}

export function getNotRevokedStatus(store) {
  const {
    certificateNotRevoked,
    certificateNotRevokedError,
    certificateNotRevokedVerifying
  } = store.certificate;
  return {
    verified: certificateNotRevoked,
    verifying: certificateNotRevokedVerifying,
    error: certificateNotRevokedError
  };
}

export function getCertificate(store) {
  return store.certificate.raw;
}

export function getCertificateStore(store) {
  return store.certificate.store;
}

export function getVerifyTriggered(store) {
  return store.certificate.verifyTriggered;
}

export function getVerifying(store) {
  const {
    storeLoading,
    certificateIssuerVerifying,
    certificateHashVerifying,
    certificateIssuedVerifying,
    certificateNotRevokedVerifying
  } = store.certificate;
  return (
    store.application.networkUpdatePending ||
    storeLoading ||
    certificateIssuerVerifying ||
    certificateHashVerifying ||
    certificateIssuedVerifying ||
    certificateNotRevokedVerifying
  );
}
