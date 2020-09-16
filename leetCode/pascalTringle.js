let pacsalTriangle = function (n) {
  let res = [[1], [1, 1]];
  for (let i = 2; i <= n; i++) {
    let row = [1];
    for (let j = 1; j < i; j++) {
      row[j] = res[i - 1][j] + res[i - 1][j - 1];
    }
    row.push(1);
    res.push(row);
  }
  return res;
};
