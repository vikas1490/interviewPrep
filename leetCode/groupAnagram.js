var groupAnagrams = function (strs) {
  let groups = {};
  for (let i = 0; i < strs.length; i++) {
    let current = strs[i].split("").sort().join("");
    let groupKeys = Object.keys(groups);
    if (groupKeys.indexOf(current) !== -1) {
      groups[current].push(strs[i]);
    } else {
      groups[current] = [strs[i]];
    }
  }

  return Object.values(groups);
};

let res = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
