<?php
include('../db/database.php');

if ($_SERVER["REQUEST_METHOD"] == 'PUT') {
    
    // Get body request
    $json = file_get_contents('php://input');
    $todo_data = json_decode($json, true);

    // Checking body request
    if ($todo_data && isset($todo_data['todo_id'], $todo_data['todo'], $todo_data['due_date'])) {

        $todo_id = $todo_data['todo_id'];
        $todo = filter_var($todo_data['todo'], FILTER_SANITIZE_SPECIAL_CHARS);
        $due_date = $todo_data['due_date'];

        updateTodo($todo_id, $todo, $due_date, $conn);

    } else {
        jsonResponse(400, 'bad request', 'Failed : Invalid JSON body');
    }
    
} else {
    jsonResponse(405, 'method not allowed', 'Failed : Only PUT method is allowed');
}

// =============================
// Function
// =============================
function updateTodo($todo_id, $todo, $due_date, $conn) {
    try {
        $sql = "UPDATE todos 
                SET todo = \"{$todo}\",
                due_date = DATE(\"{$due_date}\")
                WHERE id = {$todo_id};";
        $conn->query($sql);

        $conn->close();

        jsonResponse(200, 'ok', 'Todo updated successfully!');
        
    } catch (mysqli_sql_exception) {
        $conn->close();
        jsonResponse(500, 'server error', 'Failed : Update data failed');
    }
}
?>
