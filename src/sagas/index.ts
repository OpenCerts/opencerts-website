import { all } from "redux-saga/effects";
import certificateSaga from "./certificate";

function* rootSaga(): Generator {
  yield all([...certificateSaga]);
}

export default rootSaga;
