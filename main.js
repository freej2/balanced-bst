import Tree from "./Tree.js";

let array1 = [1,2,3,4,5,6,7];
const tree1 = new Tree(array1);
tree1.prettyPrint(tree1.root);
tree1.insert(8);
tree1.prettyPrint(tree1.root);