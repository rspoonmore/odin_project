function fib(n) {
    if (n < 2) {
        return n
    }
    return (fib(n-1) + fib(n-2)) 
}

function fibs(n) {
    let sequence = [];
    for(let i = 0; i < n; i++) {
        sequence.push(fib(i))
    }
    console.log(sequence)
}

// fibs(8)

function fibsRec(n) {
    if (n <= 0) {
        return [];
    }
    if (n === 1) {
        return [0];
    }
    if (n == 2) {
        return [0, 1];
    }
    const sequence = fibsRec(n - 1);
    sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    return sequence;
}

console.log(fibsRec(8))
