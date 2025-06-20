<?php
include('../../db/database.php');
include('../../utils/jsonResponse.php');

// Check request method
if ($_SERVER["REQUEST_METHOD"] == 'POST') {

    // Get body request
    $json = file_get_contents('php://input');
    $body_request = json_decode($json, true);

    // Checking body request
    if ($body_request && isset($body_request['email'])) {

        // Get email value
        $email = filter_var($body_request['email'], FILTER_SANITIZE_EMAIL);
        $safe_email = $conn->real_escape_string($email);

        // Check email from DB
        checkEmailExistence($safe_email, $conn);

    } else {
        jsonResponse(400, 'bad request', 'Failed : Invalid JSON body');
    }

} else {
    jsonResponse(405, 'method not allowed', 'Failed : Only POST method is allowed');
}

function checkEmailExistence($email, $conn) {

    try {
        $get_email_sql = "SELECT * FROM useraccounts WHERE acc_email = '$email'";

        $result = $conn->query($get_email_sql);

        if ($result->num_rows > 0) {
            jsonResponse(200, 'ok', 'Email is exist');
        } else {
            jsonResponse(200, 'not found', 'Email is not found');
        }
        $conn->close();

    } catch (mysqli_sql_exception $e) {
        $conn->close();
        jsonResponse(500, 'server error', 'Server Get Email Failed', $e->getMessage());
    }

}