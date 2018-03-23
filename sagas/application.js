import { intersection } from "lodash";
import { put, select, take, call, fork, cancel, all } from "redux-saga/effects";
import { delay } from "redux-saga";
import {
  getNetwork,
  getNetworkPending,
  types,
  getTxPollingList,
  getCurrentBlockNumber,
  getNetworkPollingTask,
  foundNewBlock,
  announceMinedTransaction,
  removeTxFromPollingList
} from "../reducers/application";
import { setNewWeb3, getCurrentWeb3 } from "../services/web3/getWeb3";

const POLLING_INTERVAL = 4000; // milliseconds

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

export function* startNetworkPolling() {
  let init = true;
  while (true) {
    const web3 = yield getCurrentWeb3();
    const currentBlockNumber = yield select(getCurrentBlockNumber);
    const newBlockNumber = yield web3.eth.getBlockNumber();
    if (init || newBlockNumber > currentBlockNumber) {
      let numberOfNewBlocks = newBlockNumber - currentBlockNumber; // sometimes blocks are skipped
      if (init) {
        numberOfNewBlocks = 1; // if we're init-ing then only fetch one
      }
      let fetchBlockNumber = newBlockNumber - numberOfNewBlocks + 1; // get the block after our most recent
      while (fetchBlockNumber <= newBlockNumber) {
        const newBlockContents = yield web3.eth.getBlock(
          fetchBlockNumber,
          true
        );

        // sometimes web3.eth.getblock() comes up null... do-over when that happens
        if (newBlockContents === null) {
          // eslint-disable-next-line
          console.error(
            "web3.eth.getblock() gave null for ",
            fetchBlockNumber,
            ". Retrying"
          );
        } else {
          yield put(
            foundNewBlock({
              blockNumber: fetchBlockNumber,
              blockContents: newBlockContents
            })
          );
          fetchBlockNumber += 1;
        }
        init = false;
      }
    }
    yield call(delay, POLLING_INTERVAL);
  }
}

export function* updateNetworkId() {
  try {
    const networkPollingTask = yield select(getNetworkPollingTask);
    if (networkPollingTask) {
      yield cancel(networkPollingTask);
    }
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
    const providerPollingTask = yield fork(startNetworkPolling);
    yield put({
      type: types.UPDATE_NETWORK_ID_SUCCESS,
      payload: {
        networkId,
        networkIdVerbose,
        providerPollingTask
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

export function* addTxHashToPolling({ payload }) {
  yield put({
    type: types.TX_POLLING_ADD,
    payload: {
      txHash: payload
    }
  });
}

export function* removeTxHashFromPolling({ payload }) {
  yield put(removeTxFromPollingList(payload));
}

export function* checkNewBlockForTxPollList({ payload }) {
  const { transactions } = payload.blockContents;
  if (transactions && transactions.length) {
    const blockTransactionHashList = transactions.map(
      transactionObj => transactionObj.hash
    );

    const txPollingList = yield select(getTxPollingList);

    const ourTransactions = intersection(
      Object.keys(txPollingList),
      blockTransactionHashList
    );

    // found our transactions in new block
    if (ourTransactions.length) {
      const announcementObjects = [];

      /* eslint-disable */
      // disabling eslint for this because it wants me to use .map but
      // i can't yield from inside .map so i need to use a for loop instead
      for (let transaction of ourTransactions) {
        announcementObjects.push(yield makeAnnouncement(transaction));
      }
      /* eslint-enable */

      yield all(announcementObjects);
    }
  }
}

function* makeAnnouncement(txHash) {
  const web3 = yield getCurrentWeb3();
  // retrieving the tx receipts because the tx receipts in the block contents doesn't have contract address
  const txReceipt = yield web3.eth.getTransactionReceipt(txHash);
  yield put(
    announceMinedTransaction({
      txHash,
      txReceipt
    })
  );
}

export default updateNetworkId;
