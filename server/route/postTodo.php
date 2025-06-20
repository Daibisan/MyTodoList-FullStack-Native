<?php
include('../db/database.php');
include('../utils/jsonResponse.php');

// Get session email
session_start();
$acc_email = $_SESSION['acc_email'];

// Check request method
if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    
    // Get body request
    $json = file_get_contents('php://input');
    $body_request = json_decode($json, true);

    // Checking body request
    if ($body_request && isset($body_request['todo'], $body_request['due_date'])) {

        // Get data values
        $todo = filter_var($body_request['todo'], FILTER_SANITIZE_SPECIAL_CHARS);
        $due_date = $body_request['due_date'];

        // Insert data to DB
        insertTodo($todo, $due_date, $acc_email, $conn);

    } else {
        jsonResponse(400, 'bad request', 'Failed : Invalid JSON body');
    }
    
} else {
    jsonResponse(405, 'method not allowed', 'Failed : Only POST method is allowed');
}

// =============================
// Function
// =============================
function insertTodo($todo, $due_date, $acc_email, $conn) {
    try {
        $sql = "INSERT INTO todos (todo, due_date, acc_email) VALUES ('$todo', '$due_date', '$acc_email')";
        $conn->query($sql);

        $conn->close();

        jsonResponse(201, 'created', 'Todo saved successfully!');
        
    } catch (mysqli_sql_exception $e) {
        $conn->close();
        jsonResponse(500, 'server error', 'Server Insert todo failed', $e->getMessage());
    }
}
?>
