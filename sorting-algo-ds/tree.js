class Node {
  constructor(data, children) {
    this.data = data;
    this.children = children;
  }
}

class Tree {
  constructor(root) {
    this.root = root || null;
  }

  add(data, parent) {
    let newNode = new Node(data, []);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    this.traverse((node) => {
      if (node.data === parent) {
        node.children.push(newNode);
        newNode.parent = node;
      }
      return;
    });
    // console.log(parentNode);
  }
  //traverse DFS by recurssion
  traverse(_callback) {
    function iterateBody(node) {
      _callback(node);
      if (node.children.length > 0) {
        node.children.forEach((element) => {
          iterateBody(element);
        });
      }
    }
    iterateBody(this.root);
  }
  //traverse BFS
  /**
   *
   *
   */
  traverseBFS(_callback) {
    //debugger;
    let processQueue = [];
    processQueue.push(this.root);
    function iterateBody() {
      if (processQueue.length > 0) {
        let nodeToProcess = processQueue.shift();
        _callback(nodeToProcess);
        if (nodeToProcess.children.length > 0) {
          processQueue.push(...nodeToProcess.children);
          console.log(processQueue);
        }
        iterateBody();
      }
    }
    iterateBody();
  }

  delete(value) {
    this.traverse((node) => {
      if (node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          if (node.children[i].data === value) {
            node.children.splice(i, 1);
          }
        }
      }
    });
  }

  printAll() {
    this.traverseBFS((node) => {
      console.log(node.data);
    });
  }
}
