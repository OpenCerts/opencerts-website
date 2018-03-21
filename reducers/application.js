import { types as Web3Types } from "../services/web3/getWeb3";

export const initialState = {
  network: Web3Types.INJECTED,
  networkId: null,
  networkIdVerbose: "",
  customRpc: "",
  networkUpdatePending: true
};

// Actions
export const types = {
  UPDATE_WEB3: "UPDATE_WEB3",
  UPDATE_NETWORK_ID: "UPDATE_NETWORK_ID",
  UPDATE_NETWORK_ID_SUCCESS: "UPDATE_NETWORK_ID_SUCCESS",
  UPDATE_NETWORK_ID_FAILURE: "UPDATE_NETWORK_ID_FAILURE"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_WEB3:
      return {
        ...state,
        network: action.payload.network,
        customRpc: action.payload.customRpc
      };
    case types.UPDATE_NETWORK_ID:
      return {
        ...state,
        networkId: null,
        networkIdVerbose: "",
        networkUpdatePending: true
      };
    case types.UPDATE_NETWORK_ID_SUCCESS:
      return {
        ...state,
        networkId: action.payload.networkId,
        networkIdVerbose: action.payload.networkIdVerbose,
        networkUpdatePending: false
      };
    case types.UPDATE_NETWORK_ID_FAILURE:
      return {
        ...state,
        networkId: null,
        networkIdVerbose: "",
        networkUpdatePending: false
      };
    default:
      return state;
  }
}

// Action Creators
export function updateWeb3(payload) {
  return {
    type: types.UPDATE_WEB3,
    payload
  };
}

export function updateNetworkId() {
  return {
    type: types.UPDATE_NETWORK_ID
  };
}

// Selectors
export function getNetwork(store) {
  return store.application.network;
}

export function getNetworkPending(store) {
  return store.application.networkUpdatePending;
}

export function getCustomRpc(store) {
  return store.application.customRpc;
}

export function getNetworkId(store) {
  return store.application.networkId;
}
