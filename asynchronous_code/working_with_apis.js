const form = document.querySelector('form');
const img = document.querySelector('img');
const searchBar = document.querySelector('#searchBar');
const button = document.querySelector('button');
const apiKey = 'P8cexa5XvLlupQQGytiyVt2TjslDepEM';

function searchGIFS(searchField) {
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${searchField}`;
    fetch(url, {mode: 'cors'})
    .then(response => {
        return response.json()
    })
    .then(newResponse => {
        img.src = newResponse.data.images.original.url
    })
    .catch(err => {
        console.log(err)
    })
};

form.addEventListener('submit', event => {
    event.preventDefault();
    console.log(searchBar.value);
    searchGIFS(searchBar.value);
});


