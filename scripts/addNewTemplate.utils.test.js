import { stripIndent } from "common-tags";
import {
  reverseDnsNotation,
  generatePartialChildPaths,
  getSubDirs,
  generateIntermediateIndexTemplate,
  generateOrganisationIndexExports,
  getDirsToMake
} from "./addNewTemplate";

const EXAMPLE_DIR = "./src/components/CertificateTemplates/example";

describe("reverseDnsNotation", () => {
  test("should work correctly", () => {
    expect(reverseDnsNotation("nus.edu.sg")).toBe("sg/edu/nus");
    expect(reverseDnsNotation("google.com")).toBe("com/google");
  });
});

describe("generatePartialChildPaths", () => {
  test("should work correctly", () => {
    expect(generatePartialChildPaths("sg/edu/nus")).toEqual([
      "sg",
      "sg/edu",
      "sg/edu/nus"
    ]);
    expect(generatePartialChildPaths("com/google")).toEqual([
      "com",
      "com/google"
    ]);
  });
});

describe("getSubDirs", () => {
  test("should return 'example' when used on example dir", () => {
    expect(getSubDirs(EXAMPLE_DIR)).toEqual(["2019-Feb-ExampleTemplate"]);
  });
});

describe("getDirsToMake", () => {
  test("should work", () => {
    expect(getDirsToMake("blockchain-institute.edu.dev")).toEqual([
      "dev",
      "dev/edu",
      "dev/edu/blockchain-institute"
    ]);
    expect(getDirsToMake("tech.gov.sg")).toEqual([]);
    expect(getDirsToMake("nonexistent.gov.sg")).toEqual(["sg/gov/nonexistent"]);
  });
});

describe("intermediateIndexTemplate", () => {
  test("should work", () => {
    expect(
      generateIntermediateIndexTemplate({
        subDirs: ["singaporetech", "np"],
        currDir: "edu"
      })
    ).toBe(stripIndent`
        import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

        import singaporetech from "./singaporetech";
        import np from "./np";

        export default addDirToTemplatePath("edu", { ...singaporetech, ...np });
    `);
  });
});

describe("generateOrganisationIndexExports", () => {
  test("should work", () => {
    expect(
      generateOrganisationIndexExports({
        templateTagMapping: { foo: "bar", qux: "baz" },
        organisationDir: "example"
      })
    ).toBe(stripIndent`
      import dynamic from "next/dynamic";

      export default {
        "foo": dynamic(import("./bar" /* webpackChunkName: "example-Templates" */))
        "qux": dynamic(import("./baz" /* webpackChunkName: "example-Templates" */))
      };
      `);
  });
});
