import { omit } from "lodash";
import { DEFAULT_NETWORK } from "../config";

export const initialState = {
  network: DEFAULT_NETWORK,
  networkId: null,
  networkIdVerbose: "",
  customRpc: "",
  networkUpdatePending: true,
  txPollingList: {},
  currentBlockContents: undefined,
  currentBlockNumber: 0
};

// Actions
export const types = {
  UPDATE_WEB3: "UPDATE_WEB3",
  UPDATE_NETWORK_ID: "UPDATE_NETWORK_ID",
  UPDATE_NETWORK_ID_SUCCESS: "UPDATE_NETWORK_ID_SUCCESS",
  UPDATE_NETWORK_ID_FAILURE: "UPDATE_NETWORK_ID_FAILURE",

  NEW_BLOCK: "NEW_BLOCK",

  TRANSACTION_MINED: "TRANSACTION_MINED",

  TX_POLLING_ADD: "TX_POLLING_ADD",
  TX_POLLING_REMOVE: "TX_POLLING_REMOVE"

  // polling_started
  // add to poll : should take a tx hash and a callback action
  // remove from poll
  // polling_stopped
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
        networkUpdatePending: true,
        currentBlockNumber: 0,
        currentBlockContents: undefined
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
    case types.TX_POLLING_ADD:
      return {
        ...state,
        txPollingList: { ...state.txPollingList, [action.payload.txHash]: true }
      };
    case types.TX_POLLING_REMOVE:
      return {
        ...state,
        txPollingList: omit(state.txPollingList, action.payload.txHash)
      };

    case types.TRANSACTION_MINED:
      return {
        ...state,
        minedTransactions: {
          ...state.minedTransactions,
          [action.payload.txHash]: action.payload.txReceipt
        }
      };
    case types.NEW_BLOCK:
      return {
        ...state,
        currentBlockNumber: action.payload.blockNumber,
        currentBlockContents: action.payload.blockContents
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

export function foundNewBlock(payload) {
  return {
    type: types.NEW_BLOCK,
    payload
  };
}

export function announceMinedTransaction(payload) {
  return {
    type: types.TRANSACTION_MINED,
    payload
  };
}

export function removeTxFromPollingList(payload) {
  return {
    type: types.TX_POLLING_REMOVE,
    payload
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

export function getTxPollingList(store) {
  return store.application.txPollingList;
}

export function getNetworkPollingTask(store) {
  return store.application.networkPollingTask;
}

export function getCurrentBlockNumber(store) {
  return store.application.currentBlockNumber;
}

export function getTransactionReceipt(store, txHash) {
  if (store.application.minedTransactions[txHash]) {
    return store.application.minedTransactions[txHash];
  }
  return undefined;
}
