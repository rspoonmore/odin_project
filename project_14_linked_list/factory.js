class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    prepend(value) {
        const newNode = new Node(value);
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.newNext = this.head;
            this.head = newNode;
        }
        
    }

    append(value) {
        const newNode = new Node(value);
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
            return 
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

    contains(searchValue) {
        if (this.head == null) {
            return false
        }
        let currentNode = this.head;
        while(currentNode != null) {
            if (currentNode.value == searchValue) {
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
    }

    find(searchValue) {
        if (this.head == null) {
            return null
        }
        let currentNode = this.head;
        let idx = 0
        while(currentNode != null) {
            if (currentNode.value == searchValue) {
                return idx;
            }
            currentNode = currentNode.next;
            idx += 1;
        }
        return null;
    }

    insertAt(value, idx) {
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
            let newNode = new Node(value);
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

    toString() {
        let retString = ""
        if (this.head == null) {
            return retString
        }
        let currentNode = this.head;
        while (currentNode != null) {
            retString += `( ${currentNode.value} ) -> `
            currentNode = currentNode.next;
        }
        retString += 'null'
        return retString;
    }
}



class Node {
    constructor(value, next = null) {
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



