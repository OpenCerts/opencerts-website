import { takeEvery, put, call } from "redux-saga/effects";
import { get } from "lodash";
import { getData } from "@govtechsg/open-attestation";

import templates from "../components/CertificateTemplates";
import { types as certificateActions } from "../reducers/certificate";
import { types as templateActions } from "../reducers/templates";

export function* preloadTemplateChunk({ payload }) {
  const templateName = get(getData(payload), "$template", "default");
  const templateComponent = templates[templateName] || templates.default;

  yield put({
    type: templateActions.PRELOAD_TEMPLATE_CHUNK,
    payload: templateName
  });

  yield call(templateComponent.preload);

  yield put({
    type: templateActions.TEMPLATE_CHUNK_LOADED
  });
}
export default [
  takeEvery(certificateActions.UPDATE_CERTIFICATE, preloadTemplateChunk)
];
