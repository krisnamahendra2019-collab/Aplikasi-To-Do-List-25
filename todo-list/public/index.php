<?php include "../config/database.php"; ?>

<!DOCTYPE html>
<html>
<head>
    <title>Todo List</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<h2>Aplikasi Todo List</h2>

<form action="../process/add.php" method="POST">
    <input type="text" name="title" placeholder="Judul tugas" required>
    <textarea name="description" placeholder="Deskripsi"></textarea>
    <input type="date" name="due_date" required>
    <button type="submit">Tambah</button>
</form>

<table>
<tr>
    <th>Judul</th>
    <th>Deskripsi</th>
    <th>Deadline</th>
    <th>Status</th>
    <th>Aksi</th>
</tr>

<?php
$result = mysqli_query($conn, "SELECT * FROM tasks");
while ($row = mysqli_fetch_assoc($result)) {
?>
<tr>
    <td><?= $row['title']; ?></td>
    <td><?= $row['description']; ?></td>
    <td><?= $row['due_date']; ?></td>
    <td><?= $row['status']; ?></td>
    <td>
        <a href="../process/delete.php?id=<?= $row['id']; ?>">Hapus</a>
    </td>
</tr>
<?php } ?>

</table>

<script src="js/script.js"></script>
</body>
</html>
