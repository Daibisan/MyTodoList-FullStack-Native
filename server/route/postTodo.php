<?php
include('../db/database.php');

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    
    // Get body request
    $json = file_get_contents('php://input');
    $todo_data = json_decode($json, true);

    // Checking body request
    if ($todo_data && isset($todo_data['todo'], $todo_data['due_date'])) {
        $todo = filter_var($todo_data['todo'], FILTER_SANITIZE_SPECIAL_CHARS);
        $due_date = $todo_data['due_date'];

        insertTodo($todo, $due_date, $conn);

    } else {
        jsonResponse(400, 'bad request', 'Failed : Invalid JSON body');
    }
    
} else {
    jsonResponse(405, 'method not allowed', 'Failed : Only POST method is allowed');
}

// =============================
// Function
// =============================
function insertTodo($todo, $due_date, $conn) {
    try {
        $sql = "INSERT INTO todos (todo, due_date) VALUES ('$todo', '$due_date')";
        $conn->query($sql);

        $conn->close();

        jsonResponse(201, 'created', 'Todo saved successfully!');
        
    } catch (mysqli_sql_exception) {
        $conn->close();
        jsonResponse(500, 'server error', 'Failed : Insert data failed');
    }
}
?>
