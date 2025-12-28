<?php
include 'db_connect.php';
$student_id = $_POST['student_id'];
$stmt = $conn->prepare("DELETE FROM students WHERE student_id = ?");
$stmt->bind_param("i", $student_id);
if ($stmt->execute()) echo "success"; else echo "error: ".$stmt->error;
$stmt->close(); $conn->close();
?>
