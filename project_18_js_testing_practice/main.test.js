const ex = require('./main');

test('Test capitalize', () => {
    const testWords = ['Test', 'test', 'tEST', 't', ' test'];
    testWords.forEach((word) => {
        const wordArray = word.split('');
        const resultArray = ex['capitalize'](word).split('');
        expect(resultArray.length).toBe(wordArray.length);
        expect(wordArray[0].toUpperCase()).toBe(resultArray[0])
        for(let i=1; i < wordArray.length; i++){
            expect(wordArray[i]).toBe(resultArray[i])
        }
    })
})

test('Reverse String', () => {
    const testWords = ['lkLKJAIlwke', 'test', 'MMM', 'iI'];
    testWords.forEach((word) => {
        const wordArray = word.split('');
        const resultArray = ex['reverseString'](word).split('');
        expect(resultArray.length).toBe(wordArray.length);
        for(let i = 0; i < wordArray.length; i++){
            expect(wordArray[wordArray.length - i - 1]).toBe(resultArray[i])
        }
    })
})

test('Calculator', () => {
    for(let i = 0; i < 10; i++){
        const a = Math.random() * 200 - 100;
        const b = Math.random() * 200 - 100;
        expect(ex['calculator']('add', a, b)).toBeCloseTo(a + b);
        expect(ex['calculator']('subtract', a, b)).toBeCloseTo(a - b);
        expect(ex['calculator']('divide', a, b)).toBeCloseTo(a / b);
        expect(ex['calculator']('multiply', a, b)).toBeCloseTo(a * b);
        expect(ex['calculator']('test', a, b)).toBeUndefined();
    }
})

test('Caesar Cipher', () => {
    const testWords = {
        'Hello': [2, 'Jgnnq'], 
        'A': [-2, 'Y'],
        'a': [-3, 'x'],
        'y': [4, 'c'],
        'Y': [2, 'A'],
        'He,!-0llo': [1, 'If,!-0mmp']
    }
    Object.entries(testWords).forEach(([key, value]) => {
        expect(ex['caesarCipher'](key, value[0])).toBe(value[1])
    })
})

test('Analyze Array', () => {
    const arraySize = 15;
    for(let i = 0; i < 10; i++){
        let testArray = [];
        for(let j = 0; j < arraySize; j++){
            testArray.push(Math.random() * 200 - 100)
        }
        const testAnswer = ex['analyzeArray'](testArray);
        expect(testAnswer['average']).toBeCloseTo(testArray.reduce((a, b) => a + b) / testArray.length);
        expect(testAnswer['min']).toBeCloseTo(Math.min(...testArray));
        expect(testAnswer['max']).toBeCloseTo(Math.max(...testArray));
        expect(testAnswer['length']).toBeCloseTo(testAnswer.length);
    }

    const testArray = [1, 2, undefined, 4];
    const testAnswer = ex['analyzeArray'](testArray);
    expect(testAnswer['average']).toBeCloseTo(7/3);
    expect(testAnswer['min']).toBeCloseTo(1);
    expect(testAnswer['max']).toBeCloseTo(4);
    expect(testAnswer['length']).toBeCloseTo(4);
})