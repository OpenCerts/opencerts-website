import { all } from "redux-saga/effects";
import certificateSaga from "./certificate";

function* rootSaga() {
  yield all([...certificateSaga]);
}

export default rootSaga;
