function mergeSort(arr) {
    if (arr.length == 1) {
        return arr
    }
    const sliceNum = Math.floor(arr.length / 2);
    const leftArray = arr.slice(0, sliceNum)
    const rightArray = arr.slice(sliceNum)
    return merge(mergeSort(leftArray), mergeSort(rightArray))
}

function merge(left, right) {
    let result = [];
    let leftInd = 0;
    let rightInd = 0;

    while (leftInd < left.length && rightInd < right.length) {
        if (left[leftInd] < right[rightInd]) {
            result.push(left[leftInd]);
            leftInd += 1;
        } else {
            result.push(right[rightInd]);
            rightInd += 1;
        }
    }

    return result.concat(left.slice(leftInd), right.slice(rightInd));
}



console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]))
console.log(mergeSort([105, 79, 100, 110]))