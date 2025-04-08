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