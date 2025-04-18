class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    hit() {
        if (this.hits >= this.length) {
            throw new Error('Ship cannot be hit more times than it has length')
        }
        this.hits += 1;

    }

    get getLength() {
        return this.length;
    }

    get isSunk() {
        return this.hits == this.length;
    }
}

export {Ship}