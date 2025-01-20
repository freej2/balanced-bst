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
}