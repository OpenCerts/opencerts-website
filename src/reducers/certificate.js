export const states = {
  INITIAL: "INITIAL",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE"
};

export const initialState = {
  raw: null,
  rawModified: null,
  store: null,
  storeError: null,
  storeLoading: false,

  issuerIdentities: null,

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
  certificateIssuerError: null,

  verificationStatus: [],

  emailState: states.INITIAL,
  emailError: null
};

// Actions
export const types = {
  NETWORK_RESET: "NETWORK_RESET", // For network change

  UPDATE_CERTIFICATE: "UPDATE_CERTIFICATE",

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
  VERIFYING_CERTIFICATE_ISSUER_FAILURE: "VERIFYING_CERTIFICATE_ISSUER_FAILURE",

  SENDING_CERTIFICATE: "SENDING_CERTIFICATE",
  SENDING_CERTIFICATE_SUCCESS: "SENDING_CERTIFICATE_SUCCESS",
  SENDING_CERTIFICATE_FAILURE: "SENDING_CERTIFICATE_FAILURE",
  SENDING_CERTIFICATE_RESET: "SENDING_CERTIFICATE_RESET",

  CERTIFICATE_OBFUSCATE_RESET: "CERTIFICATE_OBFUSCATE_RESET",
  CERTIFICATE_OBFUSCATE_UPDATE: "CERTIFICATE_OBFUSCATE_UPDATE"
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
        rawModified: action.payload,
        store: null,
        storeError: null,
        storeLoading: true
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
        issuerIdentities: null,

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
        certificateIssuerError: null,

        verificationStatus: []
      };
    case types.VERIFYING_CERTIFICATE_HASH_SUCCESS:
      return {
        ...state,
        certificateHash: true,
        certificateHashError: null,
        certificateHashVerifying: false,
        verificationStatus: [
          ...state.verificationStatus,
          {
            message: "Certificate integrity checked",
            warning: false,
            error: false
          }
        ]
      };
    case types.VERIFYING_CERTIFICATE_HASH_FAILURE:
      return {
        ...state,
        certificateHash: false,
        certificateHashError: action.payload,
        certificateHashVerifying: false,
        verificationStatus: [
          ...state.verificationStatus,
          {
            message: "Certificate has been tampered",
            warning: false,
            error: true
          }
        ]
      };
    case types.VERIFYING_CERTIFICATE_ISSUED_SUCCESS:
      return {
        ...state,
        certificateIssued: true,
        certificateIssuedError: null,
        certificateIssuedVerifying: false,
        verificationStatus: [
          ...state.verificationStatus,
          {
            message: "Certificate has been issued",
            warning: false,
            error: false
          }
        ]
      };
    case types.VERIFYING_CERTIFICATE_ISSUED_FAILURE:
      return {
        ...state,
        certificateIssued: false,
        certificateIssuedError: action.payload,
        certificateIssuedVerifying: false,
        verificationStatus: [
          ...state.verificationStatus,
          {
            message: "Certificate is not issued",
            warning: false,
            error: true
          }
        ]
      };
    case types.VERIFYING_CERTIFICATE_REVOCATION_SUCCESS:
      return {
        ...state,
        certificateNotRevoked: true,
        certificateNotRevokedError: null,
        certificateNotRevokedVerifying: false,
        verificationStatus: [
          ...state.verificationStatus,
          {
            message: "Certificate is issued",
            warning: false,
            error: false
          }
        ]
      };
    case types.VERIFYING_CERTIFICATE_REVOCATION_FAILURE:
      return {
        ...state,
        certificateNotRevoked: false,
        certificateNotRevokedError: action.payload,
        certificateNotRevokedVerifying: false,
        verificationStatus: [
          ...state.verificationStatus,
          {
            message: "Certificate has been revoked",
            warning: false,
            error: true
          }
        ]
      };
    case types.VERIFYING_CERTIFICATE_ISSUER_FAILURE:
      return {
        ...state,
        certificateIssuer: false,
        certificateIssuerVerifying: false,
        certificateIssuerError: action.payload,
        verificationStatus: [
          ...state.verificationStatus,
          {
            message: "Certificate issuer is registered",
            warning: false,
            error: false
          }
        ]
      };
    case types.VERIFYING_CERTIFICATE_ISSUER_SUCCESS:
      return {
        ...state,
        issuerIdentities: action.payload,
        certificateIssuer: true,
        certificateIssuerVerifying: false,
        certificateIssuerError: null,
        verificationStatus: [
          ...state.verificationStatus,
          {
            message: "Unknown certificate issuer",
            warning: false,
            error: false
          }
        ]
      };
    case types.SENDING_CERTIFICATE:
      return {
        ...state,
        emailState: states.PENDING,
        emailError: null
      };
    case types.SENDING_CERTIFICATE_RESET:
      return {
        ...state,
        emailState: states.INITIAL,
        emailError: null
      };
    case types.SENDING_CERTIFICATE_SUCCESS:
      return {
        ...state,
        emailState: states.SUCCESS,
        emailError: null
      };
    case types.SENDING_CERTIFICATE_FAILURE:
      return {
        ...state,
        emailState: states.FAILURE,
        emailError: action.payload
      };
    case types.CERTIFICATE_OBFUSCATE_RESET:
      return {
        ...initialState,
        rawModified: state.raw
      };
    case types.CERTIFICATE_OBFUSCATE_UPDATE:
      return {
        ...state,
        rawModified: action.payload
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

export function verifyingCertificateIssuerSuccess(payload) {
  return {
    type: types.VERIFYING_CERTIFICATE_ISSUER_SUCCESS,
    payload
  };
}

export function verifyingCertificateIssuerFailure({ error, certificate }) {
  return {
    type: types.VERIFYING_CERTIFICATE_ISSUER_FAILURE,
    error,
    certificate
  };
}

export function verifyingCertificateRevocationSuccess() {
  return {
    type: types.VERIFYING_CERTIFICATE_REVOCATION_SUCCESS
  };
}

export function verifyingCertificateRevocationFailure({ error, certificate }) {
  return {
    type: types.VERIFYING_CERTIFICATE_REVOCATION_FAILURE,
    error,
    certificate
  };
}

export function verifyingCertificateIssuedSuccess() {
  return {
    type: types.VERIFYING_CERTIFICATE_ISSUED_SUCCESS
  };
}

export function verifyingCertificateIssuedFailure({ error, certificate }) {
  return {
    type: types.VERIFYING_CERTIFICATE_ISSUED_FAILURE,
    error,
    certificate
  };
}

export function verifyingCertificateHashSuccess() {
  return {
    type: types.VERIFYING_CERTIFICATE_HASH_SUCCESS
  };
}

export function verifyingCertificateHashFailure({ error, certificate }) {
  return {
    type: types.VERIFYING_CERTIFICATE_HASH_FAILURE,
    error,
    certificate
  };
}

export function sendCertificate(payload) {
  return {
    type: types.SENDING_CERTIFICATE,
    payload
  };
}

export function sendCertificateReset() {
  return {
    type: types.SENDING_CERTIFICATE_RESET
  };
}

export function resetCertificateObfuscation() {
  return {
    type: types.CERTIFICATE_OBFUSCATE_RESET
  };
}

export function updateObfuscatedCertificate(payload) {
  return {
    type: types.CERTIFICATE_OBFUSCATE_UPDATE,
    payload
  };
}

// Selectors
export function getIssuerIdentityStatus(store) {
  const {
    issuerIdentities,
    certificateIssuerVerifying,
    certificateIssuerError,
    certificateIssuer
  } = store.certificate;
  return {
    identities: issuerIdentities,
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
  return store.certificate.rawModified;
}

export function getVerifying(store) {
  const {
    certificateIssuerVerifying,
    certificateHashVerifying,
    certificateIssuedVerifying,
    certificateNotRevokedVerifying
  } = store.certificate;
  return (
    certificateIssuerVerifying ||
    certificateHashVerifying ||
    certificateIssuedVerifying ||
    certificateNotRevokedVerifying
  );
}

export function getVerified(store) {
  const hash = getHashStatus(store).verified;
  const issued = getIssuedStatus(store).verified;
  const notRevoked = getNotRevokedStatus(store).verified;
  const identity = getIssuerIdentityStatus(store).verified;

  return hash && issued && notRevoked && identity;
}

export function getVerificationStatus(store) {
  return store.certificate.verificationStatus;
}

export function getEmailSendingState(store) {
  return store.certificate.emailState;
}
