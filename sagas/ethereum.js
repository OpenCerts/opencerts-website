import "util";
import { put } from "redux-saga/effects";
import { types } from "../reducers/ethereum";
import getWeb3 from "../services/web3/getWeb3";
import getContract from "../services/web3/getContract";
import getAccounts from "../services/web3/getAccounts";

export function* loadEthAddresses() {
  try {
    const web3 = yield getWeb3();
    const addresses = yield getAccounts(web3);
    yield put({
      type: types.LOADING_ETH_ADDRESSES_SUCCESS,
      payload: addresses
    });
  } catch (e) {
    yield put({
      type: types.LOADING_ETH_ADDRESSES_FAILURE,
      payload: e.message
    });
  }
}

export function* loadEthContract({ contractDefinition, contractName }) {
  try {
    const web3 = yield getWeb3();
    const contract = yield getContract(web3, contractDefinition);
    yield put({
      type: types.LOADING_ETH_CONTRACT_SUCCESS,
      payload: { [contractName]: contract }
    });
  } catch (e) {
    yield put({ type: types.LOADING_ETH_CONTRACT_FAILURE, payload: e.message });
  }
}
