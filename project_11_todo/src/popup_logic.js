import {addCategory, saveCategories} from "./data_handler.js"
import {addCategoryToHTML} from "./html_handler.js"

function setupPops() {
    let newCatText = document.querySelector('#new-cat-form input');
    let submitCatButton = document.querySelector('#submit-new-cat');
    let newCatForm = document.querySelector('#new-cat-form');
    submitCatButton.addEventListener('click', () => {
        let cat = addCategory(newCatText.value);
        addCategoryToHTML(cat);
        saveCategories();
        newCatForm.style.display = 'none';
    });

    let addCatButton = document.querySelector('#add-category');
    addCatButton.addEventListener('click', () => {
        newCatForm.style.display = 'block';
    });

    let cancelButton = document.querySelector('#cancel-new-cat');
    cancelButton.addEventListener('click', () => {
        newCatText.value = "";
        newCatForm.style.display = 'none';
    })
}

function addCategoryPressed() {
    let newCatForm = document.querySelector('#new-cat-form');
}

export {setupPops, addCategoryPressed}