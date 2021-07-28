const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  nums = []
  for (idx in strNums) {
    nums.push(Number(strNums[idx]));
  }
  return nums;
}


module.exports = { convertStrNums };