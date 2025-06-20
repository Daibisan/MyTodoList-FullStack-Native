<?php
include('../../db/database.php');
include('../../utils/jsonResponse.php');

session_start();

// Check request method
if ($_SERVER["REQUEST_METHOD"] == 'POST') {

    // Destroy and unset session
    session_unset();
    session_destroy();
    jsonResponse(200, 'ok', 'Logout success!');
    
} else {
    jsonResponse(405, 'method not allowed', 'Failed : Only POST method is allowed');
}
?>