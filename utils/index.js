const { sha3 } = require("ethereumjs-util");

function bufSortJoin(...args) {
  return Buffer.concat([...args].sort(Buffer.compare));
}

function toBuf(str) {
  if (str instanceof Buffer) return str;
  return Buffer.from(str, "hex");
}

export function combinedHash(first, second) {
  if (!second) {
    return toBuf(first);
  }
  if (!first) {
    return toBuf(second);
  }
  return sha3(bufSortJoin(toBuf(first), toBuf(second)));
}

export default combinedHash;
