import path from "path";
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
    expect(reverseDnsNotation("nus.edu.sg")).toBe(
      `sg${path.sep}edu${path.sep}nus`
    );
    expect(reverseDnsNotation("google.com")).toBe(`com${path.sep}google`);
  });
});

describe("generatePartialChildPaths", () => {
  test("should work correctly", () => {
    expect(generatePartialChildPaths("sg/edu/nus")).toEqual([
      `sg`,
      `sg${path.sep}edu`,
      `sg${path.sep}edu${path.sep}nus`
    ]);
    expect(generatePartialChildPaths("com/google")).toEqual([
      "com",
      `com${path.sep}google`
    ]);
  });
});

describe("getSubDirs", () => {
  test("should return 'example' when used on example dir", () => {
    expect(getSubDirs(EXAMPLE_DIR)).toEqual([
      "2019-Feb-ExampleTemplate",
      "Demo-CertTemplate"
    ]);
  });
});

describe("getDirsToMake", () => {
  test("should work", () => {
    expect(getDirsToMake("blockchain-institute.edu.dev")).toEqual([
      `dev`,
      `dev${path.sep}edu`,
      `dev${path.sep}edu${path.sep}blockchain-institute`
    ]);
    expect(getDirsToMake("tech.gov.sg")).toEqual([]);
    expect(getDirsToMake("nonexistent.gov.sg")).toEqual([
      `sg${path.sep}gov${path.sep}nonexistent`
    ]);
  });
});

describe("intermediateIndexTemplate", () => {
  test("should work", () => {
    expect(
      generateIntermediateIndexTemplate({
        subDirs: ["singaporetech", "np"],
        currDir: "edu"
      })
    ).toBe(
      `/* eslint-disable camelcase */
/* because we need to use _ to replace hyphens in dns */
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

import singaporetech from "./singaporetech";
import np from "./np";

export default addDirToTemplatePath("edu", { ...singaporetech, ...np });
`
    );
  });
  test("should correctly throw when given a non-dns-compliant folder name", () => {
    expect(() => {
      generateIntermediateIndexTemplate({
        subDirs: [".com"],
        currDir: "edu"
      });
    }).toThrow();
  });

  test("should correctly replace hyphens with underscores", () => {
    expect(
      generateIntermediateIndexTemplate({
        subDirs: ["ssg-wsg"],
        currDir: "gov"
      })
    ).toBe(`/* eslint-disable camelcase */
/* because we need to use _ to replace hyphens in dns */
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

import ssg_wsg from "./ssg-wsg";

export default addDirToTemplatePath("gov", { ...ssg_wsg });
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
    ).toBe(`import dynamic from "next/dynamic";

export default {
  "foo": dynamic(() => import("./bar" /* webpackChunkName: "example-Templates" */))
  "qux": dynamic(() => import("./baz" /* webpackChunkName: "example-Templates" */))
};
`);
  });
});
