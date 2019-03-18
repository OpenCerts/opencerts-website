import { all } from "redux-saga/effects";
import applicationSaga from "./application";
import certificateSaga from "./certificate";

function* rootSaga() {
  yield all([...applicationSaga, ...certificateSaga]);
}

export default rootSaga;
