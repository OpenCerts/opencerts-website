import { put, select, take, takeEvery } from "redux-saga/effects";
import { getNetwork, getNetworkPending, types } from "../reducers/application";
import { setNewWeb3, getWeb3 } from "../services/web3";

export function matchNetwork(networkId) {
  const networkIdVerbose = {
    1: "Main",
    2: "Morden",
    3: "Ropsten",
    4: "Rinkeby",
    42: "Kovan"
  };
  return networkIdVerbose[networkId] || `Custom Network: ${networkId}`;
}

export function* getSelectedWeb3(getNew = false) {
  const networkPending = yield select(getNetworkPending);
  if (networkPending && !getNew) {
    // block if there's a network update pending
    yield take(types.UPDATE_NETWORK_ID_SUCCESS);
  }
  const network = yield select(getNetwork);
  const web3 = yield getNew ? setNewWeb3(network) : getWeb3(); // update web3 only if requested specifically
  return web3;
}

export function* updateNetworkId() {
  try {
    const web3 = yield getSelectedWeb3(true);
    const networkId = yield web3.eth.net.getId();
    const networkIdVerbose = matchNetwork(networkId);

    yield put({
      type: types.UPDATE_NETWORK_ID_SUCCESS,
      payload: {
        networkId,
        networkIdVerbose
      }
    });
  } catch (e) {
    console.error(e); // eslint-disable-line
    yield put({
      type: types.UPDATE_NETWORK_ID_FAILURE,
      payload: e
    });
  }
}

export default [
  takeEvery(types.UPDATE_NETWORK_ID, updateNetworkId),
  takeEvery(types.UPDATE_WEB3, updateNetworkId)
];
