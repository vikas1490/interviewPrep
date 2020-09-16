let family = {
  name: "vijay",
  age: 64,
  kids: [
    {
      name: "shyam",
      age: 34,
      kids: [
        {
          name: "Ansh",
          age: 3,
        },
      ],
    },
    {
      name: "vikas",
      age: 30,
    },
  ],
};

function findAge(family) {
  let initialAge = family.age;

  function iterate(node) {
    if (node.kids) {
      node.kids.forEach((kid) => {
        initialAge = initialAge + kid.age;
        iterate(kid);
      });
    }
  }

  iterate(family);
  return initialAge;
}

Array.prototype.myReduce = function (func, acc) {
  let res = acc;
  for (let i = 0; i < this.length; i++) {
    res = func(res, this[i]);
    console.log(res);
  }
  return res;
};

function memoize(func) {
  let cache = {};
  return function (n) {
    if (!cache[n]) {
      return (cache[n] = func.call(n));
    } else {
      return cache[n];
    }
  };
}

let obj = Object.create({}, { name: { value: "vikas", writable: false } });

class A {
  name = "vikas";

  getName() {
    console.log(this.name);
  }
}

class B extends A {
  age = 30;

  getInfo() {
    console.log(this.name, this.age);
  }
}

var titleToNumber = function (s) {
  let str = s.split("").reverse().join("");
  let colNumber = 0;
  for (let i = 0; i < str.length; i++) {
    let offset = Math.pow(26, i);
    console.log(offset, str.charCodeAt(i) - 64, colNumber);
    colNumber += offset * (str.charCodeAt(i) - 64);
  }
  return colNumber;
};

// YZ ==== 26*0 + 25 +26*1
