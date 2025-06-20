<?php
include('../../db/database.php');
include('../../utils/jsonResponse.php');

// Check request method
if ($_SERVER["REQUEST_METHOD"] == 'POST') {

    // Get body request
    $json = file_get_contents('php://input');
    $body_request = json_decode($json, true);

    // Checking body request
    if ($body_request && isset($body_request['email'], $body_request['password'])) {

        // Get data values
        $email = filter_var($body_request['email'], FILTER_SANITIZE_EMAIL);
        $password = filter_var($body_request['password'], FILTER_SANITIZE_SPECIAL_CHARS);

        // Login Account
        loginAccount($email, $password, $conn);
    } else {
        jsonResponse(400, 'bad request', 'Failed : Invalid JSON body');
    }
} else {
    jsonResponse(405, 'method not allowed', 'Failed : Only POST method is allowed');
}

// =============================
// Function
// =============================
function loginAccount($email, $password, $conn)
{

    try {
        $get_email_sql = "SELECT * FROM useraccounts WHERE acc_email = '$email'";

        $result = $conn->query($get_email_sql);
        $row = $result->fetch_assoc();

        // Get acc_data from DB
        $acc_username = $row["acc_username"];
        $acc_password = $row["acc_password"];

        // Check Password
        if (password_verify($password, $acc_password)) {

            // Start session and reset session id
            session_start();
            session_regenerate_id(true);

            // Set session variable
            $_SESSION["acc_username"] = $acc_username;
            $_SESSION["acc_email"] = $email;
            $_SESSION["is_login"] = true;

            jsonResponse(200, 'ok', 'Login Success!');
            
        } else {
            jsonResponse(401, 'unauthorized', 'Login Failed');
        }
        $conn->close();
    } catch (mysqli_sql_exception $e) {
        $conn->close();
        jsonResponse(500, 'server error', 'Server Login failed', $e->getMessage());
    }
}

?>