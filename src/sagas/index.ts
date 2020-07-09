import { all } from "redux-saga/effects";
import { sagas as certificateSaga } from "./certificate";

export function* rootSaga(): Generator {
  yield all([...certificateSaga]);
}
