// function Employee(name, department) {
//   this.name = name;
//   this.department = department;

//   info = "Very good";

//   this.getInfo = function () {
//     console.log(this.name, this.department);
//   };
// }

// function HOD(name, dep, age) {
//   Employee.call(this, name, dep);
//   this.age = age;
// }

// var hod = new HOD("saurav", "it", 10);

// HOD.prototype = Employee.prototype; //why we dont do this

// HOD.prototype = Object.create(Employee.prototype); // why this

Promise.prototype.myAllSettled = function (arr = []) {
  return new Promise(function processIterable(resolve, reject) {
    let result = [];
    arr.forEach((item) => {
      item
        .then((value) => {
          result.push({ status: "fulfilled", value: value });
          if (arr.length === result.length) resolve(result);
        })
        .catch((err) => {
          result.push({ status: "rejected", reason: `${err}` });
          if (arr.length === result.length) resolve(result);
        });
    });
  });
};

// Promise.prototype.myAllSettled = function (arr = []) {
//   return Promise.all(
//     arr.map(async (item) => {
//       try {
//         let val = await item;
//         return { status: "fulfilled", value: val };
//       } catch (error) {
//         return { status: "rejected", reason: `${error}` };
//       }
//     })
//   );
// };

// Promise.prototype.myAllSettled = function (arr = []) {
//   return Promise.all(
//     arr.map((item) => {
//       item
//         .then((val) => {
//           console.log(val);
//           return { status: "fulfilled", value: val };
//         })
//         .catch((err) => {
//           console.log(err);
//           return { status: "rejected", reason: `${err}` };
//         });
//     })
//   );
// };

// console.log(myFunc("XYZ"));
// var XYZ = function (name) {
//   return name;
// };
// // var emp2 = { name: "saurav", department: "IT", getInfo: emp1.getInfo };
// // emp1.name = "RK";
// // emp2.getInfo();

// (function () {
//   var arraynumb = [2, 8, 15, 3648, 16, 23, 42];
//   Array.prototype.sort = function (a, b) {
//     return b - a;
//   };
//   // console.log(arraynumb.sort());
//   console.log(arraynumb);
// })();
// (function () {
//   var numberArray = [2, 8, 15, 3648, 16, 23, 42];
//   numberArray.sort(function (a, b) {
//     if (a === b) return 0;
//     else {
//       return a > b ? 1 : -1;
//     }
//   });

//   console.log(numberArray);
// })();

// (function () {
//   var numberArray = [2, 8, 15, 3648, 16, 23, 42];
//   numberArray.sort(function (a, b) {
//     return b - a;
//   });

//   console.log(numberArray);
// })();

// returns a bounded fucntion

let info = {
  firstName: "vikas",
  lastName: "Tiwari",
};

function printInfo(state) {
  console.log(this.firstName + this.lastName + state);
}

// let bprintInfo = printInfo.bind(info)
// bprintInfo()

Function.prototype.myCall = function (...args) {
  let mainFunc = this;
  arguments[0].func = mainFunc;
  //let result = arguments[0].func(String([...arguments].slice(1)))
  let arugs = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    arugs.push("arguments[" + i + "]");
  }
  let result = eval(`arguments[0].func(${arugs})`);
  delete arguments[0].func;
  return result;
};

Function.prototype.myApply = function (...args) {
  arguments[0].func = this;
  let result = arguments[0].func([...arguments].slice(1));
  delete arguments[0].func;
  return result;
};

printInfo.call(info, { haryana: "new delhi" });
printInfo.myCall(info, ["haruana, new delhi"]);

Function.prototype.myBind = function (context, args) {
  let calledFunction = this;
  console.log(arguments);
  let funcArgs = [...arguments].slice(1);
  return function () {
    let cargs = arguments;
    calledFunction.apply(context, [...funcArgs, ...cargs]);
  };
};

// takes a function as an argument and retrns a new array depanding upon the return vaue of func

Array.prototype.myfilter = function (filterFunc) {
  let outPut = [];
  for (let i = 0; i <= this.length; i++) {
    if (filterFunc(this[i])) {
      outPut.push(this[i]);
    }
  }
  return outPut;
};

// let mybind = printInfo.myBind(info)
// mybind('haryana')

Array.prototype.myFlat = function () {
  let output = [];
  for (let i = 0; i < this.length; i++) {
    if (Array.isArray(this[i])) output.push(...this[i]);
    else output.push(this[i]);
  }

  return output;
};

function myDebounce(func, delay) {
  let timer;
  return function (args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(args);
    }, delay);
  };
}

