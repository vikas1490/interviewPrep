var isHappy = function (n) {
  let slow = n;
  let fast = n;
  let resSet = new Set();

  do {
    slow = findSum(slow);
    fast = findSum(findSum(fast));
    console.log("slow", slow);
    console.log("fast", fast);
  } while (slow !== fast);

  if (slow === 1) {
    return true;
  } else {
    return false;
  }
};

function findSum(n) {
  const N = n.toString();
  let sum = 0;
  for (let digit of N) {
    const product = +digit * +digit;
    sum += product;
  }
  return sum;
}
