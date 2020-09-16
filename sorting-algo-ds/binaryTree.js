class Node {
  constructor(data, children) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor(root) {
    this.root = root || null;
  }

  add(data) {
    let newNode = new Node(data, []);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    function iterateTree(node) {
      if (node.data <= data) {
        if (node.right) {
          iterateTree(node.right);
        } else {
          node.right = newNode;
        }
      } else {
        if (node.left) {
          iterateTree(node.left);
        } else {
          node.left = newNode;
        }
      }
    }
    iterateTree(this.root);
    // console.log(parentNode);
  }

  //traverse BFS
  /**
   *
   *
   */
  traverseBFS(_callback) {
    //debugger;
    let processQueue = [];

    function iterateBody() {
      if (processQueue.length > 0) {
        let nodeToProcess = processQueue.shift();
        _callback(nodeToProcess);
        if (nodeToProcess.left) {
          processQueue.push(nodeToProcess.left);
          // console.log(processQueue);
        }
        if (nodeToProcess.right) {
          processQueue.push(nodeToProcess.right);
        }
        iterateBody();
      }
    }
    processQueue.push(this.root);
    iterateBody();
  }

  spiralTraversal(_callback) {
    let processQueue = [];
    let processStack = [];

    function iterateQueue() {
      let nodeToProcess = processQueue.shift();
      _callback(nodeToProcess);
      if (nodeToProcess.right) {
        processStack.push(nodeToProcess.right);
      }
      if (nodeToProcess.left) {
        processStack.push(nodeToProcess.left);
      }
      if (processQueue.length > 0) {
        iterateQueue();
      } else {
        iterateStack();
      }
    }

    function iterateStack() {
      let nodeToProcess = processStack.pop();
      _callback(nodeToProcess);
      if (nodeToProcess.right) {
        processQueue.push(nodeToProcess.right);
      }
      if (nodeToProcess.left) {
        processQueue.push(nodeToProcess.left);
      }
      if (processStack.length > 0) {
        iterateStack();
      } else {
        iterateQueue();
      }
    }
    processStack.push(this.root);
    iterateStack();
  }

  //traverse DFS preorder(Root, left , right)
  traverseDFSPreOrder(_callback) {
    let processStack = [];
    function iterateBody() {
      let nodeToProcess = processStack.pop();
      _callback(nodeToProcess);
      if (nodeToProcess.right) {
        processStack.push(nodeToProcess.right);
      }
      if (nodeToProcess.left) {
        processStack.push(nodeToProcess.left);
      }
      if (processStack.length > 0) {
        iterateBody();
      }
    }
    processStack.push(this.root);
    iterateBody();
  }

  //inorder(Left root right)
  traverseDFSInOrder(_callback) {
    let processStack = [];
    function visitnode(node) {
      processStack.push(node);
      console.log(processStack);
      if (node.left) {
        //s processStack.push(node.left);
        visitnode(node.left);
      }
    }

    function explore() {
      if (processStack.length > 0) {
        let nodeToProcess = processStack.pop();
        _callback(nodeToProcess);
        if (nodeToProcess.right) {
          //processStack.push(nodeToProcess.right);
          visitnode(nodeToProcess.right);
        }
        explore();
      }
    }

    visitnode(this.root);
    explore();
  }

  //Postorder(Left right root)
  traverseDFSPostOrder(_callback) {
    let processStack = [];
    let explored = [];
    function visitnode(node) {
      processStack.push(node);
      console.log(processStack);
      if (node.left) {
        //s processStack.push(node.left);
        visitnode(node.left);
      }
    }

    function explore() {
      if (processStack.length > 0) {
        if (
          processStack[processStack.length - 1].right &&
          explored.indexOf(processStack[processStack.length - 1].right) === -1
        ) {
          visitnode(processStack[processStack.length - 1].right);
        }

        let nodeToProcess = processStack.pop();
        explored.push(nodeToProcess);
        _callback(nodeToProcess);

        explore();
      }
    }

    visitnode(this.root);
    explore();
    return explored;
  }

  // treeVerticalTraversal() {
  //   let processStack = [];
  //   let x = 0;
  //   let obj = {};

  //   function visitnode(node) {
  //     processStack.push(node);
  //     if (obj[`${x}`]) {
  //       obj[`${x}`].push(node.data);
  //     } else {
  //       obj[`${x}`] = [node.data];
  //     }

  //     if (node.left) {
  //       x = x > 0 ? x - 1 : x + 1;
  //       visitnode(node.left);
  //     }
  //   }

  //   function explore() {
  //     if (processStack.length > 0) {
  //       let nodeToProcess = processStack.pop();
  //       x = x > 0 ? x - 1 : x + 1;
  //       //_callback(nodeToProcess);
  //       if (nodeToProcess.right) {
  //         x = x > 0 ? x + 1 : x - 1;
  //         visitnode(nodeToProcess.right);
  //       }
  //       explore();
  //     }
  //   }

  //   visitnode(this.root);
  //   explore();
  //   return obj;
  // }

  verticalTreeTraversal() {
    let processStack = [];
    let x = 0;
    let y = 0;
    let obj = {};
    function visitNode(nodeData) {
      let index = nodeData[0];
      let node = nodeData[2];
      console.log(index, node);
      if (node.right) {
        processStack.push([index + 1, y, node.right]);
      }
      if (node.left) {
        processStack.push([index - 1, y, node.left]);
      }
      y++;
      explore();
    }

    function explore() {
      if (processStack.length > 0) {
        let nodeToProcess = processStack.pop();
        if (obj[nodeToProcess[0]]) {
          obj[nodeToProcess[0]][nodeToProcess[1]] = nodeToProcess[2].data;
        } else {
          obj[nodeToProcess[0]] = {};
          let newkey = nodeToProcess[1];

          obj[nodeToProcess[0]][newkey] = nodeToProcess[2].data;
        }
        visitNode(nodeToProcess);
      }
      return;
    }

    processStack.push([x, y, this.root]);
    explore();

    console.log(obj);
    // let resKeys = Object.keys(obj).sort((a, b) => a - b);
    // let res = [];
    // for (let i = 0; i < resKeys.length; i++) {
    //   res.push(obj[resKeys[i]].sort((a, b) => a - b));
    // }
    // return res;
  }

  pathSum(sum) {
    let count = 0;
    function iterate(node, balance = sum) {
      console.log(node, balance);
      if (node.data === balance) {
        count++;
      }
      if (node.left) {
        iterate(node.left, balance - node.data);
      }
      if (node.right) {
        iterate(node.right, balance - node.data);
      }
    }

    let processStack = [];
    function iterateBody() {
      let nodeToProcess = processStack.pop();
      iterate(nodeToProcess);
      if (nodeToProcess.right) {
        processStack.push(nodeToProcess.right);
      }
      if (nodeToProcess.left) {
        processStack.push(nodeToProcess.left);
      }
      if (processStack.length > 0) {
        iterateBody();
      }
    }
    processStack.push(this.root);
    iterateBody();
    return count;
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
    this.spiralTraversal((node) => {
      console.log(node.data);
    });
  }

  printBFS() {
    this.spiralTraversal((node) => {
      console.log(node.data);
    });
  }
}

let tree = new BinaryTree();

tree.add(5);
tree.add(3);
tree.add(7);
tree.add(4);
tree.add(6);
tree.add(2);
tree.add(8);
