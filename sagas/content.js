import { types } from '../reducers/content'
import { put, takeEvery } from 'redux-saga/effects'
import getPeople from '../services/content'

export function* fetchData (action) {
  try {
    const data = yield getPeople()
    yield put({ type: types.FETCHING_DATA_SUCCESS, payload:data})
  } catch (e) {
    yield put({ type: types.FETCHING_DATA_FAILURE })
  }
}