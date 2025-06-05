import { showEditPopup, clearBtnAppearance } from "./ui.js";

let todos = [];

function setTodos(newTodos) {
    todos = newTodos;
}

function createTodoJson(todo, due_date) {
    return { todo, due_date };
}

function htmlMaker(user_todo) {
    const { id: todo_id, todo: task, due_date } = user_todo;

    const text_container_h2 = document.createElement('h2');
    const text_container_p = document.createElement('p');
    text_container_h2.textContent = task;
    text_container_p.textContent = `Due: ${due_date}`;

    const text_container = document.createElement('div');
    text_container.classList.add('text-container');
    text_container.append(text_container_h2, text_container_p);

    const edit_button = document.createElement('button');
    edit_button.classList.add('edit-btn');
    edit_button.textContent = '✏️';
    edit_button.addEventListener('click', () => showEditPopup(todo_id));

    const check_input = document.createElement('input');
    check_input.classList.add('check-btn');
    check_input.type = 'checkbox';
    check_input.setAttribute('name', `checkbox-${todo_id}`);
    check_input.addEventListener('change', clearBtnAppearance);

    const btn_container = document.createElement('div');
    btn_container.classList.add('btn-container');
    btn_container.append(edit_button, check_input);

    const task_container = document.createElement('li');
    task_container.classList.add('task-container');
    task_container.setAttribute('data-id', todo_id);
    task_container.append(text_container, btn_container);

    return task_container;
}

export { createTodoJson, htmlMaker, todos, setTodos };