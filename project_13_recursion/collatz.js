function collatz(n, steps = 0) {
    if (n == 1) {
        return steps
    }
    if (n % 2 == 0) {
        return collatz(n / 2, steps + 1)
    }
    return collatz(3 * n + 1, steps + 1)
}

[1, 2, 3, 4, 5, 6, 7, 8, 15, 27, 50].forEach(currentN => {
    let currentSteps = collatz(currentN)
    console.log(`${currentN}: ${currentSteps}`)
})