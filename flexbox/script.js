// function Employee(name, department) {
//   this.name = name;
//   this.department = department;

//   this.getInfo = function () {
//     console.log(this.name, this.department);
//   };
// }

// var emp1 = new Employee("vikas", "IT");
// emp1.getInfo(); // vikas IT

// var emp2 = { name: "saurav", department: "IT", getInfo: emp1.getInfo };
// emp1.name = "RK";
// emp2.getInfo();

(function () {
  var arraynumb = [2, 8, 15, 3648, 16, 23, 42];
  Array.prototype.sort = function (a, b) {
    return b - a;
  };
  // console.log(arraynumb.sort());
  console.log(arraynumb);
})();
(function () {
  var numberArray = [2, 8, 15, 3648, 16, 23, 42];
  numberArray.sort(function (a, b) {
    if (a === b) return 0;
    else {
      return a > b ? 1 : -1;
    }
  });

  console.log(numberArray);
})();

(function () {
  var numberArray = [2, 8, 15, 3648, 16, 23, 42];
  numberArray.sort(function (a, b) {
    return b - a;
  });

  console.log(numberArray);
})();
