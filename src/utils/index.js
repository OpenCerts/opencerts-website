const { keccak256 } = require("ethereumjs-util");
const fs = require("fs");

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
  return keccak256(bufSortJoin(toBuf(first), toBuf(second)));
}

export default combinedHash;

const ethereumAddressMatcher = /^0x[a-fA-F0-9]{40}$/;
export function isEthereumAddress(address) {
  return ethereumAddressMatcher.test(address);
}

export function readOpenCertFile(file) {
  try {  
    const dirListing = fs.readdirSync(dirPath, {
      withFileTypes: true
    });
    console.log(dirListing.toString());    
  } catch(e) {
      console.log('Error:', e.stack);
  }
}
