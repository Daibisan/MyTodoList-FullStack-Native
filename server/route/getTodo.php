<?php
include('../db/database.php');
include('../utils/jsonResponse.php');

// Get session email
session_start();
$acc_email = $_SESSION['acc_email'];

// Check request method
if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    
    try {

        $get_data_sql = "SELECT * FROM todos WHERE acc_email = '$acc_email'"; 
        $result = $conn->query($get_data_sql);
    
        $todos_data = [];
        while ($row = $result->fetch_assoc()) {
            $todos_data[] = $row;
        }

        $conn->close();
        jsonResponse(200, 'ok', 'Todos Fetched!', $todos_data);
    
    } catch (mysqli_sql_exception $e) {
        $conn->close();
        jsonResponse(500, 'server error', 'Server Get data failed', $e->getMessage());
    }
    
} else {
    jsonResponse(405, 'method not allowed', 'Failed : Only GET method is allowed');
}
?>