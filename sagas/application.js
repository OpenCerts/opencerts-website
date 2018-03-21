import { put, select, take } from "redux-saga/effects";
import { getNetwork, getNetworkPending, types } from "../reducers/application";
import { setNewWeb3, getCurrentWeb3 } from "../services/web3/getWeb3";

export function* getSelectedWeb3(getNew = false) {
  const networkPending = yield select(getNetworkPending);
  if (networkPending && !getNew) {
    // block if there's a network update pending
    yield take(types.UPDATE_NETWORK_ID_SUCCESS);
  }
  const network = yield select(getNetwork);
  const web3 = yield getNew ? setNewWeb3(network) : getCurrentWeb3(); // update web3 only if requested specifically
  return web3;
}

export function* updateNetworkId() {
  try {
    const web3 = yield getSelectedWeb3(true);
    const networkId = yield web3.eth.net.getId();

    let networkIdVerbose;

    switch (networkId) {
      case 1:
        networkIdVerbose = "Main";
        break;
      case 2:
        networkIdVerbose = "Morden";
        break;
      case 3:
        networkIdVerbose = "Ropsten";
        break;
      case 4:
        networkIdVerbose = "Rinkeby";
        break;
      case 42:
        networkIdVerbose = "Kovan";
        break;
      default:
        networkIdVerbose = `Custom Network: ${networkId}`;
    }
    yield put({
      type: types.UPDATE_NETWORK_ID_SUCCESS,
      payload: {
        networkId,
        networkIdVerbose
      }
    });
  } catch (e) {
    yield put({
      type: types.UPDATE_NETWORK_ID_FAILURE,
      payload: e
    });
  }
}

export default updateNetworkId;
