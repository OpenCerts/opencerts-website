import { takeEvery, all } from "redux-saga/effects";

import { types as applicationType } from "../reducers/application";
import * as applicationSaga from "../sagas/application";

import { types as certificateType } from "../reducers/certificate";
import * as certificateSaga from "../sagas/certificate";

export default function* rootSaga() {
  yield all([
    takeEvery(
      certificateType.UPDATE_CERTIFICATE,
      certificateSaga.verifyCertificate
    ),
    takeEvery(
      applicationType.UPDATE_NETWORK_ID,
      applicationSaga.updateNetworkId
    ),
    takeEvery(applicationType.UPDATE_WEB3, applicationSaga.updateNetworkId),
    takeEvery(applicationType.UPDATE_WEB3, certificateSaga.networkReset)
  ]);
}
