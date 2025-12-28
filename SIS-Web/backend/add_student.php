<?php
include 'db_connect.php';
$student_number = $_POST['student_number'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$gender = $_POST['gender'];
$birth_date = $_POST['birth_date'];
$email = $_POST['email'];

$stmt = $conn->prepare("INSERT INTO students (student_number, first_name, last_name, gender, birth_date, email) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $student_number, $first_name, $last_name, $gender, $birth_date, $email);
if ($stmt->execute()) {
  echo "success";
} else {
  echo "error: ".$stmt->error;
}
$stmt->close();
$conn->close();
?>
