import { mapKeys } from "lodash";

const mapDir = (dir, obj) => mapKeys(obj, (_val, key) => `${dir}/${key}`);

export default mapDir;
