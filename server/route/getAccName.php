<?php
include('../db/database.php');
include('../utils/jsonResponse.php');

session_start();

// Check request method
if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    
    // Get username from login session
    $acc_username = $_SESSION['acc_username'];
    jsonResponse(200, 'ok', 'Get Username Success', $acc_username);
    
    
} else {
    jsonResponse(405, 'method not allowed', 'Failed : Only GET method is allowed');
}
?>