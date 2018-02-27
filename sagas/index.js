import { takeEvery } from 'redux-saga/effects'

import {types as contentType} from '../reducers/content'
import * as contentSaga from '../sagas/content'

export default function* rootSaga(){
  yield[
    takeEvery(contentType.FETCHING_DATA, contentSaga.fetchData),
  ]
}