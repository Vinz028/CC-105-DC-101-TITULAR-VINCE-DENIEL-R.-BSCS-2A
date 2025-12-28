<?php
include 'db_connect.php';

$enrollment_id = $_POST['enrollment_id'];
$grade = $_POST['grade'];

$check = $conn->prepare("SELECT grade FROM enrollments WHERE enrollment_id=?");
$check->bind_param("i", $enrollment_id);
$check->execute();
$result = $check->get_result();
$row = $result->fetch_assoc();

if ($row && !empty($row['grade'])) {
    echo "locked"; 
    exit;
}

// Update grade
$stmt = $conn->prepare("UPDATE enrollments SET grade=? WHERE enrollment_id=?");
$stmt->bind_param("si", $grade, $enrollment_id);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "error";
}
?>
