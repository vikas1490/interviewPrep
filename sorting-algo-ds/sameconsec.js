var numsSameConsecDiff = function (N, K) {
  let res = new Set();

  for (let i = N === 1 ? 0 : 1; i <= 9; i++) {
    iterateBody(i);
  }

  function iterateBody(i) {
    let processStack = [];
    let count = 0;
    let num = "";
    function iterate() {
      count++;
      let current;
      //   num = num + current;
      console.log(count);
      if (count === N) {
        createNum(num);
      }

      current = processStack.pop();
      num = num + current;

      console.log(processStack, num, current);
      if (current + K <= 9) {
        processStack.push(Number(current + K));
      }
      if (current - K >= 0) {
        processStack.push(Number(current - K));
      }
      if (processStack.length > 0 && count !== N) {
        iterate();
      }
    }

    function createNum(num) {
      console.log(processStack, num);
      for (let i = 0; i < processStack.length; i++) {
        //let lastNum = processStack.pop();
        console.log(num + processStack[i]);
        res.add(num + processStack[i]);
      }
      processStack = [];
    }

    processStack.push(i);
    iterate();
  }

  return [...res];
};
