import { Tree } from "./bst.js";

let randArray = []
for(let i = 0; i < 10; i++) {
    randArray.push(Math.floor(Math.random() * 100))
}
const tree = new Tree(randArray);

tree.print()
console.log(`isBalanced: ${tree.isBalanced()}`)
console.log('*************************************************')
console.log('print in level')
tree.levelOrder((n) => {console.log(n.data)})

console.log('*************************************************')
console.log('print pre')
tree.preOrder((n) => {console.log(n.data)})

console.log('*************************************************')
console.log('print post')
tree.postOrder((n) => {console.log(n.data)})

console.log('*************************************************')
console.log('print in order')
tree.inOrder((n) => {console.log(n.data)})

console.log('*************************************************')
console.log('Add 3 numbers > 100')
for(let i = 0; i < 3; i++) {
    let newNum = Math.floor(Math.random() * 100 + 101)
    tree.insert(newNum)
}
tree.print()
console.log(`isBalanced: ${tree.isBalanced()}`)

console.log('*************************************************')
console.log('Rebalance Tree')
tree.rebalance()
tree.print()
console.log(`isBalanced: ${tree.isBalanced()}`)

console.log('*************************************************')
console.log('print in level')
tree.levelOrder((n) => {console.log(n.data)})

console.log('*************************************************')
console.log('print pre')
tree.preOrder((n) => {console.log(n.data)})

console.log('*************************************************')
console.log('print post')
tree.postOrder((n) => {console.log(n.data)})

console.log('*************************************************')
console.log('print in order')
tree.inOrder((n) => {console.log(n.data)})