function myThrottle(func, delay) {
  let timer;
  return function (args) {
    if (timer) return;
    timer = setTimeout(() => {
      func.apply(args);
      timer = undefined;
    }, delay);
  };
}

function myThrottle(func, delay) {
  let timer;
  return function (args) {
    if (timer) return;
    timer = setTimeout(() => {
      func.apply(args);
      timer = undefined;
    }, delay);
  };
}

function MyClass(name) {
  if (this === window) {
    let obj = Object.create(MyClass.prototype);
    obj = MyClass.call(obj, name);
    return obj;
  }
  this.name = name;
}

// function MyClass(name) {

//     return new MyClass(name);

//   this.name;
// }

function getElementsByClassName(el, className) {
  let result = [];

  for (let i = 0; i < el.children.length; i++) {
    let el = hasClass(el.children[i], className);
    if (el) result.push(el);
    if (el.children[i].children) {
      let newResult = getElementsByClassName(
        el.children[i].children,
        className
      );
      result = [...newResult, ...result];
    }
  }
  return result;
}

function hasClass(el, className) {
  if (el.classlist.includes(className)) {
    return el;
  }
}

function getElementsByClassName(el, className) {
  let result = [];

  function iterate(el) {
    for (let i = 0; i < el.children.length; i++) {
      let el = hasClass(el.children[i], className);
      if (el) result.push(el);
      if (el.children[i].children) {
        iterate(el.children[i].children);
      }
    }
  }
  iterate(el);
  return result;
}

// function MyPromise(fn) {
//   this.value = fn();

//   let resolve = fn.arguments[0];
//   let reject = fn.arguments[1];

//   this.then = function (resolve) {
//     resolve();
//   };

//   this.catch = function (reject) {
//     reject();
//   };
// }

// let myPromise = new Promise((resolve, reject) => {
//   setTimeout(function () {
//     resolve();
//   }, 1000);
// });

//f(1)(2)(3)//6
//F(1,2,3)//6
//f()//0

// function multiply(...args) {
//   let mul = 1;
//   if (args.length === 0) {
//     return 0;
//   }
//   if (args.length > 1) {
//     mul = args.reduce((acc, crr) => {
//       acc = acc * crr;
//       return acc;
//     }, mul);
//   }

//   return (function (y) {
//     if (y) {
//       return (function () {
//         mul * multiply(y);
//       })();
//     } else {
//       return mul;
//     }
//   })();
// }

//find minimum index in the array
//divide the array in to two parts left and right

// let maxSubArray = function (nums) {
//   let max = sumOfArray(nums, 0, nums.length - 1);
//   let pivotArray = [];
//   function iterate(nums, startIndex, endIndex) {
//     debugger;
//     let start = startIndex === undefined ? 0 : startIndex;
//     let end = endIndex === undefined ? nums.length - 1 : endIndex;
//     let sum;
//     let pivot;

//     if (start > end) {
//       return;
//     } else if (start === end) {
//       sum = nums[start];
//       if (sum > max) {
//         max = sum;
//       }
//       return;
//     } else {
//       sum = sumOfArray(nums, start, end);
//       pivot = findMinIndex(nums, start, end);
//       if (pivotArray.includes(pivot)) {
//         return;
//       } else {
//         pivotArray.push(pivot);
//       }
//     }

//     if (sum > max) {
//       max = sum;
//     }

//     iterate(nums, start, pivot - 1);
//     iterate(nums, pivot + 1, end);
//   }
//   iterate(nums);
//   return max;
// };

function findPivotIndex(nums, start, end) {
  // console.log("start", start, "end", end);
  // let n = nums.slice(start, end + 1);
  // console.log(n);
  // let min = Math.min(...n);
  // console.log(min);
  // console.log(nums.indexOf(min));
  return parseInt((start + end) / 2);
}

function sumOfArray(nums, start, end) {
  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += nums[i];
  }
  return sum;
}

function maxSubArray(arr) {
  let ans = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
    if (sum > ans) {
      ans = sum;
    }
    if (sum < 0) {
      sum = 0;
    }
  }
  return ans;
}

var moveZeroes = function (nums) {
  debugger;

  function iterate(nums, start, end) {
    if (start === end) {
      return;
    }

    if (nums[start] === 0) {
      nums.splice(start, 1);
      nums.push(0);
      iterate(nums, start, end - 1);
    }
  }
  iterate(nums, 0, nums.length - 1);
};

let res = [0, 0, 1];
moveZeroes(res);
