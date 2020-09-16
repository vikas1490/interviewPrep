function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        swap(arr, i, j);
      }
    }
  }
  return arr;
}

function swap(arr, source, target) {
  let temp = arr[source];
  arr[source] = arr[target];
  arr[target] = temp;
}
