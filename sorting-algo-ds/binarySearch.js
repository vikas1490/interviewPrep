/**
 *
 * find the middle -> you should have a low and a high
 * if number is greater then middle -> the low is middle
 * if number is lower then middle -> the high is middle
 * time complexity of binary search is O(log n)
 * array should be sorted
 */

function binarySearch(arr, n) {
  let low = 0;
  let high = arr.length - 1;

  while (high >= low) {
    let med = Math.ceil((low + high) / 2);
    console.log(med);
    if (n === arr[med]) {
      return med;
    } else if (n > arr[med]) {
      low = med + 1;
    } else {
      high = med - 1;
    }
    console.log(med);
  }

  console.log(high, low);
  return null;
}

function binarySearchWithRecurssion(arr, n, low = 0, high) {
  low = low !== undefined ? low : 0;
  high = high !== undefined ? high : arr.length - 1;
  let med = Math.ceil((low + high) / 2);
  if (high < low) {
    return null;
  }
  if (n === arr[med]) {
    return med;
  } else if (n > arr[med]) {
    return binarySearchWithRecurssion(arr, n, med + 1, high);
  } else {
    return binarySearchWithRecurssion(arr, n, low, med - 1);
  }
}

// function mergeIntervals(ranges) {
//   // Write your code here
//   let arr = ranges[0] ? ranges[0] : null;
//   if (arr) {
//     arr = ranges.reduce((acc, crr) => {
//       console.log(acc);
//       console.log(crr);
//       if (acc.length > 0) {
//         acc.forEach((item) => {
//           console.log(item);
//           if (crr[1] >= item[0]) {
//             acc.pop();
//             acc.push([item[0], crr[1]]);
//           } else {
//             acc.push(crr);
//           }
//         });
//       } else {
//         acc.push(crr);
//       }

//       return acc;
//     }, []);
//     console.log(arr);
//     return arr;
//   } else {
//     return [];
//   }
// }
