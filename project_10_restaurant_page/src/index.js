import "./style.css";
import loadHomeContent from "./home_content.js";
import loadMenuContent from "./menu_content.js";
import loadAboutContent from "./about_content.js";
import clearContent from "./clear.js";

let homeButton = document.querySelector('#home');
homeButton.addEventListener('click', () => {
    clearContent();
    loadHomeContent();
});

let menuButton = document.querySelector('#menu');
menuButton.addEventListener('click', () => {
    clearContent();
    loadMenuContent();
});

let aboutButton = document.querySelector('#about');
aboutButton.addEventListener('click', () => {
    clearContent();
    loadAboutContent();
});

loadHomeContent();
