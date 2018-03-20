import { put, select } from "redux-saga/effects";
import { getNetwork, types } from "../reducers/application";
import getWeb3 from "../services/web3/getWeb3";

function* getSelectedWeb3() {
  const network = yield select(getNetwork);
  const web3 = yield getWeb3(network);
  return web3;
}

export function* updateNetworkId() {
  try {
    const web3 = yield getSelectedWeb3();
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
