import "./style.css";
import {create_category} from "./categories.js"
import {addCategoryToHTML} from "./html_editor.js"

let testButton = document.createElement('button');
testButton.innerText = 'Add Test';
testButton.addEventListener('click', () => {
    let cat = create_category('Tomorrow');
    cat.addTask('Wrap Presents', 'Wrap the birthday presents for Carson.', Date(2024, 10, 15), '1');
    console.log(cat);
    addCategoryToHTML(cat);
});


document.querySelector('body').appendChild(testButton);

