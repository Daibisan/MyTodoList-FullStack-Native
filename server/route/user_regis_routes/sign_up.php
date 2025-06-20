<?php
include('../../db/database.php');
include('../../utils/jsonResponse.php');

// Check request method
if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    
    // Get body request
    $json = file_get_contents('php://input');
    $body_request = json_decode($json, true);

    // Checking body request
    if ( $body_request && isset($body_request['username'], $body_request['email'], $body_request['password']) ) {

        // Get data values
        $username = filter_var($body_request['username'], FILTER_SANITIZE_SPECIAL_CHARS);
        $email = filter_var($body_request['email'], FILTER_SANITIZE_EMAIL);
        $password = filter_var($body_request['password'], FILTER_SANITIZE_SPECIAL_CHARS);
        $hashed_password = password_hash($password, PASSWORD_ARGON2ID);

        // Add account to DB
        addAccount($username, $email, $hashed_password, $conn);

    } else {
        jsonResponse(400, 'bad request', 'Failed : Invalid JSON body');
    }
    
} else {
    jsonResponse(405, 'method not allowed', 'Failed : Only POST method is allowed');
}

// =============================
// Function
// =============================
function addAccount($username, $email, $password, $conn) {

    try {
        $add_acc_sql = "INSERT INTO useraccounts (acc_username, acc_email, acc_password) VALUES ('$username', '$email', '$password')";
        $conn->query($add_acc_sql);

        $conn->close();

        jsonResponse(201, 'created', 'Signup Success!');
        
    } catch (mysqli_sql_exception $e) {
        $conn->close();
        jsonResponse(500, 'server error', 'Server Insert Failed', $e->getMessage());
    }

}
?>