import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware();

export const initStore = () => {
  const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)))
  sagaMiddleware.run(sagas)
  return store;
}
