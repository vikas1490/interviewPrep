function maxSubArray(nums) {
  let sorted = nums.sort(function (a, b) {
    return b - a;
  });
  let max = sumOfArray(sorted);
  console.log("max", max);
  for (let i = 1; i < nums.length; i++) {
    let newSum = sumOfArray(sorted, i);
    console.log("newSum", newSum);
    if (max < newSum) {
      max = newSum;
      console.log("newmax", max);
    }
  }
  return max;
}
function sumOfArray(nums, start) {
  if (start === void 0) {
    start = 0;
  }
  let sum = 0;
  //let sliceOfArray:number[]=nums.slice(start)
  for (let i = start; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum;
}
