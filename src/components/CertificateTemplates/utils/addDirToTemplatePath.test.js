import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

describe("CertificateTemplates/addDirToTemplatePath", () => {
  test("it should work", () => {
    expect(addDirToTemplatePath("foo", { "bar/xx": "qux" })).toEqual({
      "foo/bar/xx": "qux"
    });
  });
});
