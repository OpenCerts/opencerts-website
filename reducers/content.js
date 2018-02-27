export const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

// Actions
export const types = {
  FETCHING_DATA: 'FETCHING_DATA',
  FETCHING_DATA_SUCCESS: 'FETCHING_DATA_SUCCESS',
  FETCHING_DATA_FAILURE: 'FETCHING_DATA_FAILURE',
}

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_DATA:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case types.FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    case types.FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}

// Action Creators
export function fetchData() {
  return {
    type: types.FETCHING_DATA,
  }
}