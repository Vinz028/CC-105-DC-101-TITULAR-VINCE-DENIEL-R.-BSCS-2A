<?php
include 'db_connect.php';

if(isset($_POST['student_id'], $_POST['subject_id'], $_POST['grade'])){
    $student_id = $_POST['student_id'];
    $subject_id = $_POST['subject_id'];
    $grade = $_POST['grade'];

    $stmt = $conn->prepare("INSERT INTO enrollments (student_id, subject_id, grade) VALUES (?, ?, ?)");
    $stmt->bind_param("iid", $student_id, $subject_id, $grade);

    if($stmt->execute()){
        echo "success";
    } else {
        echo "error: " . $stmt->error;
    }
    $stmt->close();
} else {
    echo "Missing data";
}

$conn->close();
?>
