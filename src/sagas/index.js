import { all } from "redux-saga/effects";
import applicationSaga from "./application";
import certificateSaga from "./certificate";
import templatesSaga from "./templates";

function* rootSaga() {
  yield all([...applicationSaga, ...certificateSaga, ...templatesSaga]);
}

export default rootSaga;
