import { configureStore, Tuple } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import { certificateReducer } from "./reducers/certificate.slice";
import { featureToggleReducer } from "./reducers/featureToggle.slice";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const initStore = () => {
  const store = configureStore({
    reducer: {
      featureToggle: featureToggleReducer,
      certificate: certificateReducer,
    },
    middleware: () => new Tuple(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(initStore);
export type RootState = ReturnType<ReturnType<typeof initStore>["getState"]>;
