import { types as Web3Types } from "../services/web3/getWeb3";

export const initialState = {
  network: Web3Types.INJECTED,
  customRpc: ""
};

// Actions
export const types = {
  UPDATE_WEB3: "UPDATE_WEB3"
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

// Selectors
export function getNetwork(store) {
  return store.application.network;
}

export function getCustomRpc(store) {
  return store.application.customRpc;
}
