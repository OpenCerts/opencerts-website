import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import reducers, { RootState } from "./reducers";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const initStore = (): Store<RootState> => {
  const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(sagas);
  return store;
};

export default initStore;
