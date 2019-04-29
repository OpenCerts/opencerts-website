import { put, call } from "redux-saga/effects";
import { get } from "lodash";
import { certificateData } from "@govtechsg/open-certificate";
import templates from "../components/CertificateTemplates";
import { preloadTemplateChunk } from "./templates";
import { types as templateActions } from "../reducers/templates";
import { MakeCertUtil } from "./testutils";

describe("preload template", () => {
  let testCert = {};
  const templateTag = "NP-AA2018-DPP";
  beforeEach(() => {
    testCert = new MakeCertUtil().addTemplateTag(templateTag).finish();
  });

  it("Should fetch the template name", () => {
    expect(get(certificateData(testCert), "$template", "default")).toEqual(
      "NP-AA2018-DPP"
    );
  });

  it("Should prefetch the template chunk", () => {
    const saga = preloadTemplateChunk({ payload: testCert });
    expect(saga.next().value).toEqual(
      put({
        type: templateActions.PRELOAD_TEMPLATE_CHUNK,
        payload: templateTag
      })
    );

    expect(saga.next().value).toEqual(call(templates[templateTag].preload));

    expect(saga.next().value).toEqual(
      put({
        type: templateActions.TEMPLATE_CHUNK_LOADED
      })
    );
  });
});
