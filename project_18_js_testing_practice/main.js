function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function reverseString(s) {
    let res = '';
    const sArray = s.split('');
    for(let i = sArray.length - 1; i >= 0; i--){
        res += sArray[i]
    }
    return res;
}

function calculator(operation, a, b){
    if(operation == 'add') {return a + b}
    if(operation == 'subtract') {return a - b}
    if(operation == 'divide') {return a / b}
    if(operation == 'multiply') {return a * b}
    return undefined;
}

function shiftLetterBy(letter, shiftAmount) {
    const letterCode = letter.charCodeAt();
    if(letterCode < 65 | letterCode > 122 | (letterCode > 90 & letterCode < 97)) {return letter};
    let newLetterCode = letterCode + shiftAmount;
    const upperRange = (letterCode >= 65 & letterCode <= 90) ? 90 : 122;
    const lowerRange = (letterCode >= 65 & letterCode <= 90) ? 65 : 97;
    if(newLetterCode > upperRange){
        newLetterCode = lowerRange + newLetterCode - upperRange - 1;
    }
    else if(newLetterCode < lowerRange) {
        newLetterCode = upperRange + newLetterCode - lowerRange + 1;
    }
    return String.fromCharCode(newLetterCode);
}

function caesarCipher(word, shift) {
    let result = "";
    const wordArray = word.split('');
    for(let i = 0; i < wordArray.length; i++) {
        result += shiftLetterBy(wordArray[i], shift)
    }
    return result;
}

function isNumber(value) {
    return /^-?\d+(\.\d+)?$/.test(value);
  }

function analyzeArray(arr) {
    const lArr = arr.length;
    let _min = undefined;
    let _max = undefined;
    let _sum = 0;
    let lArrTrue = 0;
    for(let i = 0; i < lArr; i++){
        const currentNum = arr[i]
        if(isNumber(currentNum)){
            lArrTrue += 1;
            _sum += currentNum;
            if(currentNum > _max | _max == undefined) {_max = currentNum};
            if(currentNum < _min | _min == undefined) {_min = currentNum};
        }
    }
    return {
        'average': _sum / lArrTrue,
        'min': _min,
        'max': _max,
        'length': lArr
    }
}

module.exports = {
    'capitalize': capitalize, 
    'reverseString': reverseString,
    'calculator': calculator,
    'caesarCipher': caesarCipher,
    'analyzeArray': analyzeArray
};