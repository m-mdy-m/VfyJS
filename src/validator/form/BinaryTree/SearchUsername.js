class TreeNode {
  constructor(value) {
    this.root = value;
    this.left = null;
    this.right = null;
  }
  addNode(node, value) {
    if (value < node.value) {
      if (!this.left) {
        this.left = node;
      } else {
        this.left.addNode(node.left, value);
      }
    } else if (value > node.value) {
      if (!this.right) {
        this.right = node;
      } else {
        this.right.addNode(node.right, value);
      }
    }
  }
  searchTree(node,value){
    if (!node) {
        return false
    }
    if (value === node.value) {
        return false
    }else if(value <  node.value && this.left!==null) {
        return node.left.searchTree(node.left,value)
    }else if(value < node.value && this.right!==null){
        return node.right.searchTree(node.right,value)
    }
    return null
  }
}
class SearchBinary {
  constructor(value) {
    this.root = null;
  }
  insert(value) {
    if (!this.root) {
      this.root = new TreeNode(value);
    } else {
      this.root.addNode(this.root, value);
    }
  }
  insertArray(values=Array){
    values.forEach((value)=>{
        this.insert(value)
    })
  }
  search(value){
    return this.root.searchTree(this.root,value)
  }
}
// Example Usage
const reservedUsernames = ["admin", "root", "superuser"];
const usernameValidator = new SearchBinary()

// Insert reserved usernames into the BST
usernameValidator.insertArray(reservedUsernames)
// Validate a username
const usernameToValidate = "admin";
const isReserved = usernameValidator.search(usernameToValidate);

if (isReserved) {
  console.log(`Username '${usernameToValidate}' is reserved. Please choose another.`);
} else {
  console.log(`Username '${usernameToValidate}' is valid.`);
}