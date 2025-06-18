<?php
$db_server = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "mytodolistdb";
$db_port = 3306;
$conn = "";

try {
    $conn = mysqli_connect($db_server,$db_user,$db_pass,$db_name,$db_port);

} catch(mysqli_sql_exception) {
    jsonResponse(500, 'server error', 'Cant connect to Database');
}
?>