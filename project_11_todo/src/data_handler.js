import {compareAsc, format} from "date-fns"
import {addCategoryToHTML} from "./html_handler.js"

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
        );
    };
};

function loadCategories() {
    let newCategories = [];
    if (!('jsonCategories' in window.sessionStorage)) {
        return newCategories;
    }
    let jsonCategories = JSON.parse(window.sessionStorage['jsonCategories'] || "[]");
    jsonCategories.forEach((json) => {
        let newCategory = addCategory(json['title']);
        let newTasks = json['tasks'];
        if (newTasks.length > 0) {
            newTasks.forEach((task) => {
                newCategory.addTask(task['complete'], task['title'], task['desc'], task['dueDate'], task['priority'])
            })
        }
        newCategories.push(newCategory);
        addCategoryToHTML(newCategory);
    })
    return newCategories;
}

function saveCategories() {
    if (categories.length == 0) {
        return null;
    }
    if (!storageAvailable("sessionStorage")) {
        alert('Session Storage not available!');
        return null;
    }
    let jsonCategories = [];
    categories.forEach((cat) => {
        jsonCategories.push({'title': cat.title, 'tasks': cat.tasks});
    });
    window.sessionStorage['jsonCategories'] = JSON.stringify(jsonCategories);
}

function delCategory(category) {
    let idx = categories.indexOf(category);
    if (idx > -1) {
        categories.splice(idx, 1);
    }
    saveCategories();
}

function addCategory(title) {
    let tasks = [];

    function addTask(complete, title, desc, dueDate, priority) {
        let dueDateFormatted = dueDate.slice(0, 10);
        let newTask =  {complete, title, desc, dueDate, dueDateFormatted, priority};
        tasks.push(newTask);
        // tasks.sort((a, b) => {compareAsc(a.dueDateFormatted, b.dueDateFormatted)});
        tasks.sort((a, b) => {
            a.priority - b.priority || a.dueDateFormatted.localeCompare(b.dueDateFormatted) 
        });
    }

    function delTask(task) {
        let idx = tasks.indexOf(task);
        if (idx > -1) {
            tasks.splice(idx, 1);
        }
    }

    let newCategory = {title, tasks, addTask, delTask};
    categories.push(newCategory);
    return newCategory;
}

let categories = [];

function loadData() {
    if (storageAvailable("sessionStorage")) {
        console.log('Session Storage Available');
        categories = loadCategories();
    } else {
        alert('There is no session storage here');
    };
}

export {loadData, loadCategories, saveCategories, delCategory, addCategory}


