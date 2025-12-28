<?php
include 'db_connect.php';

if(isset($_POST['subject_id'])){
    $subject_id = $_POST['subject_id'];

    $stmt = $conn->prepare("DELETE FROM subjects WHERE subject_id=?");
    $stmt->bind_param("i", $subject_id);

    if($stmt->execute()){
        echo "success";
    } else {
        echo "error: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Missing subject_id";
}

$conn->close();
?>
