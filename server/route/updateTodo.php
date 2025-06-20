<?php
include('../db/database.php');
include('../utils/jsonResponse.php');

// Check request method
if ($_SERVER["REQUEST_METHOD"] == 'PUT') {
    
    // Get body request
    $json = file_get_contents('php://input');
    $body_request = json_decode($json, true);

    // Checking body request
    if ($body_request && isset($body_request['todo_id'], $body_request['todo'], $body_request['due_date'])) {

        // Get data values
        $todo_id = $body_request['todo_id'];
        $todo = filter_var($body_request['todo'], FILTER_SANITIZE_SPECIAL_CHARS);
        $due_date = $body_request['due_date'];

        // Update DB data
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
                WHERE todo_id = {$todo_id};";
        $conn->query($sql);

        $conn->close();

        jsonResponse(200, 'ok', 'Todo updated successfully!');
        
    } catch (mysqli_sql_exception $e) {
        $conn->close();
        jsonResponse(500, 'server error', 'Server Update todo failed', $e->getMessage());
    }
}
?>
