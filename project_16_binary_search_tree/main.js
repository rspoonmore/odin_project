import { Tree } from "./bst.js";


const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.print()

// console.log('************************************************************')
// console.log('Remove 67')
// tree.remove(67);
// tree.print();

// console.log('************************************************************')
// console.log('Add 25')
// tree.insert(25);
// tree.print();

// console.log('************************************************************')
// console.log('Find 6345')
// console.log(tree.find(6345))

// console.log('************************************************************')
// console.log('Find 45')
// console.log(tree.find(45))


console.log('************************************************************')
console.log('postOrder console.log')
let f = (n) => {console.log(n.data)};
tree.postOrder(f)


console.log('************************************************************')
console.log('depth of first 9')
console.log(tree.depth(tree.root.right.left))