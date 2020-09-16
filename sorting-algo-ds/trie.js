/**
 * A trie is a Tree data structure used to store Strings in a dictonary, with each word as the node of the tree,
 * you can add word into tree and search a word from the trie
 */

function Node() {
  this.keys = new Map();
  this.end = false;
  this.setEnd = function () {
    this.end = true;
  };
  this.isEnd = function () {
    return this.end;
  };
}

function Trie() {
  this.root = new Node();

  this.add = function (word, node = this.root) {
    if (word.length === 0) {
      node.setEnd();
      return;
    } else if (!node.keys.has(word[0])) {
      node.keys.set(word[0], new Node());
      return this.add(word.substring(1), node.keys.get(word[0]));
    } else {
      return this.add(word.substring(1), node.keys.get(word[0]));
    }
  };

  this.search = function (word, node = this.root) {
    console.log(node);
    if (word.length === 0 && node.isEnd()) {
      return true;
    } else if (word.length === 0 && !node.isEnd()) {
      return false;
    } else if (node.keys.has(word[0])) {
      console.log("searching");
      return this.search(word.substring(1), node.keys.get(word[0]));
    } else {
      return false;
    }
  };

  this.searchSpecial = function (word, node = this.root) {
    console.log(word, node);
    let res = false;
    if (word.length === 0 && node.isEnd()) {
      console.log("returning true");
      return true;
    } else if (word.length === 0 && !node.isEnd()) {
      return false;
    } else if (word[0] === ".") {
      console.log("searchin ....", node);
      node.keys.forEach((value, key) => {
        console.log(word.substring(1), value, node);
        let r = this.searchSpecial(word.substring(1), value);
        if (r) res = true;
      });
    } else if (node.keys.has(word[0])) {
      console.log("searching", word.substring(1));
      console.log(node.keys.get(word[0]));
      return this.searchSpecial(word.substring(1), node.keys.get(word[0]));
    } else {
      return false;
    }
    return res;
  };
}

let trie = new Trie();
trie.add("vikas");
trie.add("pasti");
trie.add("sex");
