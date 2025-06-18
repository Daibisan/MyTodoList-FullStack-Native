import { showFeedbackPopup, renderTodos, hideClearBtn } from "./ui.js";
import { setTodos } from "./data.js";

async function postTodo(data) {

    try {
        const response = await fetch('/myTodoList_PHP_MySql/server/route/postTodo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        showFeedbackPopup(result.message);
        readTodos();

    } catch (error) {
        console.error(error);
        alert('Failed : Add todo failed!');
    }

}

async function readTodos(updatedTodoId = null) {
    try {
        const response = await fetch('/myTodoList_PHP_MySql/server/route/getTodo.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response;
        const resultJson = await response.json();
        // Tampilkan pesan jika ada error
        if (result.status > 200) showFeedbackPopup(resultJson.message);

        setTodos(resultJson.body || []);

        renderTodos(updatedTodoId);

    } catch (error) {
        console.error(error);
        showFeedbackPopup('Failed : Read todos failed!');
    }
}

async function updateTodo(todo_id, todo, due_date) {

    const todoStringify = JSON.stringify({ todo_id, todo, due_date });
    try {
        const response = await fetch('/myTodoList_PHP_MySql/server/route/updateTodo.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: todoStringify
        });

        const result = await response.json();
        showFeedbackPopup(result.message);
        readTodos(todo_id);

    } catch (error) {
        console.error(error);
        showFeedbackPopup('Failed : Update todo failed');
    }

}

async function deleteTodos(checkedTodoIds) {

    try {
        const response = await fetch('/myTodoList_PHP_MySql/server/route/deleteTodos.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ checkedTodoIds })
        });

        const result = await response.json();
        showFeedbackPopup(result.message);

        hideClearBtn();
        await readTodos(); // Render UI first, run transition after
        

    } catch (error) {
        console.error(error);
        showFeedbackPopup('Failed : Delete todo failed');
    }

}

export { postTodo, readTodos, updateTodo, deleteTodos };