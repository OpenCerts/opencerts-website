import { certificateReducer } from "./certificate.slice";
import { featureToggleReducer } from "./featureToggle.slice";

export const rootReducer = {
  featureToggle: featureToggleReducer,
  certificate: certificateReducer,
};

type RootReducer = typeof rootReducer;

export type RootState = {
  [K in keyof RootReducer]: ReturnType<RootReducer[K]>;
};
