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
  certificateStore: false,

  certificateHashVerifying: false,
  certificateIssuedVerifying: false,
  certificateNotRevokedVerifying: false,
  certificateIssuerVerifying: false,
  certificateStoreVerifying: false,

  certificateHashError: null,
  certificateIssuedError: null,
  certificateNotRevokedError: null,
  certificateIssuerError: null,
  certificateStoreError: null,

  verificationStatus: [],

  emailState: states.INITIAL,
  emailError: null,

  shareLink: {},
  shareLinkState: states.INITIAL,
  shareLinkError: null,

  encryptedCertificate: {},
  encryptedCertificateState: states.INITIAL,
  encryptedCertificateError: null
};

// Actions
export const types = {
  RESET_CERTIFICATE: "RESET_CERTIFICATE",
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

  VERIFYING_CERTIFICATE_STORE_SUCCESS: "VERIFYING_CERTIFICATE_STORE_SUCCESS",
  VERIFYING_CERTIFICATE_STORE_FAILURE: "VERIFYING_CERTIFICATE_STORE_FAILURE",

  SENDING_CERTIFICATE: "SENDING_CERTIFICATE",
  SENDING_CERTIFICATE_SUCCESS: "SENDING_CERTIFICATE_SUCCESS",
  SENDING_CERTIFICATE_FAILURE: "SENDING_CERTIFICATE_FAILURE",
  SENDING_CERTIFICATE_RESET: "SENDING_CERTIFICATE_RESET",

  GENERATE_SHARE_LINK: "GENERATE_SHARE_LINK",
  GENERATE_SHARE_LINK_SUCCESS: "GENERATE_SHARE_LINK_SUCCESS",
  GENERATE_SHARE_LINK_FAILURE: "GENERATE_SHARE_LINK_FAILURE",
  GENERATE_SHARE_LINK_RESET: "GENERATE_SHARE_LINK_RESET",

  GET_CERTIFICATE_BY_ID: "GET_CERTIFICATE_BY_ID",
  GET_CERTIFICATE_BY_ID_PENDING: "GET_CERTIFICATE_BY_ID_PENDING",
  GET_CERTIFICATE_BY_ID_SUCCESS: "GET_CERTIFICATE_BY_ID_SUCCESS",
  GET_CERTIFICATE_BY_ID_FAILURE: "GET_CERTIFICATE_BY_ID_FAILURE",

  CERTIFICATE_OBFUSCATE_RESET: "CERTIFICATE_OBFUSCATE_RESET",
  CERTIFICATE_OBFUSCATE_UPDATE: "CERTIFICATE_OBFUSCATE_UPDATE"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.RESET_CERTIFICATE:
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
        certificateStore: false,

        certificateHashVerifying: true,
        certificateIssuedVerifying: true,
        certificateNotRevokedVerifying: true,
        certificateIssuerVerifying: true,
        certificateStoreVerifying: true,

        certificateHashError: null,
        certificateIssuedError: null,
        certificateNotRevokedError: null,
        certificateIssuerError: null,
        certificateStoreError: null,

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
            message: "Known certificate issuer",
            warning: false,
            error: false
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
            message: "Unknown certificate issuer",
            warning: false,
            error: false
          }
        ]
      };
    case types.VERIFYING_CERTIFICATE_STORE_SUCCESS:
      return {
        ...state,
        certificateStore: true,
        certificateStoreError: null,
        certificateStoreVerifying: false,
        verificationStatus: [
          ...state.verificationStatus,
          {
            message: "Certificate store checked",
            warning: false,
            error: false
          }
        ]
      };
    case types.VERIFYING_CERTIFICATE_STORE_FAILURE:
      return {
        ...state,
        certificateStore: false,
        certificateStoreError: action.payload,
        certificateStoreVerifying: false,
        verificationStatus: [
          ...state.verificationStatus,
          {
            message: "Certificate store does not exist",
            warning: false,
            error: true
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
    case types.GENERATE_SHARE_LINK_SUCCESS:
      return {
        ...state,
        shareLink: action.payload,
        shareLinkState: states.SUCCESS
      };
    case types.GENERATE_SHARE_LINK_FAILURE:
      return {
        ...state,
        shareLink: {},
        shareLinkState: states.FAILURE
      };
    case types.GENERATE_SHARE_LINK_RESET:
      return {
        ...state,
        shareLink: {},
        shareLinkState: states.INITIAL
      };
    case types.GET_CERTIFICATE_BY_ID_PENDING:
      return {
        ...state,
        encryptedCertificateState: states.PENDING
      };
    case types.GET_CERTIFICATE_BY_ID_SUCCESS:
      return {
        ...state,
        encryptedCertificate: action.payload,
        encryptedCertificateState: states.SUCCESS
      };
    case types.GET_CERTIFICATE_BY_ID_FAILURE:
      return {
        ...state,
        encryptedCertificate: {},
        encryptedCertificateState: states.FAILURE,
        encryptedCertificateError: action.payload
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
export function resetCertificateState() {
  return {
    type: types.RESET_CERTIFICATE
  };
}

export function updateCertificate(payload) {
  return {
    type: types.UPDATE_CERTIFICATE,
    payload
  };
}

export function verifyingCertificateIssuerSuccess({ issuerIdentities }) {
  return {
    type: types.VERIFYING_CERTIFICATE_ISSUER_SUCCESS,
    payload: issuerIdentities
  };
}

export function verifyingCertificateIssuerFailure({ error }) {
  return {
    type: types.VERIFYING_CERTIFICATE_ISSUER_FAILURE,
    error
  };
}

export function verifyingCertificateStoreSuccess() {
  return {
    type: types.VERIFYING_CERTIFICATE_STORE_SUCCESS
  };
}

export function verifyingCertificateStoreFailure({ error }) {
  return {
    type: types.VERIFYING_CERTIFICATE_STORE_FAILURE,
    error
  };
}

export function verifyingCertificateRevocationSuccess() {
  return {
    type: types.VERIFYING_CERTIFICATE_REVOCATION_SUCCESS
  };
}

export function verifyingCertificateRevocationFailure({ error }) {
  return {
    type: types.VERIFYING_CERTIFICATE_REVOCATION_FAILURE,
    error
  };
}

export function verifyingCertificateIssuedSuccess() {
  return {
    type: types.VERIFYING_CERTIFICATE_ISSUED_SUCCESS
  };
}

export function verifyingCertificateIssuedFailure({ error }) {
  return {
    type: types.VERIFYING_CERTIFICATE_ISSUED_FAILURE,
    error
  };
}

export function verifyingCertificateHashSuccess() {
  return {
    type: types.VERIFYING_CERTIFICATE_HASH_SUCCESS
  };
}

export function verifyingCertificateHashFailure({ error }) {
  return {
    type: types.VERIFYING_CERTIFICATE_HASH_FAILURE,
    error
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

export function generateShareLink() {
  return {
    type: types.GENERATE_SHARE_LINK
  };
}

export function retrieveCertificateByLink(payload) {
  return {
    type: types.GET_CERTIFICATE_BY_ID,
    payload
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

export function getStoreStatus(store) {
  const {
    certificateStore,
    certificateStoreError,
    certificateStoreVerifying
  } = store.certificate;
  return {
    verified: certificateStore,
    verifying: certificateStoreVerifying,
    error: certificateStoreError
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
    certificateNotRevokedVerifying,
    certificateStoreVerifying
  } = store.certificate;
  return (
    certificateIssuerVerifying ||
    certificateHashVerifying ||
    certificateIssuedVerifying ||
    certificateNotRevokedVerifying ||
    certificateStoreVerifying
  );
}

export function getVerified(store) {
  const hash = getHashStatus(store).verified;
  const issued = getIssuedStatus(store).verified;
  const notRevoked = getNotRevokedStatus(store).verified;
  const identity = getIssuerIdentityStatus(store).verified;
  const storeStatus = getStoreStatus(store).verified;

  return hash && issued && notRevoked && identity && storeStatus;
}

export function getVerificationStatus(store) {
  return store.certificate.verificationStatus;
}

export function getEmailSendingState(store) {
  return store.certificate.emailState;
}

export function getShareLink(store) {
  return store.certificate.shareLink;
}

export function getShareLinkState(store) {
  return store.certificate.shareLinkState;
}

export function getEncryptedCertificateStatus(store) {
  return store.certificate.encryptedCertificateState;
}
