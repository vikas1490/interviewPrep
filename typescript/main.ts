function maxSubArray(nums: number[]): number {
  let sorted: number[] = nums.sort((a, b) => b - a);
  let max = sumOfArray(sorted);

  for (let i = 1; i < nums.length; i++) {
    let newSum = sumOfArray(sorted, i);
    if (max < newSum) {
      max = newSum;
    }
  }
  return max;
}

function sumOfArray(nums: number[], start: number = 0): number {
  let sum: number = 0;
  //let sliceOfArray:number[]=nums.slice(start)
  for (let i = start; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum;
}
