<?php
include 'db_connect.php';

if(isset($_GET['id'])){
    $student_id = $_GET['id'];
    $stmt = $conn->prepare("SELECT * FROM students WHERE student_id = ?");
    $stmt->bind_param("i", $student_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $student = $result->fetch_assoc();
    echo json_encode($student);
    $stmt->close();
} else {
    echo json_encode(["error" => "No ID provided"]);
}

$conn->close();
?>
