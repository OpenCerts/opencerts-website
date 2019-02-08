/* eslint-disable no-console */ // because this is a cli module

const { stripIndent } = require("common-tags");

const inquirer = require("inquirer");
const { reverse } = require("lodash");
const fs = require("fs-extra");
const path = require("path");

const TLDS_PATH = path.resolve("./src/components/CertificateTemplates/tlds/");
const EXAMPLE_TEMPLATE_PATH = path.resolve(
  TLDS_PATH,
  "../example/2019-Feb-ExampleTemplate"
);

export function reverseDnsNotation(domain) {
  return path.join(...reverse(domain.split(".")));
}

export function generatePartialChildPaths(dirPath) {
  const childPaths = [];
  const pathArray = path.join(dirPath).split(path.sep);
  for (let i = pathArray.length; i > 0; i -= 1) {
    const fragment = path.join(...pathArray.slice(0, i));
    childPaths.push(fragment);
  }
  return reverse(childPaths);
}

export function getSubDirs(dirPath) {
  const dirListing = fs.readdirSync(dirPath, {
    withFileTypes: true
  });
  return dirListing.filter(item => item.isDirectory()).map(dir => dir.name);
}

function folderNotExists(dirPath) {
  try {
    getSubDirs(path.join(TLDS_PATH, dirPath));
    return undefined;
  } catch (error) {
    return dirPath;
  }
}

export function getDirsToMake(organisationDomain) {
  const childPaths = generatePartialChildPaths(
    reverseDnsNotation(organisationDomain)
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

function makeDynamicImportFragment(subDir, templatesChunkName) {
  return `dynamic(import("./${subDir}" /* webpackChunkName: "${templatesChunkName}-Templates" */))`;
}
export function generateSubDirectoryDynamicImports(
  subDirs,
  templatesChunkName
) {
  return subDirs.map(subDir =>
    makeDynamicImportFragment(subDir, templatesChunkName)
  );
}

export function generateOrganisationIndexExports({
  templateTagMapping: templateNameMapping,
  organisationDir
}) {
  function generateExportString(templateName, subDir) {
    return `  "${templateName}": ${makeDynamicImportFragment(
      subDir,
      organisationDir
    )}`;
  }

  function generateExportsObject(subDirs) {
    return Object.keys(subDirs).map(templateName =>
      generateExportString(templateName, subDirs[templateName])
    );
  }

  return stripIndent`
import dynamic from "next/dynamic";

export default {
${generateExportsObject(templateNameMapping).join("\n")}
};
`;
}

function makeSubdirectoryImport(subDir) {
  return `import ${subDir} from "./${subDir}";`;
}

function makeSubdirectoryExports(subDirs) {
  return subDirs.map(subDir => `...${subDir}`).join(", ");
}

export function generateIntermediateIndexTemplate({ subDirs, currDir }) {
  const subDirectoryImports = subDirs.map(makeSubdirectoryImport).join("\n");
  const subDirectoryExports = makeSubdirectoryExports(subDirs);
  return stripIndent`
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

${subDirectoryImports}

export default addDirToTemplatePath("${currDir}", { ${subDirectoryExports} });
`;
}

export function generateTldsIndex() {
  const subDirs = getSubDirs(TLDS_PATH);
  const subDirectoryImports = subDirs.map(makeSubdirectoryImport).join("\n");
  const subDirectoryExports = makeSubdirectoryExports(subDirs);
  return stripIndent`
${subDirectoryImports}

export default { ${subDirectoryExports} };`;
}

export function addNewTemplate({ templateName, organisationDomain }) {
  const dirsToMake = getDirsToMake(organisationDomain);
  const organisationPath = path.join(
    TLDS_PATH,
    reverseDnsNotation(organisationDomain)
  );
  if (dirsToMake.length === 0) {
    throw new Error(
      "Current version of addNewTemplate does not support adding templates to existing folder"
    );
  }

  fs.mkdirSync(organisationPath, { recursive: true });
  fs.copySync(EXAMPLE_TEMPLATE_PATH, path.join(organisationPath, templateName));

  const templateDestinationFolder = path.join(
    reverseDnsNotation(organisationDomain),
    templateName
  );

  const organisationDir = organisationPath.split(path.sep).slice(-1);
  const organisationIndex = generateOrganisationIndexExports({
    templateTagMapping: { [templateName]: templateName },
    organisationDir
  });

  fs.writeFileSync(path.join(organisationPath, "index.js"), organisationIndex);

  fs.writeFileSync(path.join(TLDS_PATH, "index.js"), generateTldsIndex());

  const childPaths = generatePartialChildPaths(templateDestinationFolder);

  const intermediateDirs = childPaths.slice(0, -2);

  intermediateDirs.map(dir => {
    const fullPath = path.resolve(TLDS_PATH, dir);
    const dirName = dir.split(path.sep).slice(-1)[0];
    const index = generateIntermediateIndexTemplate({
      subDirs: getSubDirs(fullPath),
      currDir: dirName
    });
    return fs.writeFileSync(path.join(fullPath, "index.js"), index);
  });

  return true;
}

export const cli = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "organisationDomain",
        message: "Organisation Domain Name? e.g: moe.edu.sg"
      },
      {
        type: "input",
        name: "templateName",
        message:
          "Template Name? (this is the value that will be in your certificate file) e.g: 2019-Feb-GovTech-Opencerts-Associate"
      }
    ])
    .then(answers => {
      const templatePath = path.join(
        TLDS_PATH,
        reverseDnsNotation(answers.organisationDomain),
        answers.templateName
      );
      inquirer
        .prompt([
          {
            type: "confirm",
            name: "confirm",
            message: `Organisation Domain Name: ${
              answers.organisationDomain
            }, Template Name: ${
              answers.templateName
            } \n Folder will be created at ${templatePath}`
          }
        ])
        .then(confirmation => {
          if (confirmation.confirm) {
            try {
              addNewTemplate({ ...answers });
            } catch (error) {
              console.error(error);
            }
          } else {
            console.log("Operation cancelled");
          }
        });
    });
};

export default addNewTemplate;
