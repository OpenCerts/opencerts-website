import { takeEvery, all } from "redux-saga/effects";

import { types as certificateType } from "../reducers/certificate";
import * as certificateSaga from "../sagas/certificate";

import { types as adminType } from "../reducers/admin";
import * as adminSaga from "../sagas/admin";

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
    ),
    takeEvery(adminType.LOADING_ADMIN_ADDRESS, adminSaga.loadAdminAddress),
    takeEvery(adminType.DEPLOYING_STORE, adminSaga.deployStore),
    takeEvery(adminType.ISSUING_CERTIFICATE, adminSaga.issueCertificate)
  ]);
}
