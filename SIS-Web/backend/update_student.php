<?php
include 'db_connect.php'; 

if(isset($_POST['student_id'], $_POST['student_number'], $_POST['first_name'], $_POST['last_name'], $_POST['gender'], $_POST['birth_date'], $_POST['email'])) {

    $student_id = $_POST['student_id'];
    $student_number = $_POST['student_number'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $gender = $_POST['gender'];
    $birth_date = $_POST['birth_date'];
    $email = $_POST['email'];

    $stmt = $conn->prepare("UPDATE students SET student_number=?, first_name=?, last_name=?, gender=?, birth_date=?, email=? WHERE student_id=?");
    $stmt->bind_param("ssssssi", $student_number, $first_name, $last_name, $gender, $birth_date, $email, $student_id);

    if($stmt->execute()){
        echo "success";
    } else {
        echo "error: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Error: Missing data";
}

$conn->close();
?>
