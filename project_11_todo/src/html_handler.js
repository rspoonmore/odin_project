import {addCategory, delCategory, saveCategories} from "./data_handler.js"


function setupNewCatPop() {
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

function setupNewTaskForm(categoryObject, table, tbody) {
    let div = document.createElement('div');
    div.classList.add('new-task-form');
    div.style.display = 'none';

    let form = document.createElement('form');
    form.action = "";

    let titleFieldset = document.createElement('fieldset');
    let title = document.createElement('input');
    title.type = 'text';
    title.placeholder = 'Task Title';
    title.required = true;
    titleFieldset.appendChild(title);
    form.appendChild(titleFieldset);

    let descFieldset = document.createElement('fieldset');
    let desc = document.createElement('input');
    desc.type = 'text';
    desc.placeholder = 'Description';
    descFieldset.appendChild(desc);
    form.appendChild(descFieldset);

    let dueFieldset = document.createElement('fieldset');
    let dueLabel = document.createElement('label');
    dueLabel.for = 'form-due-date';
    dueLabel.textContent = 'Due Date';
    let dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.name = 'form-due-date';
    dueDateInput.required = true;
    dueFieldset.appendChild(dueLabel);
    dueFieldset.appendChild(dueDateInput);
    form.appendChild(dueFieldset);
    
    let priorityFieldset = document.createElement('fieldset');
    let priorityLabel = document.createElement('label');
    priorityLabel.for = 'form-priority';
    priorityLabel.textContent = 'Priority';
    let priorityInput = document.createElement('input');
    priorityInput.type = 'number';
    priorityInput.min = '1';
    priorityInput.max = '10';
    priorityInput.value = '1';
    priorityInput.name = 'form-priority';
    priorityInput.required = true;
    priorityFieldset.appendChild(priorityLabel);
    priorityFieldset.appendChild(priorityInput);
    form.appendChild(priorityFieldset);

    let submitTaskButton = document.createElement('button');
    submitTaskButton.classList.add('form-btn');
    submitTaskButton.type = 'submit';
    submitTaskButton.textContent = "Add";
    submitTaskButton.addEventListener('click', () => {
        categoryObject.addTask(false, title.value, desc.value, new Date(dueDateInput.value).toISOString(), priorityInput.value);
        saveCategories();
        table.removeChild(tbody);
        let newBody = document.createElement('tbody');
        table.appendChild(createCategoryTableContents(categoryObject, newBody));
        title.value = "";
        desc.value = "";
        priorityInput.value = "1";
        div.style.display = 'none';
    });
    form.appendChild(submitTaskButton);

    let cancelTaskButton = document.createElement('button');
    cancelTaskButton.classList.add('form-btn');
    cancelTaskButton.textContent = "Cancel";
    cancelTaskButton.addEventListener('click', () => {
        title.value = "";
        desc.value = "";
        priorityInput.value = "1";
        div.style.display = 'none';
    });
    form.appendChild(cancelTaskButton);

    div.appendChild(form);
    return div;
}

function addCategoryToHTML(categoryObject) {
    let container = document.querySelector('#container');
    let category = document.createElement('div');
    category.classList.add('category');

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let newTaskForm = setupNewTaskForm(categoryObject, table, tbody);

    let catTitle = document.createElement('div');
    catTitle.classList.add('cat-title');

    let catTitleDiv = document.createElement('div');
    catTitleDiv.textContent = categoryObject.title;
    catTitle.appendChild(catTitleDiv);

    let addTaskButton = document.createElement('button');
    addTaskButton.classList.add('add-task');
    addTaskButton.textContent = 'Add Task';
    addTaskButton.addEventListener('click', () => {
        newTaskForm.style.display = 'block';
    });
    catTitle.appendChild(addTaskButton);

    let delCatButton = document.createElement('button');
    delCatButton.classList.add('del-cat');
    delCatButton.textContent = 'Delete Category';
    delCatButton.addEventListener('click', () => {
        container.removeChild(category);
        delCategory(categoryObject);
        saveCategories();
    });
    catTitle.appendChild(delCatButton);
    category.appendChild(catTitle);

    category.appendChild(newTaskForm);


    let tr = document.createElement('tr');
    ['Done', 'Task', 'Due Date', 'Priority', ''].forEach(e => {
        let th = document.createElement('th');
        th.innerText = e;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    
    let currentTbody = createCategoryTableContents(categoryObject, tbody);

    table.appendChild(currentTbody);
    category.appendChild(table);
    container.appendChild(category);
}

function createTableRow(categoryObject, task, tbody) {
    let taskTR = document.createElement('tr');
    let checkTD = document.createElement('td');
    checkTD.classList.add('check');
    let taskTD = document.createElement('td');
    taskTD.classList.add('task');
    let dueTD = document.createElement('td');
    dueTD.classList.add('duedate');
    let priorityTD = document.createElement('td');
    priorityTD.classList.add('priority');
    let delTD = document.createElement('td');
    delTD.classList.add('delete');

    let check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = task.complete;
    check.addEventListener('change', () => {
        task.complete = check.checked;
        saveCategories();
    })
    checkTD.appendChild(check);
    taskTR.appendChild(checkTD);

    let titleDiv = document.createElement('div');
    titleDiv.innerText = task.title;
    let descDiv = document.createElement('div');
    descDiv.innerText = task.desc;
    taskTD.appendChild(titleDiv);
    taskTD.appendChild(descDiv);
    taskTR.appendChild(taskTD);

    dueTD.innerText = task.dueDateFormatted;
    taskTR.appendChild(dueTD);

    priorityTD.innerText = task.priority;
    taskTR.appendChild(priorityTD);

    let delButton = document.createElement('button');
    delButton.classList.add('delete-button');
    delButton.innerText = 'Delete';
    delButton.addEventListener('click', () => {
        categoryObject.delTask(task);
        tbody.removeChild(taskTR);
    });
    delTD.appendChild(delButton);
    taskTR.appendChild(delTD);
    tbody.appendChild(taskTR);
}

function createCategoryTableContents(categoryObject, tbody) {
    categoryObject.tasks.forEach(task => {createTableRow(categoryObject, task, tbody)})
    return tbody;
}

export {addCategoryToHTML, setupNewCatPop}