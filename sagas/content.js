import { put } from "redux-saga/effects";
import { types } from "../reducers/content";
import getPeople from "../services/content";

export function* fetchData() {
  try {
    const data = yield getPeople();
    yield put({ type: types.FETCHING_DATA_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: types.FETCHING_DATA_FAILURE });
  }
}

export default fetchData;
