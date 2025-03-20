class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
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
    
     
}


export {Tree}