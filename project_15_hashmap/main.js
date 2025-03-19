import { HashMap } from "./hashmap.js"; 

const test = new HashMap(0.75, 16);

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(`Load Factor: ${test.loadFactor}\nCurrent Load: ${test.currentLoad}\nCapacity: ${test.capacity}\nLength: ${test.length()}`);
console.log(test.entries());

console.log('**************************************************************')
test.set('kite', 'blue');
console.log(`Load Factor: ${test.loadFactor}\nCurrent Load: ${test.currentLoad}\nCapacity: ${test.capacity}\nLength: ${test.length()}`);
console.log(test.entries());

console.log('**************************************************************')
test.set('moon', 'silver');
console.log(`Load Factor: ${test.loadFactor}\nCurrent Load: ${test.currentLoad}\nCapacity: ${test.capacity}\nLength: ${test.length()}`);
console.log(test.entries());

console.log('**************************************************************')
test.remove('moon');
console.log(`Load Factor: ${test.loadFactor}\nCurrent Load: ${test.currentLoad}\nCapacity: ${test.capacity}\nLength: ${test.length()}`);
console.log(test.entries());


console.log('**************************************************************')
console.log(`kite value: ${test.get('kite')}`)

console.log('**************************************************************')
console.log(`has lion: ${test.has('lion')}`)

console.log('**************************************************************')
test.clear();
console.log(`Load Factor: ${test.loadFactor}\nCurrent Load: ${test.currentLoad}\nCapacity: ${test.capacity}\nLength: ${test.length()}`);
console.log(test.entries());

