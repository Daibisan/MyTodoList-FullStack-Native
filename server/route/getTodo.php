<?php
include('../db/database.php');
include('../utils/jsonResponse.php');

// Get session email


// Check request method
if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    
    try {
        // SQL Execution
        $get_data_sql = `SELECT * FROM todos`; // Tambahkan session email
        $result = $conn->query($get_data_sql);
    
        $todos_data = [];
        while ($row = $result->fetch_assoc()) {
            $todos_data[] = $row;
        }
    
        // Check is there any data found
        if (count($todos_data) == 0) 
            jsonResponse(404, 'not found', 'Todos data not found');

        $conn->close();
        jsonResponse(200, 'ok', 'Todos Fetched!', $todos_data);
    
    } catch (mysqli_sql_exception $e) {
        $conn->close();
        jsonResponse(500, 'server error', 'Get data failed: ' . $e->getMessage());
    }
    
} else {
    jsonResponse(405, 'method not allowed', 'Failed : Only GET method is allowed');
}
?>