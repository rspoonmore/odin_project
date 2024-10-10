function addCategoryToHTML(categoryObject) {
    let container = document.querySelector('#container');
    let category = document.createElement('div');
    category.classList.add('category');

    let catTitle = document.createElement('div');
    catTitle.classList.add('cat-title');

    let catTitleDiv = document.createElement('div');
    catTitleDiv.textContent = categoryObject.title;
    catTitle.appendChild(catTitleDiv);

    let addTaskButton = document.createElement('button');
    addTaskButton.classList.add('add-task');
    addTaskButton.textContent = 'Add Task';
    // addTaskButton.addEventListener('click', addTaskPressed(title));
    catTitle.appendChild(addTaskButton);

    category.appendChild(catTitle);

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    let tr = document.createElement('tr');
    ['Done', 'Task', 'Due Date', 'Priority', ''].forEach(e => {
        let th = document.createElement('th');
        th.innerText = e;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    categoryObject.tasks.forEach(task => {
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
    })
    table.appendChild(tbody);
    category.appendChild(table);
    container.appendChild(category);
}

function reloadHTML(categoryList) {
    let container = document.querySelector('#container');
    container.innerHTML = "";
    categoryList.forEach()
}

export {addCategoryToHTML}