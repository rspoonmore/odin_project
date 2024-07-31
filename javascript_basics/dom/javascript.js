const container = document.querySelector('#container');

const redParagraph = document.createElement('p');
const hThree = document.createElement('h3');
const newDiv = document.createElement('div');
const subH1 = document.createElement('h1');
const subP = document.createElement('p');

redParagraph.style.color = 'red';
redParagraph.textContent = "Hey I'm red!";

hThree.style.color = 'blue';
hThree.textContent = "I'm a blue h3!";

newDiv.style.cssText = "border: 1px solid black; background: pink;";
subH1.textContent = "I'm in a div";
subP.textContent = "ME TOO!";

newDiv.appendChild(subH1);
newDiv.appendChild(subP);

container.appendChild(redParagraph);
container.appendChild(hThree);
container.appendChild(newDiv);

const button = document.querySelector('button');
function toggleClass() {
    this.classList.toggle('clicked')
};
button.addEventListener('click', toggleClass);