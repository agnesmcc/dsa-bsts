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
    let current = this.root;
    if (!current) {
      this.root = new Node(val);
      return this;
    }

    while (current) {
      if (val < current.val) {
        if (!current.left) {
          current.left = new Node(val);
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = new Node(val);
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const insertRecursivelyHelper = (current, val) => {
      if (!current) {
        return new Node(val);
      }

      if (val < current.val) {
        current.left = insertRecursivelyHelper(current.left, val);
      } else {
        current.right = insertRecursivelyHelper(current.right, val);
      }

      return current;
    };

    this.root = insertRecursivelyHelper(this.root, val);

    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) {
        return current;
      }

      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    function findRecursivelyHelper(current) {
      if (!current) {
        return undefined;
      }

      if (val === current.val) {
        return current;
      }

      if (val < current.val) {
        return findRecursivelyHelper(current.left);
      } else {
        return findRecursivelyHelper(current.right);
      }
    }

    return findRecursivelyHelper(this.root);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const result = [];
    const stack = [this.root];

    while (stack.length) {
      let current = stack.pop();
      result.push(current.val);

      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }

    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const result = [];
    const stack = [[this.root, false]];

    while (stack.length) {
      let [current, visited] = stack.pop();

      if (current) {
        if (visited) {
          result.push(current.val);
        } else {
          stack.push([current.right, false]);
          stack.push([current, true]);
          stack.push([current.left, false]);
        }
      }
    }

    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const result = [];
    const stack = [this.root];

    while (stack.length) {
        let current = stack.pop();

        result.unshift(current.val);

        if (current.left) stack.push(current.left);
        if (current.right) stack.push(current.right);
    }

    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];
    const queue = [this.root];

    while (queue.length) {
      let current = queue.shift();
      result.push(current.val);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let current = this.root;
    let parent = null;
  
    // Traverse down the tree until we find the node to be removed
    while (current) {
      if (val === current.val) {
        // Node found, now handle removal
        // If the node has no children, we can simply remove it
        if (!current.left && !current.right) {
          if (!parent) {
            // If the node is the root, we simply set the root to null
            this.root = null;
          } else if (current.val < parent.val) {
            // If the node is the left child of the parent, we set the left child to null
            parent.left = null;
          } else {
            // If the node is the right child of the parent, we set the right child to null
            parent.right = null;
          }
        } else if (!current.left) {
          // If the node only has a right child, we replace the node with its right child
          if (!parent) {
            // If the node is the root, we set the root to the right child
            this.root = current.right;
          } else if (current.val < parent.val) {
            // If the node is the left child of the parent, we set the left child to the right child
            parent.left = current.right;
          } else {
            // If the node is the right child of the parent, we set the right child to the right child
            parent.right = current.right;
          }
        } else if (!current.right) {
          // If the node only has a left child, we replace the node with its left child
          if (!parent) {
            // If the node is the root, we set the root to the left child
            this.root = current.left;
          } else if (current.val < parent.val) {
            // If the node is the left child of the parent, we set the left child to the left child
            parent.left = current.left;
          } else {
            // If the node is the right child of the parent, we set the right child to the left child
            parent.right = current.left;
          }
        } else {
          // If the node has two children, we find the inorder successor
          let successor = current.right;
          let successorParent = current;
  
          // Traverse down the right subtree to find the inorder successor
          while (successor.left) {
            successorParent = successor;
            successor = successor.left;
          }
  
          // Replace the node to be removed with its inorder successor
          current.val = successor.val;
  
          // Remove the inorder successor from the right subtree
          if (successorParent === current) {
            current.right = successor.right;
          } else {
            successorParent.left = successor.right;
          }
        }
        return current;
      }
  
      if (val < current.val) {
        parent = current;
        current = current.left;
      } else {
        parent = current;
        current = current.right;
      }
    }
  
    return null;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
