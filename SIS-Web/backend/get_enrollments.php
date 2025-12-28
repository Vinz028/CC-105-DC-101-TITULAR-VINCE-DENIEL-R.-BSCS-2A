<?php
include 'db_connect.php';

$sql = "SELECT e.enrollment_id, s.student_number, s.first_name, s.last_name, sub.subject_code, sub.subject_name, e.grade 
        FROM enrollments e
        JOIN students s ON e.student_id = s.student_id
        JOIN subjects sub ON e.subject_id = sub.subject_id";

$result = $conn->query($sql);
$enrollments = [];

while($row = $result->fetch_assoc()){
    $enrollments[] = $row;
}

header('Content-Type: application/json');
echo json_encode($enrollments);
$conn->close();
?>
