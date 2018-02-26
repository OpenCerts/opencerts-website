import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import dataSaga from './saga'

// REDUCERS
import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './constants'
const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}


// ACTIONS
import getPeople from './api'

export function fetchData() {
  return {
    type: FETCHING_DATA,
  }
}

const sagaMiddleware = createSagaMiddleware();

export const initStore = (initialState = initialState) => {
  const store = createStore(dataReducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware)))
  sagaMiddleware.run(dataSaga)
  return store;
}
