import { mapKeys } from "lodash";

/**
 * Adds the current directory to the path in the $template mapping
 * e.g: addDirToTemplatePath("sg" ,{ "gov/xx": cert }), it returns { "sg/gov/xx": cert }
 * @param {*} currentDir
 * @param {*} childExports
 */
export const addDirToTemplatePath = (currentDir, childExports) =>
  mapKeys(childExports, (_val, key) => `${currentDir}/${key}`);

export default addDirToTemplatePath;
