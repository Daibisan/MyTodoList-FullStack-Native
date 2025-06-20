import * as crud from "./crud.js";
import { hideEditPopup, darkMode } from "./ui.js";
import { createTodoJson } from "./data.js";
import { logout } from "./logout.js";

export default function domEventInit() {

    crud.readTodos();

    // Add todo submit Event
    const addForm = document.getElementById('add-form');
    addForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const todo_input = addForm.querySelector('.todo-input').value.trim();
        const date_input = addForm.querySelector('.date-input').value.trim();
        addForm.querySelector('.todo-input').value = '';
        addForm.querySelector('.date-input').value = '';

        const todo_data = createTodoJson(todo_input, date_input);
        crud.postTodo(todo_data);

    });

    // Edit todo submit Event
    const edit_form = document.getElementById('edit-form');
    edit_form.addEventListener('submit', (e) => {

        e.preventDefault();

        const todo_id = e.target.dataset.todoId;
        const todo_input = edit_form.querySelector('.todo-input').value.trim();
        const date_input = edit_form.querySelector('.date-input').value.trim();
        edit_form.querySelector('.todo-input').value = '';
        edit_form.querySelector('.date-input').value = '';

        crud.updateTodo(todo_id, todo_input, date_input);
        hideEditPopup();

    });

    // Cancel edit todo btn onclick Event
    const cancel_btn = document.getElementById('cancel-btn');
    cancel_btn.addEventListener('click', hideEditPopup);

    // Clear todo onclick Event
    document.getElementById('clear-btn').addEventListener('click', () => {

        const todo_list_container = document.getElementById('todo-list-container');
        const checkboxes = Array.from(todo_list_container.querySelectorAll('.check-btn'));
        const isAnyChecked = checkboxes.some(checkbox => checkbox.checked);

        if (isAnyChecked) {
            const checkedTodoIds = checkboxes
                .filter(checkbox => checkbox.checked) // filter checked todo elm
                .map(checkbox => checkbox.closest('li').dataset.id); // get checked todo elm todo_id
                
            crud.deleteTodos(checkedTodoIds);
        }

    });

    // Dark mode btn onclick Event
    const dark_mode_btn = document.getElementById('dark-mode-btn');
    dark_mode_btn.addEventListener('click', darkMode);

    // Logout btn onclick Event
    const logout_btn = document.getElementById('logout-btn');
    logout_btn.addEventListener('click', logout);
    
}