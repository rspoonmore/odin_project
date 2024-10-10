import {compareAsc, format} from "date-fns"

function create_category(title) {
    let tasks = [];

    function addTask(title, desc, dueDate, priority) {
        let newTask = createTask(title, desc, dueDate, priority);
        tasks.push(newTask);
        tasks.sort((a, b) => {compareAsc(a.dueDateFormatted, b.dueDateFormatted)})
    }

    function delTask(task) {
        let idx = tasks.indexOf(task);
        if (idx > -1) {
            tasks.splice(idx, 1);
        }
    }

    return {title, tasks, addTask, delTask};
}

function createTask(title, desc, dueDate, priority) {
    let complete = false;
    let dueDateFormatted = format(dueDate, 'yyyy-MM-dd');
    return {complete, title, desc, dueDateFormatted, priority};
}

export {create_category}