class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    prepend(key, value) {
        const newNode = new Node(key, value);
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.newNext = this.head;
            this.head = newNode;
        }
        
    }

    append(key, value) {
        const newNode = new Node(key, value);
        if (this.tail == null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.newNext = newNode;
            this.tail = newNode;
        }
    }

     get size() {
        if (this.head == null) {
            return 0;
        }
        let currentSize = 0;
        let currentNode = this.head;
        while (currentNode != null) {
            currentSize += 1;
            currentNode = currentNode.next;
        }
        return currentSize;
    }

    at(idx) {
        if (this.head == null) {
            return null
        }
        let currentNode = this.head;
        let currentIdx = 0;
        while (currentNode != null && currentIdx < idx) {
            currentNode = currentNode.next;
            currentIdx += 1;
        }
        if (currentIdx == idx) {
            return currentNode;
        }
        return null;
    }

    pop() {
        if (this.head == null) {
            return null
        }
        let lastNode = null;
        let currentNode = this.head;
        while(currentNode != this.tail) {
            lastNode = currentNode;
            currentNode = currentNode.next;
        }
        this.tail = lastNode;
        lastNode.removeNext();
        return currentNode;
    }

    contains(searchKey) {
        if (this.head == null) {
            return false
        }
        let currentNode = this.head;
        while(currentNode != null) {
            if (currentNode.key == searchKey) {
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
    }

    find(searchKey) {
        if (this.head == null) {
            return null
        }
        let currentNode = this.head;
        let idx = 0
        while(currentNode != null) {
            if (currentNode.key == searchKey) {
                return idx;
            }
            currentNode = currentNode.next;
            idx += 1;
        }
        return null;
    }

    getValue(searchKey) {
        if (this.head == null) {
            return null
        }
        let currentNode = this.head;
        let idx = 0
        while(currentNode != null) {
            if (currentNode.key == searchKey) {
                return currentNode.value;
            }
            currentNode = currentNode.next;
            idx += 1;
        }
        return null;
    }

    insertAt(key, value, idx) {
        if (this.head == null) {
            return
        }
        let lastNode = null;
        let currentNode = this.head;
        let currentIdx = 0;
        while (currentNode != null && currentIdx < idx) {
            lastNode = currentNode;
            currentNode = currentNode.next;
            currentIdx += 1;
        }
        if (currentIdx == idx) {
            let newNode = new Node(key, value);
            newNode.newNext = currentNode;
            lastNode.newNext = newNode;
        }
        return
    }

    removeAt(idx) {
        if (this.head == null) {
            return
        }
        let lastNode = null;
        let currentNode = this.head;
        let currentIdx = 0;
        while (currentNode != null && currentIdx < idx) {
            lastNode = currentNode;
            currentNode = currentNode.next;
            currentIdx += 1;
        }
        if (currentIdx == idx) {
            let nextNode = currentNode.next;
            lastNode.newNext = nextNode;
        }
        return
    }

    replaceOrAppend(key, value) {
        if (this.head == null) {
            this.append(key, value)
            return;
        }
        let currentNode = this.head;
        let idx = 0
        while(currentNode != null) {
            if (currentNode.key == searchKey) {
                if (currentNode.value != value) {
                    currentNode.value = value
                }
                return;
            }
            currentNode = currentNode.next;
            idx += 1;
        }
        this.append(key, value)
        return;
    }

    toString() {
        let retString = ""
        if (this.head == null) {
            return retString
        }
        let currentNode = this.head;
        while (currentNode != null) {
            retString += `( ${currentNode.key}, ${currentNode.value} ) -> `
            currentNode = currentNode.next;
        }
        retString += 'null'
        return retString;
    }
}



class Node {
    constructor(key, value, next = null) {
        this.key = key
        this.value = value;
        this.next = next;
    }

    set newNext(newNextNode) {
        this.next = newNextNode;
    }

    removeNext() {
        this.next = null
    }
}

export {LinkedList}



