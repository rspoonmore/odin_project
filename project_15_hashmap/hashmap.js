import { LinkedList } from "./linkedlist.js";

class HashMap {
    constructor(loadFactor, capacity) {
        this.originalCap = capacity;
        this.loadFactor = loadFactor;
        this.currentLoad = 0;
        this.capacity = capacity;
        this.buckets = new Array(this.capacity);
    }

    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }

    expandBuckets() {
        this.capacity *= 2;
        this.currentLoad = 0;
        let oldBuckets = this.buckets;
        this.buckets = new Array(this.capacity);
        oldBuckets.forEach((currentList) => {
            while(currentList.head != null) {
                let currentNode = currentList.head;
                this.set(currentNode.key, currentNode.value);
                currentList.head = currentNode.next;
            }
        })
    }

    getLinkedListFromKey(key) {
        let hashkey = this.hash(key) % this.capacity;
        return this.buckets[hashkey];
    }

    set(key, value) {
        let matchedLinkedList = this.getLinkedListFromKey(key)
        if (matchedLinkedList == undefined) {
            let newLinkedList = new LinkedList();
            newLinkedList.append(key, value);
            this.buckets[hashkey] = newLinkedList;
            this.currentLoad += (1 / this.capacity);
            if (this.currentLoad >= this.loadFactor) {
                this.expandBuckets();
            }
            return;
        }
        matchedLinkedList.replaceOrAppend(key, value);
    }

    get(key) {
        let matchedLinkedList = this.getLinkedListFromKey(key)
        if (matchedLinkedList == undefined) {
            return null
        }
        return matchedLinkedList.getValue(key);
    }

    has(key) {
        let matchedLinkedList = this.getLinkedListFromKey(key)
        if (matchedLinkedList == undefined) {
            return false
        }
        return matchedLinkedList.contains(key);
    }

    remove(key) {

    }

    length() {

    }

    clear() {
        this.buckets = new Array(this.capacity);
        this.capacity = this.originalCap;
    }

    keys() {

    }

    values() {

    }

    entries() {

    }
}


let hm = new HashMap(.5, 2)
console.log(hm)
hm.set('apple', 'red')
console.log(hm)
hm.set('carrot', 'orange')
console.log(hm)
hm.buckets.forEach((idx, currentList) => {console.log(idx, currentList.toString())})
