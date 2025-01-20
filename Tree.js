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

    }

    inOrder(callback){

    }

    preOrder(callback){

    }

    postOrder(callback){

    }

    height(node){

    }

    depth(node){

    }

    isBalanded(){

    }

    rebalance(){

    }
}