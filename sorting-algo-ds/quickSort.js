/**
 * Time complexity is O(nlogn)
 * Algorithm
 * it works on the logic of Divide and Conqure
 *
 * 1) Take one pivot point
 * 2) Everthing greater then pivot point value should be kept after pivot point
 * 3) Everything lesser then pivot point should be kept before pivot point.
 * 4) after first iteration run the same program for pivot point greater then previous
 */

function quickSort(arr, startIndex, endIndex) {
  let start = startIndex !== undefined ? startIndex : 0;
  let end = endIndex !== undefined ? endIndex : arr.length - 1;

  console.log(arr, start, end);
  console.log(arr, startIndex, endIndex);
  if (start >= end) return;

  let pivotIndex = getPivotIndex(arr, start, end);
  quickSort(arr, start, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, end);
  return arr;
}

function getPivotIndex(arr, start, end) {
  let pivotValue = arr[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, pivotIndex);
      console.log("swap in loop", arr);
      pivotIndex++;
    }
  }
  swap(arr, pivotIndex, end);
  return pivotIndex;
}

function swap(arr, source, target) {
  let temp = arr[source];
  arr[source] = arr[target];
  arr[target] = temp;
}
