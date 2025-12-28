<?php
include 'db_connect.php';
$sql = "SELECT * FROM students";
$result = $conn->query($sql);
$students = [];
while ($row = $result->fetch_assoc()) {
  $students[] = $row;
}
header('Content-Type: application/json');
echo json_encode($students);
$conn->close();
?>
