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

  verificationPending: false,
  verificationStatus: null,
  verificationError: null,

  emailState: states.INITIAL,
  emailError: null,

  shareLink: {},
  shareLinkState: states.INITIAL,
  shareLinkError: null,

  retrieveCertificateByActionState: states.INITIAL,
  retrieveCertificateByActionStateError: null
};

// Actions
export const types = {
  RESET_CERTIFICATE: "RESET_CERTIFICATE",
  NETWORK_RESET: "NETWORK_RESET", // For network change

  UPDATE_CERTIFICATE: "UPDATE_CERTIFICATE",

  LOADING_STORE_SUCCESS: "LOADING_STORE_SUCCESS",
  LOADING_STORE_FAILURE: "LOADING_STORE_FAILURE",

  VERIFYING_CERTIFICATE: "VERIFYING_CERTIFICATE",

  VERIFYING_CERTIFICATE_SUCCESS: "VERIFYING_CERTIFICATE_SUCCESS",
  VERIFYING_CERTIFICATE_FAILURE: "VERIFYING_CERTIFICATE_FAILURE",

  SENDING_CERTIFICATE: "SENDING_CERTIFICATE",
  SENDING_CERTIFICATE_SUCCESS: "SENDING_CERTIFICATE_SUCCESS",
  SENDING_CERTIFICATE_FAILURE: "SENDING_CERTIFICATE_FAILURE",
  SENDING_CERTIFICATE_RESET: "SENDING_CERTIFICATE_RESET",

  GENERATE_SHARE_LINK: "GENERATE_SHARE_LINK",
  GENERATE_SHARE_LINK_SUCCESS: "GENERATE_SHARE_LINK_SUCCESS",
  GENERATE_SHARE_LINK_FAILURE: "GENERATE_SHARE_LINK_FAILURE",
  GENERATE_SHARE_LINK_RESET: "GENERATE_SHARE_LINK_RESET",

  RETRIEVE_CERTIFICATE_BY_ACTION: "RETRIEVE_CERTIFICATE_BY_ACTION",
  RETRIEVE_CERTIFICATE_BY_ACTION_PENDING:
    "RETRIEVE_CERTIFICATE_BY_ACTION_PENDING",
  RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS:
    "RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS",
  RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE:
    "RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE",

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
        verificationPending: true,
        verificationStatus: null
      };
    case types.VERIFYING_CERTIFICATE_SUCCESS:
      return {
        ...state,
        verificationPending: false,
        verificationStatus: action.payload
      };
    case types.VERIFYING_CERTIFICATE_FAILURE:
      return {
        ...state,
        verificationPending: false,
        verificationError: action.payload
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
    case types.RETRIEVE_CERTIFICATE_BY_ACTION_PENDING:
      return {
        ...state,
        retrieveCertificateByActionState: states.PENDING
      };
    case types.RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS:
      return {
        ...state,
        retrieveCertificateByActionState: states.SUCCESS
      };
    case types.RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE:
      return {
        ...state,
        retrieveCertificateByActionState: states.FAILURE,
        retrieveCertificateByActionError: action.payload
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
export const verifyingCertificateSuccess = payload => ({
  type: types.VERIFYING_CERTIFICATE_SUCCESS,
  payload
});

export const verifyingCertificateFailure = payload => ({
  type: types.VERIFYING_CERTIFICATE_FAILURE,
  payload
});

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

export function retrieveCertificateByAction(payload) {
  return {
    type: types.RETRIEVE_CERTIFICATE_BY_ACTION,
    payload
  };
}

export function retrieveCertificateByActionFailure(payload) {
  return {
    type: types.RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE,
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
  return (
    store.certificate.verificationPending ||
    store.certificate.retrieveCertificateByActionState === states.PENDING
  );
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

export function getCertificateByActionError(store) {
  return store.certificate.retrieveCertificateByActionError;
}
