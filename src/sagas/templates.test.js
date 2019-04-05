import { put, call } from "redux-saga/effects";
import { get } from "lodash";
import { certificateData } from "@govtechsg/open-certificate";
import templates from "../components/CertificateTemplates";
import { preloadTemplateChunk } from "./templates";
import { types as templateActions } from "../reducers/templates";
import { MakeCertUtil } from "./testutils";

describe("preload template", () => {
  const template = "97d60572-7694-4d91-a9a1-f05771d51a8f:string:NP-AA2018-DPP";
  const testCert = new MakeCertUtil()
    .addDataField("$template", template)
    .finish();

  it("Should fetch the template name", () => {
    expect(get(certificateData(testCert), "$template", "default")).toEqual(
      "NP-AA2018-DPP"
    );
  });

  const loadingTemplate = "NP-AA2018-DPP";

  const saga = preloadTemplateChunk({ payload: testCert });

  it("Should prefetch the template chunk", () => {
    expect(saga.next().value).toEqual(
      put({
        type: templateActions.PRELOAD_TEMPLATE_CHUNK,
        payload: loadingTemplate
      })
    );

    expect(saga.next().value).toEqual(call(templates[loadingTemplate].preload));

    expect(saga.next().value).toEqual(
      put({
        type: templateActions.TEMPLATE_CHUNK_LOADED
      })
    );
  });
});
