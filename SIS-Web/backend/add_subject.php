<?php
include 'db_connect.php';

if(isset($_POST['subject_code'], $_POST['subject_name'], $_POST['units'])){
    $subject_code = $_POST['subject_code'];
    $subject_name = $_POST['subject_name'];
    $units = $_POST['units'];

    $stmt = $conn->prepare("INSERT INTO subjects (subject_code, subject_name, units) VALUES (?, ?, ?)");
    $stmt->bind_param("ssi", $subject_code, $subject_name, $units);

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
