import Tree from "./Tree.js";

// Function to generate array of random numbers
function randomArray(size) {
    return Array.from({length: size}, () => Math.floor(Math.random() * 100));
}

// Create a tree with random numbers
const array = randomArray(10);
const tree = new Tree(array);

// Step 1: Confirm tree is balanced
console.log('Is the tree balanced?', tree.isBalanced());

// Step 2: Print all elements
console.log('\nLevel Order:');
tree.levelOrder((value) => console.log(value));

console.log('\nPre Order:');
tree.preOrder((value) => console.log(value));

console.log('\nPost Order:');
tree.postOrder((value) => console.log(value));

console.log('\nIn Order:');
tree.inOrder((value) => console.log(value));

// Step 3: Unbalance tree by adding numbers > 100
tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);

// Step 4: Confirm tree is unbalanced
console.log('\nIs the tree balanced after adding numbers > 100?', tree.isBalanced());

// Step 5: Rebalance the tree
tree.rebalance();

// Step 6: Confirm tree is balanced again
console.log('\nIs the tree balanced after rebalancing?', tree.isBalanced());

// Step 7: Print all elements again
console.log('\nLevel Order after rebalance:');
tree.levelOrder((value) => console.log(value));

console.log('\nPre Order after rebalance:');
tree.preOrder((value) => console.log(value));

console.log('\nPost Order after rebalance:');
tree.postOrder((value) => console.log(value));

console.log('\nIn Order after rebalance:');
tree.inOrder((value) => console.log(value));

