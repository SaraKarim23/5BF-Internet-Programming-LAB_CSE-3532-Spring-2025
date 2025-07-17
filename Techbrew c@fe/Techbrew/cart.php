<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Cart Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(to right, rgb(115, 20, 222), rgb(225, 107, 16));
      color: #333;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }

    .cart-container {
      max-width: 800px;
      margin: 40px auto;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
      animation: fadeIn 1s ease-in-out;
    }

    h1 {
      text-align: center;
      color: #333;
      font-size: 2.5rem;
      margin-bottom: 20px;
      animation: slideInDown 1s ease-in-out;
    }

    .cart-items {
      margin-bottom: 20px;
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding: 15px;
      background: rgb(192, 74, 74);
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .cart-item:hover {
      transform: scale(1.02);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .cart-item .info {
      flex: 1;
      font-size: 1.1rem;
    }

    .cart-item .actions {
      text-align: right;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .quantity-controls button {
      padding: 5px 10px;
      background: rgb(11, 14, 16);
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.2s;
    }

    .quantity-controls button:hover {
      background: rgb(216, 140, 52);
      transform: scale(1.1);
    }

    .cart-total {
      text-align: right;
      font-size: 1.2rem;
      font-weight: bold;
      margin-top: 20px;
    }

    .checkout-button {
      display: block;
      margin: 20px auto;
      padding: 12px 30px;
      background-color: rgb(107, 64, 9);
      color: #fff;
      text-align: center;
      border-radius: 30px;
      text-decoration: none;
      font-size: 1.2rem;
      font-weight: bold;
      transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
      animation: slideInUp 1s ease-in-out;
    }

    .checkout-button:hover {
      background-color: #0056b3;
      transform: scale(1.05);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .payment-method {
      text-align: center;
      margin-top: 20px;
      font-size: 1.2rem;
      color: #28a745;
      font-weight: bold;
      opacity: 0;
      animation: fadeIn 1s forwards;
      animation-delay: 0.5s;
    }

    form#order-form {
      text-align: center;
      margin-top: 20px;
      display: none;
    }

    form#order-form input {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    form#order-form button {
      padding: 10px 20px;
      border-radius: 10px;
      background: #28a745;
      color: white;
      font-weight: bold;
      border: none;
      cursor: pointer;
      margin-top: 10px;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
</head>

<body>

<!-- Bootstrap + Font Awesome -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

<!-- Navbar -->
<nav class="navbar navbar-expand-lg bg-black navbar-dark">
  <div class="container">
    <a class="navbar-brand fs-3 fw-bold fst-italic" href="home.php">𝒯𝑒𝒸𝒽𝒷𝓇𝑒𝓌 𝒞@𝒻𝑒'</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mx-auto text-center">
        <li class="nav-item"><a class="nav-link" href="home.php">Home</a></li>
        <li class="nav-item"><a class="nav-link active" href="about.php">About</a></li>
        <li class="nav-item"><a class="nav-link" href="#membership">Membership</a></li>
        <li class="nav-item"><a class="nav-link" href="event.php">Events</a></li>
      </ul>
    </div>
  </div>
</nav>

<!-- Cart Section -->
<div class="cart-container">
  <h1>Your Cart</h1>
  <div class="cart-items" id="cart-items"></div>
  <div class="cart-total" id="cart-total"></div>

  <a href="#" class="checkout-button" onclick="showPaymentMethod(event)">Proceed to Payment</a>
  <div class="payment-method" id="payment-method"></div>

  <!-- Order Submission Form -->
  <form id="order-form" action="process_order.php" method="POST">
    <input type="email" name="customer_email" placeholder="Enter your email" required><br><br>
    <input type="hidden" name="cart_data" id="cart-data-field">
    <button type="submit">Confirm Order</button>
  </form>
</div>

<script>
  const urlParams = new URLSearchParams(window.location.search);
  const cartData = JSON.parse(decodeURIComponent(urlParams.get('data') || '[]'));

  function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';

    let total = 0;

    cartData.forEach((item, index) => {
      total += item.price * item.quantity;

      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <div class="info">
          <strong>${item.name}</strong><br>
          $${item.price.toFixed(2)}
        </div>
        <div class="actions">
          <div class="quantity-controls">
            <button onclick="decrementQuantity(${index})">-</button>
            <span>${item.quantity}</span>
            <button onclick="incrementQuantity(${index})">+</button>
          </div>
          <div>$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
    });

    cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;
  }

  function incrementQuantity(index) {
    cartData[index].quantity += 1;
    renderCart();
  }

  function decrementQuantity(index) {
    if (cartData[index].quantity > 1) {
      cartData[index].quantity -= 1;
    } else {
      cartData.splice(index, 1);
    }
    renderCart();
  }

  function showPaymentMethod(event) {
    event.preventDefault();

    document.getElementById('payment-method').textContent = 'Payment Method is Cash on Delivery';
    document.getElementById('order-form').style.display = 'block';
    document.getElementById('cart-data-field').value = JSON.stringify(cartData);
  }

  renderCart();
</script>

</body>
</html>
