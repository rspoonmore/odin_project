class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    get numChildren() {
        let children = 0;
        if (this.left !== null) {
            children += 1;
        }
        if (this.right !== null) {
            children += 1;
        }
        return children;
    }
}

class Tree {
    constructor(treeArray) {
        this.root = this.buildTree(treeArray)
    }

    buildTree(treeArray) {
        if (treeArray.length == 0) {
            return null
        }
        treeArray.sort((a, b) => a - b)
        return this.recursiveTreeBuilder(treeArray)
    }

    recursiveTreeBuilder(arr) {
        if (arr.length == 0) {
            return null
        }
        const midIDX = Math.floor(arr.length / 2);
        const root = new Node(arr[midIDX]);
        root.left = this.recursiveTreeBuilder(arr.slice(0, midIDX));
        root.right = this.recursiveTreeBuilder(arr.slice(midIDX + 1, arr.length));
        return root
    }

    print() {
        const prettyPrint = (node, prefix = "", isLeft = true) => {
            if (node === null) {
              return;
            }
            if (node.right !== null) {
              prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
            }
            console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
            if (node.left !== null) {
              prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
            }
        };

        prettyPrint(this.root)
    }

    insert(value) {
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }
        let currentNode = this.root;
        while (currentNode !== null) {
            if (value < currentNode.data) {
                if (currentNode.left === null) {
                    currentNode.left = new Node(value);
                    return;
                }
                else {
                    currentNode = currentNode.left;
                }
            }
            else {
                if (currentNode.right === null) {
                    currentNode.right = new Node(value);
                    return;
                }
                else {
                    currentNode = currentNode.right;
                }
            }
        }

    }

    remove(value) {
        if (this.root === null) {
            return false;
        }
        let currentParent = null;
        let currentNode = this.root;
        while (currentNode !== null) {
            if (value == currentNode.data) {
                const numChildren = currentNode.numChildren;
                // no children
                if (numChildren == 0) {
                    if (currentNode === this.root) {
                        this.root = null;
                        return true;
                    }
                    if (currentParent.left === currentNode) {
                        currentParent.left = null;
                        return true;
                    }
                    currentParent.right = null;
                    return true;
                }

                // only one child
                if (numChildren == 1) {
                    const child = currentNode.left === null ? currentNode.right : currentNode.left;
                    if (currentParent.left === currentNode) {
                        currentParent.left = child;
                        return true;
                    }
                    currentParent.right = child;
                    return true;
                }

                // multiple children
                let currentRepParent = currentNode;
                let currentRepNode = currentNode.right;
                while (currentRepNode.left !== null) {
                    currentRepParent = currentRepNode;
                    currentRepNode = currentRepNode.left;
                }
                currentRepNode.left = currentNode.left;
                if (currentRepParent !== currentNode) {
                    currentRepParent.left = currentRepNode.right;
                    currentRepNode.right = currentNode.right;
                }
                if (currentParent === null) {
                    this.root = currentRepNode;
                    return true;
                }
                if (currentParent.left === currentNode) {
                    currentParent.left = currentRepNode;
                    return true;
                }
                currentParent.right = currentRepNode;
                return true;
            }
            if (value < currentNode.data) {
                if (currentNode.left === null) {
                    return false;
                }
                currentParent = currentNode;
                currentNode = currentNode.left;
            }
            else {
                if (currentNode.right === null) {
                    return false;
                }
                currentParent = currentNode;
                currentNode = currentNode.right;
            }
        }
    }

    find(value) {
        if (this.root === null) {
            return null;
        }
        let currentNode = this.root;
        while(currentNode != null) {
            if (currentNode.data == value) {
                return currentNode;
            }
            if (value > currentNode.data) {
                currentNode = currentNode.right;
            }
            else {
                currentNode = currentNode.left;
            }
        }
        return null;
    }

    levelOrder(callback) {
        if (typeof callback != "function") {
            throw new Error(`callback of ${callback} is not a function`);
          }
        if (this.root === null) {
            return;
        }

        function appendQueue(currentNode, workingQueue = [], callQueue = []) {
            if (currentNode === null) {
                return;
            }
            callQueue.push(currentNode);
            workingQueue.push(currentNode.left);
            workingQueue.push(currentNode.right);
        }
        let callQueue = [];
        let workingQueue = [this.root];
        while (workingQueue.length > 0) {
            let currentNode = workingQueue.shift();
            appendQueue(currentNode, workingQueue, callQueue);
        }
        callQueue.forEach(callback);
    }


    preOrder(callback) {
        if (typeof callback != "function") {
            throw new Error(`callback of ${callback} is not a function`);
        }
        if (this.root === null) {
            return;
        }

        function preOrderTraversal(currentNode, callback) {
            if (currentNode === null) {
                return;
            }
            callback(currentNode);
            preOrderTraversal(currentNode.left, callback);
            preOrderTraversal(currentNode.right, callback);
        }
        preOrderTraversal(this.root, callback);
    }

    

    inOrder(callback) {
        if (typeof callback != "function") {
            throw new Error(`callback of ${callback} is not a function`);
        }
        if (this.root === null) {
            return;
        }

        function inOrderTraversal(currentNode, callback) {
            if (currentNode === null) {
                return;
            }
            inOrderTraversal(currentNode.left, callback);
            callback(currentNode);
            inOrderTraversal(currentNode.right, callback);
        }
        inOrderTraversal(this.root, callback);
    }


    postOrder(callback) {
        if (typeof callback != "function") {
            throw new Error(`callback of ${callback} is not a function`);
        }
        if (this.root === null) {
            return;
        }

        function postOrderTraversal(currentNode, callback) {
            if (currentNode === null) {
                return;
            }
            postOrderTraversal(currentNode.left, callback);
            postOrderTraversal(currentNode.right, callback);
            callback(currentNode);
        }
        postOrderTraversal(this.root, callback);
    }

    height(node){
        if(node === null) {
            return -1;
        }
        const lHeight = this.height(node.left);
        const rHeight = this.height(node.right);

        return Math.max(lHeight, rHeight) + 1;
    }
    
    depth(node){
        if (this.root === null) {
            return -1;
        }
        const findDepth = (currentNode, currentDepth) => {
            if (currentNode == null) {
                return -1;
            }
            if(currentNode == node) {
                return currentDepth + 1;
            }
            const lDepth = findDepth(currentNode.left, currentDepth);
            if (lDepth >= 0) {
                return lDepth + 1;
            }
            const rDepth = findDepth(currentNode.right, currentDepth);
            if (rDepth >= 0) {
                return rDepth + 1;
            }
            return currentDepth;
        }

        return findDepth(this.root, -1)
    }

    isBalanced(){
        if(this.root === null) {
            return true;
        }
        const lHeight = this.height(this.root.left);
        const rHeight = this.height(this.root.right);
        return Math.abs(lHeight - rHeight) < 2;
    }

    rebalance(){
        let orderedArray = [];
        this.inOrder((n) => {orderedArray.push(n.data)});
        this.root = this.recursiveTreeBuilder(orderedArray);
    }
     
}


export {Tree}