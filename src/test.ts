const n = 5;
const t = 2**n

// defaultAddress = 0
// [0,1,2 ... 31][32, 17,... 47][48, 49, .. 55][56,... 59] [60, 61] 
// 32             16             8              4    // sigma(2^n -2)
// search 0 ~ 2**n - 1

const mapping: {[key: string]: string} = {}; 

const searchOwner = (index: number, depth = 0, offset = 0): string => {
  if (depth === n) {
    return "0";
  }
  if (mapping[String(index + offset)]) {
    return mapping[String(index + offset)];
  }
  const newOffset = offset + 2**(n-depth)
  return searchOwner(Math.floor(index / 2), depth + 1, newOffset  )
};

const bulkInsertOwner = (address: string, index: number, targetDepth: number, depth = 0, offset = 0): void => {
  if (depth === n) {
    return;
  }
  if (targetDepth === depth) {
    mapping[String(index  + offset)] = address;
    return 
  }
  const newOffset = offset + 2**(n-depth)
  return bulkInsertOwner(address, index, targetDepth, depth + 1, newOffset)
};
const buy = (address: string, index: number) => {
  bulkInsertOwner(address, index, 0);
};

const searchAll = () => {
  return Array.from(Array(t).keys()).map(k => {
    const res = searchOwner(k)
    return res;
  });
};

console.log(searchAll());

bulkInsertOwner("test1", 0, 2) // means (2^2 * 0) to (2^2 * 1 - 1)  -> [0, 3]
console.log(searchAll());

bulkInsertOwner("test2", 3, 1) // means (2^1 * 3) to (2^1 * 4 - 1)  -> [6, 7]
bulkInsertOwner("test3", 4, 1) // means (2^1 * 4) to (2^2 * 5 - 1)  -> [8, 9]
console.log(searchAll());

bulkInsertOwner("test4", 1, 4) // means (2^4 * 1) to (2^4 * 2 - 1)  -> [16, 31]
console.log(searchAll());

buy("buy1", 14);
buy("buy2", 1);
console.log(searchAll());

searchAll();



// 
