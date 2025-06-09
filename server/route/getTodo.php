<?php
include('../db/database.php');

$get_data_sql = "SELECT * FROM todos";
if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    
    try {
        $result = $conn->query($get_data_sql);
    
        $todos_data = [];
        while ($row = $result->fetch_assoc()) {
            $todos_data[] = $row;
        }
    
        $conn->close();
    
        jsonResponse(200, 'ok', 'Todos Fetched!', $todos_data);
    
    } catch (mysqli_sql_exception) {
        $conn->close();
        jsonResponse(404, 'not found', 'Failed : Get Data Failed');
    }
    
} else {
    jsonResponse(405, 'method not allowed', 'Failed : Only GET method is allowed');
}
?>