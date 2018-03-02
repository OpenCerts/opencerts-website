import { takeEvery, all } from "redux-saga/effects";

import { types as contentType } from "../reducers/content";
import * as contentSaga from "../sagas/content";

import { types as ethereumType } from "../reducers/ethereum";
import * as ethereumSaga from "../sagas/ethereum";

export default function* rootSaga() {
  yield all([
    takeEvery(contentType.FETCHING_DATA, contentSaga.fetchData),

    takeEvery(
      ethereumType.LOADING_ETH_ADDRESSES,
      ethereumSaga.loadEthAddresses
    ),
    takeEvery(ethereumType.LOADING_ETH_CONTRACT, ethereumSaga.loadEthContract)
  ]);
}
