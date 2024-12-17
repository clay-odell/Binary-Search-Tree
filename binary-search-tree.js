class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let currentNode = this.root;
    while (true) {
      if (val < currentNode.val) {
        if(currentNode.left === null) {
          currentNode.left = newNode;
          return this;
        }
        currentNode = currentNode.left;
      } else {
        if(currentNode.right === null) {
          currentNode.right = newNode;
          return this;
        }
        currentNode = currentNode.right;
      }
      
      }
    }

  

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);

    const insertNode = (node, newNode) => {
      if(newNode.val < node.val) {
        if(node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else if(node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
    };
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    insertNode(this.root, newNode);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;
    while (currentNode !== null) {
      if (val === currentNode.val) {
        return currentNode;
      } else if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right
      }
      }
      return undefined;
    }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const searchNode = (node, val) => {
      if (node === null) {
        return undefined;
      }
      if (val === node.val) {
        return node;
      }
      if (val < node.val) {
        return searchNode(node.left, val);
      } else {
        return searchNode(node.right, val);
      }
    };
    return searchNode(this.root, val);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const result = [];
    const traverse = (node) => {
      if (node === null) return;
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
    
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const result = [];
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const result = [];
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
    }
    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];
    const queue = [];
    
    if (this.root === null) return result;
  
    queue.push(this.root);
  
    while (queue.length > 0) {
      const currentNode = queue.shift();
      result.push(currentNode.val);
  
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  
    return result;
  }
  

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let removedVal = null;
    const removeNode = (node, val) => {
      if (node === null) return null;
      if (node.val === val) {
        removedVal = node.val;
        if(node.left === null && node.right === null) {
          return null;
        }
        if(node.left === null){
        return node.right;
        }
        if (node.right === null) {
          return node.left;
        }
        let currentNode = node.right;
        while (currentNode.left !== null) {
          currentNode = currentNode.left;
        }
        node.val = currentNode.val;
        node.right = removeNode(node.right, currentNode.val);
        return node;
      } else if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      } else {
        node.right = removeNode(node.right, val);
        return node;
      }
    }
    this.root = removeNode(this.root, val);
    return removedVal;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const checkHeightandBalance = (node) => {
      if (node === null) return {height: 0, balanced: true};
      let left = checkHeightandBalance(node.left);
      let right = checkHeightandBalance(node.right);

      let height = Math.max(left.height, right.height) +1;
      let balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <=1;
      return { height, balanced};
    }
    return checkHeightandBalance(this.root).balanced;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if(this.root === null || this.root.left === null && this.root.right === null ) return undefined;
    let currentNode = this.root;
    let parent = null;
    while (currentNode.right !== null) {
      parent = currentNode;
      currentNode = currentNode.right;
    }
    if (currentNode.left !== null){
     currentNode = currentNode.left;
     while (currentNode.right !== null){
      currentNode = currentNode.right
     } 
     return currentNode.val;
    }
    return parent.val;
  }
}

module.exports = BinarySearchTree;
