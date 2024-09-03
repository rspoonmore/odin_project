let myLibrary = [];
const table = document.querySelector('table');
const tbody = document.querySelector('tbody');
const form = document.querySelector('form');

const snakeCase = string => {
    return string.replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');
};

function Book(title, author) {
  this.title = title;
  this.author = author;
  this.read = false;
  this.row_id = snakeCase(title);

  this.createGridRow = function() {
    const newBookRow = document.createElement('tr');
    newBookRow.id = this.row_id;
    const rowTitle = document.createElement('td');
    const rowAuthor = document.createElement('td');
    const rowRead = document.createElement('td');
    const buttonCell = document.createElement('td');
    buttonCell.classList.add('button-cell');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        deleteBook(this.title);
        reloadGrid();
    });

    const readButton = document.createElement('button');
    readButton.classList.add('read-button');
    readButton.addEventListener('click', () => {
        this.read = !this.read;
        reloadGrid();
    })

    rowTitle.innerText = this.title; 
    rowAuthor.innerText = this.author; 
    rowRead.innerText = this.read; 
    deleteButton.innerText = "Delete";
    readButton.innerText = "Toggle Read Status";

    buttonCell.appendChild(deleteButton);
    buttonCell.appendChild(readButton);

    newBookRow.appendChild(rowTitle);
    newBookRow.appendChild(rowAuthor);
    newBookRow.appendChild(rowRead);
    newBookRow.appendChild(buttonCell);

    return newBookRow;
  }
};

function addBookToLibrary(title, author) {
    const book = new Book(title, author);
    myLibrary.push(book);
    tbody.appendChild(book.createGridRow());
};

function deleteBook(bookTitle) {
    myLibrary = myLibrary.filter((book) => {return book.title != bookTitle})
};

function acceptForm() {
    const form_title = document.querySelector('#book-title');
    const form_author = document.querySelector('#book-author');

    let newTitle = form_title.value;
    form_title.value = "";

    let newAuthor = form_author.value;
    form_author.value = "";

    addBookToLibrary(newTitle, newAuthor);
};

function readPressed() {
    console.log(this.parentNode.parentNode);
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    acceptForm();
});


function reloadGrid() {
    tbody.innerText = "";
    myLibrary.forEach((e) => {tbody.appendChild(e.createGridRow())})
}


addBookToLibrary('Test Book', 'me');