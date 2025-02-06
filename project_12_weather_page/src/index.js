import "./style.css";
import {createPage, readForm, resetForm}from "./html_handler";
import { returnSearchData, parseWeatherData } from "./api_handler";


const form = document.querySelector('form');

async function formSubmitted() {
    try {
        const searchField = await readForm();
        const searchJSON = await returnSearchData(searchField);
        const weatherData = parseWeatherData(searchJSON);
        console.log(weatherData);

        createPage(weatherData);
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