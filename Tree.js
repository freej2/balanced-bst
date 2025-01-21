import Node from "./Node.js";

export default class Tree {
    constructor(array){
        this.root = this.buildTree(array);
    }

    buildTree(array){
        if (array.length === 0){
            return null;
        }
        // get rid of duplicates and sort array
        const unique = [...new Set(array)];
        unique.sort((a,b) => a - b);

        let start = 0;
        let end = unique.length - 1;
        let mid = Math.floor((start+end)/2);

        const root = unique[mid];
        const rootNode = new Node(root,this.buildTree(unique.slice(0,mid)),this.buildTree(unique.slice(mid+1)));

        return rootNode;
    }

    prettyPrint(node, prefix = "", isLeft = true){
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(value, node = this.root){
        if(node == null){
            return new Node(value);
        }

        if(value < node.data){
            node.left = this.insert(value, node.left);
        }
        else if(value > node.data){
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    deleteItem(value, node = this.root){
        if(node == null){
            return null;
        }

        if(value < node.data){
            node.left = this.deleteItem(value, node.left);
        }
        else if(value > node.data){
            node.right = this.deleteItem(value, node.right);
        }
        else {
            // Case 1: Node has no children
            if(node.left == null && node.right == null){
                return null;
            }
            // Case 2: Node has only one child
            if(node.left == null){
                return node.right;
            }
            if(node.right == null){
                return node.left;
            }
            // Case 3: Node has two children
            let succ = this.getSuccessor(node);
            node.data = succ.data;
            node.right = this.deleteItem(succ.data, node.right);
        }
        return node;
    }

    getSuccessor(curr){
        curr = curr.right;
        while (curr != null && curr.left != null){
            curr = curr.left;
        }
        return curr;
    }

    find(value, node = this.root){
        if(node === null){
            return null;
        }

        if(value === node.data){
            return node;
        }

        if(value < node.data){
            return this.find(value, node.left);
        }
        else {
            return this.find(value, node.right);
        }
    }

    levelOrder(callback){
        let queue = [];
        if(!callback || typeof callback !== 'function'){
            throw new Error('A callback function is required');
        }
        if (this.root == null){
            return;
        }
        queue.push(this.root);
        while (queue.length > 0){
            let currentNode = queue.shift();
            callback(currentNode.data);
            if(currentNode.left != null){
                queue.push(currentNode.left);
            }
            if(currentNode.right != null){
                queue.push(currentNode.right);
            }
        }
    }

    inOrder(callback, node = this.root){
        if(!callback || typeof callback !== 'function'){
            throw new Error('A callback function is required');
        }
        if (node == null){
            return;
        }
    
        this.inOrder(callback, node.left);
        callback(node.data);
        this.inOrder(callback, node.right);
    }

    preOrder(callback, node = this.root){
        if(!callback || typeof callback !== 'function'){
            throw new Error('A callback function is required');
        }
        if (node == null){
            return;
        }
        callback(node.data);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    }

    postOrder(callback, node = this.root){
        if(!callback || typeof callback !== 'function'){
            throw new Error('A callback function is required');
        }
        if (node == null){
            return;
        }
        
        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node.data);
    }

    height(node){
        if (node === null) {
            return -1;
        }
        
        let leftHeight = this.height(node.left);   // Get height of left subtree
        let rightHeight = this.height(node.right); // Get height of right subtree
        
        return Math.max(leftHeight, rightHeight) + 1;  // Add 1 for current node
    }

    depth(node, root = this.root, level = 0){
        if (root === null) {
            return -1;  // Node not found
        }
        
        if (root === node) {
            return level;  // Found the node, return current level
        }
        
        // Search left subtree
        let leftDepth = this.depth(node, root.left, level + 1);
        if (leftDepth !== -1) {
            return leftDepth;
        }
        
        // If not in left subtree, search right subtree
        return this.depth(node, root.right, level + 1);
    }

    isBalanced(node = this.root) {
        // Base case: an empty tree is balanced
        if (node === null) {
            return true;
        }
        
        // Get heights of left and right subtrees
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
        
        // Check if current node is balanced AND recursively check subtrees
        return (Math.abs(leftHeight - rightHeight) <= 1) && 
               this.isBalanced(node.left) && 
               this.isBalanced(node.right);
    }

    rebalance() {
        // Get array of all values in order
        const values = [];
        this.inOrder((value) => values.push(value));
        this.root = this.buildTree(values);
    }
}