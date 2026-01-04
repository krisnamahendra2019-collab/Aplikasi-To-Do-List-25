<?php
include "../config/database.php";

// Mengambil data dari form
$title = $_POST['title'];
$desc  = $_POST['description'];
$date  = $_POST['due_date'];

// Query insert
$query = "INSERT INTO tasks (title, description, due_date)
          VALUES ('$title', '$desc', '$date')";

mysqli_query($conn, $query);

// Redirect ke halaman utama
header("Location: ../public/index.php");
?>
