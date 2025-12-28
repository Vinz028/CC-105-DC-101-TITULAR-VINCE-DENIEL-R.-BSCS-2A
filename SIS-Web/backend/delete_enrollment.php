<?php
include 'db_connect.php';

$enrollment_id = $_POST['enrollment_id'];

$stmt = $conn->prepare("DELETE FROM enrollments WHERE enrollment_id=?");
$stmt->bind_param("i", $enrollment_id);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "error";
}
?>
