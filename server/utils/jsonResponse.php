<?php
function jsonResponse($statusCode, $status, $message, $body = null) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    
    echo json_encode([
        'status' => $status,
        'message' => $message,
        'body' => $body
    ]);
    exit();
}
?>