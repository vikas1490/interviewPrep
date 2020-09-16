/**
 * it is a very slow sorting algo,
 * you compare each element in an array to find smallest number and keep pushing it in another array, and return that array.
 */

function selectionSort(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    let smallestIndex = findSmallest(arr);
    res.push(arr[smallestIndex]);
  }
  return res;
}

function findSmalled(arr) {
  let smallest = arr[0];
  let smallestIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (a[i] < smallest) {
      smallest = a[i];
      smallestIndex = i;
    }
  }

  return smallestIndex;
}
