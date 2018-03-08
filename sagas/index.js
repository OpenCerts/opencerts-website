import { takeEvery, all } from "redux-saga/effects";

import { types as certificateType } from "../reducers/certificate";
import * as certificateSaga from "../sagas/certificate";

export default function* rootSaga() {
  yield all([
    takeEvery(
      certificateType.UPDATE_CERTIFICATE,
      certificateSaga.loadCertificateContract
    ),
    takeEvery(
      certificateType.UPDATE_CERTIFICATE,
      certificateSaga.loadIssuerList
    ),
    takeEvery(
      certificateType.VERIFYING_CERTIFICATE,
      certificateSaga.verifyCertificate
    )
  ]);
}
