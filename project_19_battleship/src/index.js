import "./style.css";
import { createPlayerBoard } from "./html_handler.js";


const x = 10;
const y = 10;
const ships = [2, 2, 3, 1];

const restartButton = document.querySelector('#reset');
restartButton.addEventListener('click', () => {createPlayerBoard(x, y, [...ships])});


console.log(createPlayerBoard(x, y, [...ships]));