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
        let hashkey = this.hash(key) % this.capacity;
        let matchedLinkedList = this.getLinkedListFromKey(key)
        if (matchedLinkedList == undefined) {
            let newLinkedList = new LinkedList();
            newLinkedList.append(key, value);
            this.buckets[hashkey] = newLinkedList;
            this.currentLoad += (1 / this.capacity);
            if (this.currentLoad > this.loadFactor) {
                this.expandBuckets();
            }
            return;
        }
        let replaced = matchedLinkedList.replaceOrAppend(key, value);
        if(!replaced) {
            this.currentLoad += (1 / this.capacity);
            if (this.currentLoad > this.loadFactor) {
                this.expandBuckets();
            }
        }
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
        let matchedLinkedList = this.getLinkedListFromKey(key)
        if (matchedLinkedList == undefined) {
            return false
        }
        let removed = matchedLinkedList.remove(key);
        if(removed) {
            this.currentLoad -= (1 / this.capacity)
        }
    }

    length() {
        let currentSize = 0;
        this.buckets.forEach((linkedList) => {
            currentSize += linkedList.size;
        })
        return currentSize;
    }

    clear() {
        this.buckets = new Array(this.capacity);
        this.capacity = this.originalCap;
        this.currentLoad = 0;
    }

    keys() {
        let keyList = [];
        this.buckets.forEach((linkedList) => {
            let currentNode = linkedList.head;
            while(currentNode != null) {
                keyList.push(currentNode.key);
                currentNode = currentNode.next;
            }
        })
        return keyList;
    }

    values() {
        let valueList = [];
        this.buckets.forEach((linkedList) => {
            let currentNode = linkedList.head;
            while(currentNode != null) {
                valueList.push(currentNode.value);
                currentNode = currentNode.next;
            }
        })
        return valueList;
    }

    entries() {
        let entryList = [];
        this.buckets.forEach((linkedList) => {
            let currentNode = linkedList.head;
            while(currentNode != null) {
                entryList.push([currentNode.key, currentNode.value]);
                currentNode = currentNode.next;
            }
        })
        return entryList;
    }
}

export {HashMap}
