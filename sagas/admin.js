import { put } from "redux-saga/effects";
import { types } from "../reducers/admin";

import getAccounts from "../services/web3/getAccounts";
import CertificateStoreDefinition from "../services/contracts/CertificateStore.json";

import { getSelectedWeb3 } from "./application";

// TODO do a better estimate
const DEFAULT_GAS = 1000000;

export function* loadAdminAddress() {
  try {
    const web3 = yield getSelectedWeb3();
    const accounts = yield getAccounts(web3);

    if (!accounts || !accounts.length || accounts.length === 0)
      throw new Error("Accounts not found");

    yield put({
      type: types.LOADING_ADMIN_ADDRESS_SUCCESS,
      payload: accounts[0]
    });
  } catch (e) {
    yield put({
      type: types.LOADING_ADMIN_ADDRESS_FAILURE,
      payload: e.message
    });
  }
}

export function* deployStore({ payload }) {
  try {
    const { fromAddress, name } = payload;
    const web3 = yield getSelectedWeb3();

    const { abi, bytecode } = CertificateStoreDefinition;

    const proxyContract = new web3.eth.Contract(abi);
    const deployment = proxyContract.deploy({
      from: fromAddress,
      data: bytecode,
      arguments: [name]
    });
    const gasPrice = yield web3.eth.getGasPrice();

    const tx = yield deployment.send({
      from: fromAddress,
      gas: DEFAULT_GAS,
      gasPrice
    });

    // eslint-disable-next-line no-underscore-dangle
    const deployedStoreAddress = tx._address;

    yield put({
      type: types.DEPLOYING_STORE_SUCCESS,
      payload: deployedStoreAddress
    });
  } catch (e) {
    yield put({
      type: types.DEPLOYING_STORE_FAILURE,
      payload: e.message
    });
  }
}

export function* issueCertificate({ payload }) {
  try {
    const { fromAddress, storeAddress, certificateHash } = payload;
    const web3 = yield getSelectedWeb3();

    const { abi } = CertificateStoreDefinition;
    const contract = new web3.eth.Contract(abi, storeAddress, {
      from: fromAddress
    });

    const gasPrice = yield web3.eth.getGasPrice();
    const issueMsg = contract.methods.issueCertificate(certificateHash);

    const tx = yield issueMsg.send({
      from: fromAddress,
      gas: DEFAULT_GAS,
      gasPrice
    });

    const txHash = tx.blockHash;

    yield put({
      type: types.ISSUING_CERTIFICATE_SUCCESS,
      payload: txHash
    });
  } catch (e) {
    yield put({
      type: types.ISSUING_CERTIFICATE_FAILURE,
      payload: e.message
    });
  }
}

export function* revokeCertificate({ payload }) {
  try {
    const { fromAddress, storeAddress, certificateHash } = payload;
    const web3 = yield getSelectedWeb3();

    const { abi } = CertificateStoreDefinition;
    const contract = new web3.eth.Contract(abi, storeAddress, {
      from: fromAddress
    });

    const gasPrice = yield web3.eth.getGasPrice();
    const issueMsg = contract.methods.revokeCertificate(certificateHash);

    const tx = yield issueMsg.send({
      from: fromAddress,
      gas: DEFAULT_GAS,
      gasPrice
    });

    const txHash = tx.blockHash;

    yield put({
      type: types.REVOKING_CERTIFICATE_SUCCESS,
      payload: txHash
    });
  } catch (e) {
    yield put({
      type: types.REVOKING_CERTIFICATE_FAILURE,
      payload: e.message
    });
  }
}

export function* networkReset() {
  yield put({
    type: types.NETWORK_RESET
  });
}

export default loadAdminAddress;
