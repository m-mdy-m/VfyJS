/**
 * Represents a node in a binary search tree.
 */
class TreeNode {
  /**
   * Creates a new instance of TreeNode.
   * @param {*} value The value stored in the node.
   */
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  /**
   * Adds a new node to the binary search tree.
   * @param {TreeNode} parentNode The parent node to which the new node will be added.
   * @param {*} value The value to be inserted into the tree.
   */
  addNode(parentNode, value) {
    if (value < parentNode.value) {
      if (!parentNode.left) {
        parentNode.left = new TreeNode(value);
      } else {
        this.addNode(parentNode.left, value);
      }
    } else if (value > parentNode.value) {
      if (!parentNode.right) {
        parentNode.right = new TreeNode(value);
      } else {
        this.addNode(parentNode.right, value);
      }
    }
  }

  /**
   * Searches for a value in the binary search tree.
   * @param {TreeNode} node The current node being evaluated.
   * @param {*} value The value to search for.
   * @returns {boolean} True if the value is found, otherwise false.
   */
  searchTree(node, value) {
    if (!node) {
      return false;
    }
    if (value === node.value) {
      return true;
    } else if (value < node.value && node.left !== null) {
      return this.searchTree(node.left, value);
    } else if (value > node.value && node.right !== null) {
      return this.searchTree(node.right, value);
    }
    return false;
  }
}

/**
 * Represents a binary search tree.
 */
class BinarySearchTree {
  /**
   * Creates a new instance of BinarySearchTree.
   */
  constructor() {
    this.root = null;
  }

  /**
   * Inserts a value into the binary search tree.
   * @param {*} value The value to be inserted into the tree.
   */
  insert(value) {
    if (!this.root) {
      this.root = new TreeNode(value);
    } else {
      this.root.addNode(this.root, value);
    }
  }

  /**
   * Inserts an array of values into the binary search tree.
   * @param {Array} values The array of values to be inserted into the tree.
   */
  insertArray(values = []) {
    values.forEach((value) => {
      this.insert(value);
    });
  }

  /**
   * Searches for a value in the binary search tree.
   * @param {*} value The value to search for.
   * @returns {boolean} True if the value is found, otherwise false.
   */
  search(value) {
    return this.root.searchTree(this.root, value);
  }
}

/**
 * Demonstrates the usage of the BinarySearchTree class.
 * @example
 * // Create a new BinarySearchTree instance
 * const bst = new BinarySearchTree();
 *
 * // Insert values into the binary search tree
 * bst.insert(5);
 * bst.insert(3);
 * bst.insert(7);
 * bst.insert(2);
 * bst.insert(4);
 * bst.insert(6);
 * bst.insert(8);
 *
 * // Search for a value
 * console.log(bst.search(5)); // Output: true
 * console.log(bst.search(10)); // Output: false
 */
