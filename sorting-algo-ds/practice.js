function factorial(n) {
  //base case
  if (n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function factorialLoop(n) {
  let res = 1;
  for (let i = n; i >= 1; i--) {
    res *= i;
  }
  return res;
}

function findSumWithRecursion(arr, n) {
  n = n !== undefined ? n : arr.length - 1;
  if (n === 0) {
    return arr[n];
  }
  return arr[n] + findSumWithRecursion(arr, n - 1);
}

function findSumWithRecursionPlus(arr, n = 0) {
  if (n === arr.length - 1) {
    return arr[n];
  }
  return arr[n] + findSumWithRecursionPlus(arr, n + 1);
}

function findCountByRecursion(arr, n = 0) {
  if (!arr[n]) {
    return n;
  }
  return findCountByRecursion(arr, n + 1);
}

function findMax(arr, n = 0, max = 0) {
  if (!arr[n]) {
    return max;
  }
  if (arr[n] > max) {
    max = arr[n];
  }
  return findMax(arr, n + 1, max);
}

function findTagbyP() {
  addStyle();
  let pTags = document.getElementsByTagName("p");
  let searchText = " Full description ";
  let found;

  for (let i = 0; i < pTags.length; i++) {
    if (pTags[i].textContent == searchText) {
      found = pTags[i];
      break;
    }
  }
  return found.parentElement.parentElement;
}

function createBody() {
  found = findTagbyP();
  let containerEl = document.createElement("div");
  containerEl.className = `GNVPVGB-E-h GNVPVGB-j-E GNVPVGB-E-i GNVPVGB-i-a stickyContainerElement GNVPVGB-p-b`;
  containerEl.appendChild(found);
  document.body.innerHTML = "";
  document.body.appendChild(containerEl);
  let textArea = document.getElementsByTagName("textarea");
  let convertedDiv = document.createElement("div");
  convertedDiv.className = "convertedDiv";

  convertedDiv.innerText = `${textArea[0].value}`;
  textArea[0].parentNode.replaceChild(convertedDiv, textArea[0]);
  convertedDiv.parentElement.parentElement.parentElement.className =
    "descClass";
}

function addStyle() {
  let css = `
    .descClass { 
        
        width:75%
    }
.convertedDiv{
    font-size:16px;
    color:black;
}
    label{
        display:flex;
        padding:25px;
        justify-content:space-around
    }
    .stickyContainerElement{
        width: 1040px;
        margin: 0 auto;
    }
    `;
  (head = document.head || document.getElementsByTagName("head")[0]),
    (style = document.createElement("style"));

  head.appendChild(style);

  style.type = "text/css";
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

//createBody();

function mergeIntervals2(ranges) {
  let sortedRanges = sortRange(ranges);
  let res = [];

  for (let i = 0; i < sortedRanges.length; i++) {
    let itemToCompare = sortedRanges[i];
    let itemToCompareIndex = i;
    //debugger;
    for (let j = 1; j < sortedRanges.length; j++) {
      if (itemToCompare[1] > sortedRanges[j][0]) {
        itemToCompare = sortedRanges[j];
        itemToCompareIndex = j;
      }
    }
    let newElement = [
      sortedRanges[i][0] < itemToCompare[0]
        ? sortedRanges[i][0]
        : itemToCompare[0],
      itemToCompare[1],
    ];
    res.push(newElement);
    sortedRanges = sortedRanges.slice(itemToCompareIndex);
  }
  return res;
}

// function merge()

function sortRange(ranges) {
  return ranges.sort((a, b) => a[a.length - 1] - b[b.length - 1]);
}

let result = mergeIntervals2([
  [12, 14],
  [1, 4],
  [3, 7],
  [5, 8],
  [12, 15],
]);
