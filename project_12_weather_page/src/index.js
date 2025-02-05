import "./style.css";
import {updateIMG, readForm, resetForm}from "./html_handler";
import { returnSearchData } from "./api_handler";


const form = document.querySelector('form');

async function formSubmitted() {
    try {
        const searchField = await readForm();
        const searchJSON = await returnSearchData();
        console.log(searchJSON['days']);
    }
    catch(err) {
        console.log(err);
    }
    resetForm();
}

form.addEventListener('submit', event => {
    event.preventDefault();
    formSubmitted();
})