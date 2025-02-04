const img = document.querySelector('img');
const searchBar = document.querySelector('#searchBar')
const button = document.querySelector('button');
apiKey = 'P8cexa5XvLlupQQGytiyVt2TjslDepEM'

function searchGIFS(searchField) {
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${searchField}`;
    fetch(url, {mode: 'cors'})
    .then(response => {
        return response.json();
    })
    .then(response => {
        return response.data.images.original.url;
    })
    .catch(err => {
        console.log(err)
    })
}

button.addEventListener('click', () => {
    const gifURL = searchGIFS(searchBar.value);
    img.src = gifURL;
})



