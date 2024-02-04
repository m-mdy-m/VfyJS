/**
 * Represents a node in a binary tree.
 * @class
 */
class TreeNode {
  /**
   * Creates a TreeNode.
   * @constructor
   * @param {*} value - The value to be stored in the node.
   */
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  /**
   * Adds a new node with the given value to the binary tree.
   * @param {TreeNode} parentNode - The parent node to which the new node will be added.
   * @param {*} value - The value to be added to the tree.
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
   * Searches for a value in the binary tree.
   * @param {TreeNode} node - The node to start the search from.
   * @param {*} value - The value to search for.
   * @returns {boolean} - True if the value is found, otherwise false.
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
 * @class
 */
class BinarySearchTree {
  /**
   * Creates a BinarySearchTree.
   *
   * Example usage of BinarySearchTree class.
   * @example
   * const {Binary} = require('vfyjs')
   *
   * // Create a new binary search tree
   *
   * const reservedUsernames = ["admin", "root", "superuser"];
   * const usernameValidator = new Binary.Search()
   * // Insert reserved usernames into the binary search tree
   * usernameValidator.insertArray(reservedUsernames)
   * // Validate a username
   * const usernameToValidate = "admin";
   * const isReserved = usernameValidator.search(usernameToValidate);
   *
   * if (isReserved) {
   *   console.log(`Username '${usernameToValidate}' is reserved. Please choose another.`);
   * } else {
   *   console.log(`Username '${usernameToValidate}' is valid.`);
   *  }
   * @constructor
   */
  constructor() {
    this.root = null;
  }

  /**
   * Inserts a value into the binary search tree.
   * @param {*} value - The value to be inserted.
   */
  insert(value) {
    if (!this.root) {
      this.root = new TreeNode(value);
    } else {
      this.root.addNode(this.root, value);
    }
  }

  /**
   * Inserts multiple values into the binary search tree.
   * @param {Array} values - An array of values to be inserted.
   */
  insertArray(values = []) {
    values.forEach((value) => {
      this.insert(value);
    });
  }

  /**
   * Searches for a value in the binary search tree.
   * @param {*} value - The value to search for.
   * @returns {boolean} - True if the value is found, otherwise false.
   */
  search(value) {
    return this.root.searchTree(this.root, value);
  }
}

module.exports = BinarySearchTree;
