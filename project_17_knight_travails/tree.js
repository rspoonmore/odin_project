class Node {
    constructor(location, children = []) {
        this.location = location;
        this.children = children;
    }

    get numChildren() {
        return this.children === null ? 0 : length(this.children);
    }
}

class Graph {
    constructor(boardWidth = 7, boardHeight = 7) {
        this.boardX = boardWidth;
        this.boardY = boardHeight;
        this.potentialMovements = [[-1, -2], [-1, 2], [1, -2], [1, 2], [-2, -1], [-2, 1], [2, -1], [2, 1]];
        this.vMap = [];
        this.clearVMap();

        
    }

    clearVMap() {
        this.vMap = [];
        for (let i = 0; i < this.boardX; i++){
            let newRow = [];
            for (let j = 0; j < this.boardY; j++) {
                newRow.push([]);
            }
            this.vMap.push(newRow);
        }
    }

    isValidLocation(location) {
        if(location[0] < 0 | location[0] >= this.boardX) {
            return false;
        }
        if(location[1] < 0 | location[1] >= this.boardY) {
            return false;
        }
        return true;
    }

    getPathFromTarget(start, target) {
        let path = [];
        let currentLoc = target;
        while(currentLoc[0] != start[0] || currentLoc[1] != start[1]) {
            path.unshift(currentLoc);
            currentLoc = this.vMap[currentLoc[0]][currentLoc[1]][0];
            if (currentLoc.length == 0) {
                throw new Error('Traversal from target hit dead end');
            }
        }
        path.unshift(start);
        return path;
        
    }

    printPath(path) {
        console.log(`You made it in ${path.length - 1} moves!`)
        for(let i = 0; i < path.length; i++) {
            console.log(path[i])
        }
    }

    findPath(start, target) {
        this.clearVMap()
        this.vMap[start[0]][start[1]] = start;
        let workingQueue = [[start, 0]];
        let lowestCost = null;
        while (workingQueue.length > 0) { // while there are still cells to visit
            let [currentLoc, currentCost] = workingQueue.shift();
            if (lowestCost !== null && currentCost >= lowestCost - 1) {continue} // only proceed if not past the lowest cost
            for (let i=0; i < this.potentialMovements.length; i++) {// For each potential move
                let move = this.potentialMovements[i];
                let newLoc = [currentLoc[0], currentLoc[1]];
                newLoc[0] += move[0];
                newLoc[1] += move[1];
                if(!this.isValidLocation(newLoc)) {continue} // check valid location
                let mappedData = this.vMap[newLoc[0]][newLoc[1]]

                if(typeof(mappedData) == "object" & mappedData[1] < currentCost + 1) {continue} // got there in fewer moves
                workingQueue.push([newLoc, currentCost + 1]);
                this.vMap[newLoc[0]][newLoc[1]] = [currentLoc, currentCost]
                if(newLoc[0] == target[0] & newLoc[1] == target[1]) { // If target found
                    lowestCost = lowestCost === null ? currentCost : Math.min([currentCost, lowestCost])
                }
            }
        }
        this.printPath(this.getPathFromTarget(start, target))
        return false;
        
    }
}


export {Graph}