export const initialState = {
  adminAddress: "",
  storeAddress: "",

  deploying: false,
  deploymentError: null,

  issuedTx: "",
  issuingCertificate: false,
  issuingError: null
};

// Actions
export const types = {
  UPDATE_STORE_ADDRESS: "UPDATE_STORE_ADDRESS",

  LOADING_ADMIN_ADDRESS: "LOADING_ADMIN_ADDRESS",
  LOADING_ADMIN_ADDRESS_SUCCESS: "LOADING_ADMIN_ADDRESS_SUCCESS",
  LOADING_ADMIN_ADDRESS_FAILURE: "LOADING_ADMIN_ADDRESS_FAILURE",

  DEPLOYING_STORE: "DEPLOYING_STORE",
  DEPLOYING_STORE_SUCCESS: "DEPLOYING_STORE_SUCCESS",
  DEPLOYING_STORE_FAILURE: "DEPLOYING_STORE_FAILURE",

  ISSUING_CERTIFICATE: "ISSUING_CERTIFICATE",
  ISSUING_CERTIFICATE_SUCCESS: "ISSUING_CERTIFICATE_SUCCESS",
  ISSUING_CERTIFICATE_FAILURE: "ISSUING_CERTIFICATE_FAILURE"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOADING_ADMIN_ADDRESS_FAILURE:
      return {
        ...state,
        adminAddress: ""
      };
    case types.UPDATE_STORE_ADDRESS:
      return {
        ...state,
        storeAddress: action.payload
      };
    case types.LOADING_ADMIN_ADDRESS_SUCCESS:
      return {
        ...state,
        adminAddress: action.payload
      };
    case types.DEPLOYING_STORE:
      return {
        ...state,
        deploying: true
      };
    case types.DEPLOYING_STORE_SUCCESS:
      return {
        ...state,
        deploying: false,
        deploymentError: null,
        storeAddress: action.payload
      };
    case types.DEPLOYING_STORE_FAILURE:
      return {
        ...state,
        deploying: false,
        deploymentError: action.payload
      };
    case types.ISSUING_CERTIFICATE:
      return {
        ...state,
        issuingCertificate: true
      };
    case types.ISSUING_CERTIFICATE_SUCCESS:
      return {
        ...state,
        issuingCertificate: false,
        issuedTx: action.payload,
        issuingError: null
      };
    case types.ISSUING_CERTIFICATE_FAILURE:
      return {
        ...state,
        issuingCertificate: false,
        issuingError: action.payload,
        issuedTx: ""
      };
    default:
      return state;
  }
}

// Action Creators
export function loadAdminAddress() {
  return {
    type: types.LOADING_ADMIN_ADDRESS
  };
}

export function deployStore(payload) {
  return {
    type: types.DEPLOYING_STORE,
    payload
  };
}

export function updateStoreAddress(payload) {
  return {
    type: types.UPDATE_STORE_ADDRESS,
    payload
  };
}

export function issueCertificate(payload) {
  return {
    type: types.ISSUING_CERTIFICATE,
    payload
  };
}

// Selectors
export function getAdminAddress(store) {
  return store.admin.adminAddress;
}

export function getStoreAddress(store) {
  return store.admin.storeAddress;
}

export function getIssuedTx(store) {
  return store.admin.issuedTx;
}
