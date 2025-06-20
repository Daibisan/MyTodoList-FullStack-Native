<?php
include('../db/database.php');
include('../utils/jsonResponse.php');

// Check request method
if ($_SERVER["REQUEST_METHOD"] == 'DELETE') {

    // Get body request
    $json = file_get_contents('php://input');
    $body_request = json_decode($json, true);

    // Checking body request
    if ($body_request && isset($body_request["checkedTodoIds"])) {

        // Get data values
        $checkedTodoIds = $body_request["checkedTodoIds"];

        // Convert todoIds Array to "IN (a,b,...)" SQL string
        $todoIds = '(';
        foreach ($checkedTodoIds as $id) {
            $todoIds .= "{$id},";
        }
        $todoIds = rtrim($todoIds, ','); // buang koma terakhir
        $todoIds .= ')';

        // Count how many todos will be deleted
        $todo_counter = count($checkedTodoIds);
        
        // Delete DB data
        deleteTodos($todoIds, $conn, $todo_counter);

    } else {
        jsonResponse(400, 'bad request', 'Failed : Invalid JSON body');
    }

} else {
    jsonResponse(405, 'method not allowed', 'Failed : Only DELETE method is allowed');
}

function deleteTodos($todoIds, $conn, $todo_counter) {

    try {

        $sql = "DELETE FROM todos 
                WHERE todo_id IN {$todoIds}";
        $conn->query($sql);
        $conn->close();

        // Check how many todos deleted
        $response_msg = $todo_counter == 1? 'Todo deleted successfully!' : 'Todos deleted successfully!';

        jsonResponse(200, 'ok', $response_msg);

    } catch (mysqli_sql_exception $e) {
        $conn->close();
        jsonResponse(500, 'server error', 'Server Delete data failed', $e->getMessage());
    }

}
?>