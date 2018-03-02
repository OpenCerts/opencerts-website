export const initialState = {
  addresses: [],
  contracts: {},
  addressesIsLoading: false,
  contractsIsLoading: false,
  addressLoadError: null,
  contractLoadError: null
};

// Actions
export const types = {
  LOADING_ETH_ADDRESSES: "LOADING_ETH_ADDRESSES",
  LOADING_ETH_ADDRESSES_SUCCESS: "LOADING_ETH_ADDRESSES_SUCCESS",
  LOADING_ETH_ADDRESSES_FAILURE: "LOADING_ETH_ADDRESSES_FAILURE",

  LOADING_ETH_CONTRACT: "LOADING_ETH_CONTRACT",
  LOADING_ETH_CONTRACT_SUCCESS: "LOADING_ETH_CONTRACT_SUCCESS",
  LOADING_ETH_CONTRACT_FAILURE: "LOADING_ETH_CONTRACT_FAILURE"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOADING_ETH_ADDRESSES:
      return {
        ...state,
        addresses: [],
        addressesIsLoading: true
      };
    case types.LOADING_ETH_ADDRESSES_SUCCESS:
      return {
        ...state,
        addresses: action.payload,
        addressesIsLoading: false,
        addressLoadError: null
      };
    case types.LOADING_ETH_ADDRESSES_FAILURE:
      return {
        ...state,
        addresses: [],
        addressesIsLoading: false,
        addressLoadError: action.payload
      };

    case types.LOADING_ETH_CONTRACT:
      return {
        ...state,
        contractsIsLoading: true
      };
    case types.LOADING_ETH_CONTRACT_SUCCESS:
      return {
        ...state,
        contracts: Object.assign({}, { ...state.contracts }, action.payload),
        contractsIsLoading: false,
        contractLoadError: null
      };
    case types.LOADING_ETH_CONTRACT_FAILURE:
      return {
        ...state,
        contractsIsLoading: false,
        contractLoadError: action.payload
      };
    default:
      return state;
  }
}

// Action Creators
export function loadEthAddresses(payload) {
  return {
    type: types.LOADING_ETH_ADDRESSES,
    payload
  };
}
export function loadEthContract(payload) {
  return {
    type: types.LOADING_ETH_CONTRACT,
    payload
  };
}

// Selectors
export function getContract(store, contractName) {
  return store.ethereum.contracts[contractName];
}

export function getAddress(store, index) {
  return store.ethereum.addresses[index];
}
