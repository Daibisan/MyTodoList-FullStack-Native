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

        if (result.status === 'server error')
            console.error('Server error: '+result.body);
        
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

        const result = await response.json();
        
        // Error Message
        if (result.status !== 'ok') 
            showFeedbackPopup(result.message);
        if (result.status === 'server error')
            console.error('Server error: '+result.body);

        // Show username in console
        const userAccountName = await getAccUsername();
        console.log('Account Name: ' + userAccountName);
        
        // Set todos array and render todos
        setTodos(result.body || []);
        renderTodos(updatedTodoId);

    } catch (error) {
        console.error(error);
        showFeedbackPopup('Failed : Read todos failed!');
    }
}

async function getAccUsername() {
    
    try {
        const response = await fetch('/myTodoList_PHP_MySql/server/route/getAccName.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (result.message === 'Get Username Success')
            return result.body;

    } catch (error) {
        console.error(error);
        showFeedbackPopup('Failed : Get Account Name failed!');
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

        // Error Message
        if (result.status === 'server error')
            console.error('Server error: '+result.body);

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

        // Error Message
        if (result.status === 'server error')
            console.error('Server error: '+result.body);

        showFeedbackPopup(result.message);
        hideClearBtn();
        await readTodos(); // Render UI first, run transition after

    } catch (error) {
        console.error(error);
        showFeedbackPopup('Failed : Delete todo failed');
    }

}

export { postTodo, readTodos, updateTodo, deleteTodos };