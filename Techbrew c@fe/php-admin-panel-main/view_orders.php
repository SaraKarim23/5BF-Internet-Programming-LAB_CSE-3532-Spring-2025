<?php
$conn = new mysqli("localhost", "root", "", "techbrew");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM orders ORDER BY order_time DESC");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel - Orders</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { padding: 10px; border: 1px solid #ccc; }
        th { background: #333; color: white; }
        button { padding: 5px 10px; margin: 2px; cursor: pointer; }
        .edit-btn { background-color: #ffc107; }
        .save-btn { background-color: #28a745; color: white; }
        .delete-btn { background-color: #dc3545; color: white; }
    </style>
</head>
<body>
    <h2>Customer Orders</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Email</th>
            <th>Order Time</th>
            <th>Actions</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()): ?>
        <tr id="row-<?= $row['id'] ?>">
            <td><?= $row['id'] ?></td>
            <td><?= htmlspecialchars($row['item_name']) ?></td>
            <td contenteditable="false" class="editable" data-field="quantity"><?= $row['quantity'] ?></td>
            <td contenteditable="false" class="editable" data-field="customer_email"><?= htmlspecialchars($row['customer_email']) ?></td>
            <td><?= $row['order_time'] ?></td>
            <td>
                <button class="edit-btn" onclick="enableEdit(<?= $row['id'] ?>)">Edit</button>
                <button class="save-btn" onclick="saveEdit(<?= $row['id'] ?>)">Save</button>
                <button class="delete-btn" onclick="deleteOrder(<?= $row['id'] ?>)">Delete</button>
            </td>
        </tr>
        <?php endwhile; ?>
    </table>

<script>
function enableEdit(id) {
    const row = document.querySelector(`#row-${id}`);
    row.querySelectorAll('.editable').forEach(cell => {
        cell.setAttribute('contenteditable', 'true');
        cell.style.backgroundColor = '#f9f9a9';
    });
}

function saveEdit(id) {
    const row = document.querySelector(`#row-${id}`);
    const quantity = row.querySelector('[data-field="quantity"]').innerText;
    const email = row.querySelector('[data-field="customer_email"]').innerText;

    fetch('update_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${id}&quantity=${encodeURIComponent(quantity)}&email=${encodeURIComponent(email)}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        row.querySelectorAll('.editable').forEach(cell => {
            cell.setAttribute('contenteditable', 'false');
            cell.style.backgroundColor = '';
        });
    });
}

function deleteOrder(id) {
    if (!confirm('Are you sure you want to delete this order?')) return;

    fetch('delete_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${id}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById(`row-${id}`).remove();
    });
}
</script>
</body>
</html>

<?php $conn->close(); ?>
