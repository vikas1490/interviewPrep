var twoSum = function (nums, target) {
  nums.sort((a, b) => a - b);
  console.log(nums);
  for (let i = 0; i < nums.length; ++i) {
    let numToSearch = target - nums[i];
    console.log(i, numToSearch);
    let index = search(nums, numToSearch);
    if (index !== -1 && index !== i) {
      return [i, index];
    }
  }
};

function search(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let med = Math.ceil((start + end) / 2);
    if (arr[med] === target) {
      return med;
    } else if (arr[med] > target) {
      end = med - 1;
    } else {
      start = med + 1;
    }
  }

  return -1;
}

console.log(twoSum([3, 2, 4], 6));

// var twoSum = function (nums, target) {
//     for (let i = 0; i < nums.length; i++) {

//         let numToSearch = target - nums[i];
//         let index = nums.indexOf(numToSearch);
//         if (index !== -1 && index !== i) {
//           return [i, index];
//         }

//     }
//   };
