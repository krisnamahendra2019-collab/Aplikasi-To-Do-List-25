<?php
include "../config/database.php";

// Mengambil data dari form edit
$id = $_POST['id'];
$title = $_POST['title'];
$description = $_POST['description'];

// Query update data todo
$query = "UPDATE todos 
          SET title='$title', description='$description' 
          WHERE id=$id";

// Eksekusi query
if (mysqli_query($conn, $query)) {
    header("Location: ../public/index.php");
} else {
    echo "Gagal mengubah data tugas";
}
?>
