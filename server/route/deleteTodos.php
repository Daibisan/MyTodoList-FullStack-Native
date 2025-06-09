<?php
include('../db/database.php');

if ($_SERVER["REQUEST_METHOD"] == 'DELETE') {
    // Get body request
    $json = file_get_contents('php://input');
    $todoIds_data = json_decode($json, true);

    // Checking body request
    if ($todoIds_data && isset($todoIds_data["checkedTodoIds"])) {

        $checkedTodoIds = $todoIds_data["checkedTodoIds"];

        // Convert todoIds Array to "IN (a,b,...)" SQL string
        $todoIds = '(';
        foreach ($checkedTodoIds as $id) {
            $todoIds .= "{$id},";
        }
        $todoIds = rtrim($todoIds, ','); // buang koma terakhir
        $todoIds .= ')';

        // todoIds Array length
        $todo_counter = count($checkedTodoIds);
        
        deleteTodos($todoIds, $conn, $todo_counter);

    } else {
        jsonResponse(400, 'bad request', 'Failed : Invalid JSON body');
    }
} else {
    jsonResponse(405, 'method not allowed', 'Failed : Only DELETE method is allowed');
}

function deleteTodos($todoIds, $conn, $todo_counter)
{
    try {

        $sql = "DELETE FROM todos 
                WHERE id IN {$todoIds}";
        $conn->query($sql);
        $conn->close();

        $response_msg = $todo_counter == 1? 'Todo deleted successfully!' : 'Todos deleted successfully!';
        jsonResponse(200, 'ok', $response_msg);

    } catch (mysqli_sql_exception) {
        $conn->close();
        jsonResponse(500, 'server error', 'Failed : Delete Data Failed');
    }
}
