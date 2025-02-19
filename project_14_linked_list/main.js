import { LinkedList } from "./factory.js";

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log('List: ')
console.log(list.toString())

console.log(`List is ${list.size} nodes long`)

console.log(`contains parrot: ${list.contains('parrot')}`)
console.log(`contains emu: ${list.contains('emu')}`)

console.log(`find snake: ${list.find('snake')}`)
console.log(`find emu: ${list.find('emu')}`)

list.insertAt('emu', 4)
console.log('Added emu at index 4')
console.log(list.toString())
console.log(`List is ${list.size} nodes long`)

list.removeAt(2)
console.log('Removed the node at index 2')
console.log(list.toString())
console.log(`List is ${list.size} nodes long`)
