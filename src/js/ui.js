import { htmlMaker, todos } from './data.js';
const main_container = document.getElementById('main-container');
const content_container = document.getElementById('content-container');

function showList() {

    // Manage main-container margin top
    if (!main_container.classList.contains('listActive'))
        main_container.classList.add('listActive');

    // Delay untuk mencegah penambahan body height
    setTimeout(() => {

        // Show todo list container
        if (content_container.classList.contains('hide'))
            content_container.classList.remove('hide');

    }, 150);

}

function hideList() {

    // Hide todo list container
    if (!content_container.classList.contains('hide'))
        content_container.classList.add('hide');

    // Manage main-container margin top
    if (main_container.classList.contains('listActive'))
        main_container.classList.remove('listActive');

}

function updateFeedbackAnimation(updatedTodoId) {

    const updatedTask = document.querySelector(`.task-container[data-id="${updatedTodoId}"]`);

    if (updatedTask) {
        updatedTask.classList.add('scale-animation');

        // Hapus class setelah animasi selesai biar bisa dipakai lagi nanti
        updatedTask.addEventListener('animationend', () => {
            updatedTask.classList.remove('scale-animation');
        }, { once: true });
    }

}

export function showEditPopup(todo_id) {

    // kirim id ke form data set
    const edit_form = document.getElementById('edit-form');
    edit_form.dataset.todoId = todo_id;

    const edit_popup = document.getElementById('edit-popup-container');
    if (edit_popup.classList.contains('hide')) {
        edit_popup.style.display = 'flex';

        // Delay 1 frame agar transition bisa jalan
        requestAnimationFrame(() => {
            edit_popup.classList.remove('hide');
            edit_popup.classList.add('show');
        });

        const todo_list_container = document.getElementById('todo-list-container');
        const checkboxes = Array.from(todo_list_container.querySelectorAll('.check-btn'));
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkbox.checked = false;
                hideClearBtn();
            }
        });
    }

}

export function hideEditPopup() {

    const edit_popup = document.getElementById('edit-popup-container');
    if (edit_popup.classList.contains('show')) {
        edit_popup.classList.remove('show');
        edit_popup.classList.add('hide');

        setTimeout(() => {
            edit_popup.style.display = 'none';
        }, 300);
    }
}

export function showFeedbackPopup(msg) {

    const feedback_message_popup = document.getElementById('feedback-message-popup');

    // Set Feedback Message
    const text_container = feedback_message_popup.querySelector('p');
    text_container.innerText = msg;

    // Show
    if (feedback_message_popup.classList.contains('hide')) {
        feedback_message_popup.classList.remove('hide');
        feedback_message_popup.classList.add('show');
    }

    // Hide after 3 seconds
    setTimeout(() => {
        if (feedback_message_popup.classList.contains('show')) {
            feedback_message_popup.classList.remove('show');
            feedback_message_popup.classList.add('hide');
        }
    }, 3000);

}

export function clearBtnAppearance() {

    const todo_list_container = document.getElementById('todo-list-container');
    const checkboxes = Array.from(todo_list_container.querySelectorAll('.check-btn'));
    const isAnyChecked = checkboxes.some(checkbox => checkbox.checked);

    if (isAnyChecked) {
        showClearBtn();

    } else {
        hideClearBtn();
    }

}

export function hideClearBtn() {
    // Hide clear btn
    if (!document.getElementById('clear-btn-container').classList.contains('hide'))
        document.getElementById('clear-btn-container').classList.add('hide');

    // Main container move animation
    main_container.classList.add('listActive');
    main_container.classList.remove('todoChecked');
}

function showClearBtn() {
    // Show clear btn
    if (document.getElementById('clear-btn-container').classList.contains('hide'))
        document.getElementById('clear-btn-container').classList.remove('hide');

    // Main container move animation
    main_container.classList.remove('listActive');
    main_container.classList.add('todoChecked');
}

export function darkMode() {
    document.documentElement.classList.toggle('dark-theme');

    const dark_mode_btn = document.getElementById('dark-mode-btn');

    if (document.documentElement.classList.contains('dark-theme')) {
        dark_mode_btn.innerHTML = "Light Mode";
        return;
    }
    dark_mode_btn.innerHTML = "Dark Mode";
}

export function renderTodos(updatedTodoId) {

    const container = document.getElementById('todo-list-container');
    container.innerHTML = '';

    // Append todo elements to container
    if (todos.length > 0) {
        todos.forEach(todo => {
            const todoElement = htmlMaker(todo);
            container.append(todoElement);
        });
        showList();

    } else {
        hideList();
    }

    // Todo Updated Feedback Animation
    if (updatedTodoId !== null) {
        updateFeedbackAnimation(updatedTodoId);
    }

}