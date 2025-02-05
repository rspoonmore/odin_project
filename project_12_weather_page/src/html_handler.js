const img = document.querySelector('img');
const searchBar = document.querySelector('#searchBar');

function updateIMG(srcURL) {
    img.src = srcURL;
}

function readForm() {
    return searchBar.value;
}

function resetForm() {
    searchBar.value = "";
}

export {updateIMG, readForm, resetForm}