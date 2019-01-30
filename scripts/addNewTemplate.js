// const exportedTemplates = require("../src/components/CertificateTemplates/tlds")
//   .default;

// const existingTemplateTags = Object.keys(exportedTemplates);

const { mapValues, reverse, join } = require("lodash");
const fs = require("fs");

const TLDS_PATH = "./src/components/CertificateTemplates/tlds/";

// prompt for institutes domain name
// check if folder structure exists for institute's domain name
//      tokenise and recurse down the domain name

export function reverseDnsNotation(domain) {
  return join(reverse(domain.split(".")), "/");
}

export function generatePartialChildPaths(path) {
  const childPaths = [];
  const pathArray = path.split("/");
  for (let i = pathArray.length; i > 0; i -= 1) {
    const fragment = pathArray.slice(0, i).join("/");
    childPaths.push(fragment);
  }
  childPaths.push(""); // insert empty element as the base path (no subfolder) is part of the results
  return reverse(childPaths);
}

export function getSubDirs(path) {
  const dirListing = fs.readdirSync(path, {
    withFileTypes: true
  });
  return dirListing.filter(item => item.isDirectory()).map(dir => dir.name);
}

function folderNotExists(path) {
  try {
    getSubDirs(`${TLDS_PATH + path}`);
    return undefined;
  } catch (error) {
    return path;
  }
}

export function getDirsToMake(instituteDomain) {
  const childPaths = generatePartialChildPaths(
    reverseDnsNotation(instituteDomain)
  );
  return childPaths.map(folderNotExists).filter(Boolean); // removes the undefineds
}

export function organisationIndexTemplate({
  subDirectoryImports,
  subDirectoryExports
}) {
  return `
import dynamic from "next/dynamic";

${subDirectoryImports.join("\n")}
        
${subDirectoryExports}
`;
}

function makeImportString(subDir, templatesChunkName) {
  return `dynamic(import("./${subDir}" /* webpackChunkName: "${templatesChunkName}Templates" */))`;
}
export function generateSubDirectoryDynamicImports(
  subDirs,
  templatesChunkName
) {
  return subDirs.map(subDir => makeImportString(subDir, templatesChunkName));
}

// TODO: make this an interactive user input function
export function getTemplateTagToDirMapping() {
  return {
    "2018-Example-Certificate": "./2018-Example-Certificate",
    "2019-Example-Certificate": "./2019-Example-Certificate"
  };
}

export function generateOrganisationIndexExports() {
  function generateExportString(templateTag, subDir, organisationDir) {
    return `"${templateTag}: ${makeImportString(subDir, organisationDir)}"`;
  }


  let subDirs = getTemplateTagToDirMapping()
  return `
export default {
    //TODO: shit i need user input for the template name!!
    ${mapValues(subDirs)}
};`;
}

export function generateIntermediateIndexTemplate({
  levels,
  subDirs,
  currDir
}) {
  const subDirectoryImports = subDirs.map(makeSubdirectoryImport).join("\n");
  const subDirectoryExports = makeSubdirectoryExports(subDirs);
  return `
import addDirToTemplatePath from "${levels}/addDirToTemplatePath";
    
${subDirectoryImports}
    
export default addDirToTemplatePath("${currDir}", { ${subDirectoryExports} });
`;
}

function makeSubdirectoryImport(subDir) {
  return `import ${subDir} from "./${subDir}"`;
}

function makeSubdirectoryExports(subDirs) {
  return subDirs.map(subDir => `...${subDir}`).join(", ");
}

export function generateIndexForChildPath(childPath) {
  // read the subfolders and make list
  // figure out chunking standard naming convention
  // update tlds index
}

// write function to autogenerate index for every folder

// console.log(existingTemplateTags)

process.on("unhandledRejection", () => {
  // swallow the parsing errors that result from JSX that we don't really care about
});
