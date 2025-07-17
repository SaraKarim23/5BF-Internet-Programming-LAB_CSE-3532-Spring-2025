<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Menu Page</title>
  <style>
    body {
    margin: 0;
    padding: 0;
    background: url('menu/background.jpg') no-repeat center center fixed; /* Update to correct path */
    background-size: cover;
    color: #ffffff;
    font-family: Arial, sans-serif;
}

.menu-page {
    background: rgba(0, 0, 0, 0.8); /* Dark overlay for readability */
    padding: 40px 20px; /* More padding for better spacing */
    border-radius: 10px; /* Rounded edges for the page container */
    margin: 20px auto;
    max-width: 1200px; /* Restrict width for better responsiveness */
}

.menu-title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 30px;
    color: #ff9900;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add shadow for better text visibility */
}

.category {
    margin-bottom: 50px;
}

.category-title {
    font-size: 28px;
    text-align: center;
    margin-bottom: 30px;
    text-transform: uppercase;
    color: #ffcc66;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.product-grid {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap; /* Ensure products wrap on smaller screens */
}

.product {
    background: #333333;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    width: 200px; /* Fixed width for uniform cards */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.3);
}

.product-name {
    font-size: 18px;
    margin-bottom: 10px;
    color: #ffffff;
}

.product img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 15px;
}

.add-to-cart {
    background-color: #ff9900;
    color: #ffffff;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.add-to-cart:hover {
    background-color: #e68a00;
    transform: scale(1.1);
}

.add-to-cart:active {
    background-color: #cc7a00;
    transform: scale(1);
}

.navbar {
    background-color: #000000;
    padding: 10px 20px;
    font-family: Arial, sans-serif;
}

.navbar-brand {
    font-family: 'Cursive', sans-serif;
    font-size: 24px;
    font-style: italic;
    color: #ff9900;
}

.nav-link {
    font-size: 16px;
    color: #ffffff;
    margin: 0 10px;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: #ffcc66;
}

.navbar-toggler {
    border: none;
}

.navbar-toggler-icon {
    background-color: #fff;
}

.btn-outline-light {
    border-color: #ffffff;
    color: #ffffff;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-outline-light:hover {
    background-color: #ffffff;
    color: #000000;
}

section {
    padding: 0 10%; /* Adjusted for consistency with responsive design */
}

@media (max-width: 768px) {
    .menu-page {
        padding: 20px;
    }

    .menu-title {
        font-size: 28px;
    }

    .category-title {
        font-size: 24px;
    }

    .product {
        width: 100%; /* Products take full width on smaller screens */
        max-width: 300px;
    }

    .product img {
        width: 100%;
        height: auto; /* Adjust images for smaller viewports */
    }
}

/* Styling for Shopping Cart Icon and Cart Container */
.shopping-cart {
    position: fixed; /* Keep cart fixed in the top-right corner */
    top: 20px;
    right: 20px;
    background-color: #333333;
    padding: 15px;
    border-radius: 10px;
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    z-index: 10;
}

.shopping-cart button {
    background-color: transparent;
    border: none;
    color: #ffffff;
    font-size: 24px;
    cursor: pointer;
    position: relative;
}

.shopping-cart button:hover {
    color: #ff9900;
}

.cart-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #ff9900;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cart-container {
    position: absolute;
    top: 40px;
    right: 0;
    background-color: #444;
    padding: 15px;
    border-radius: 10px;
    width: 250px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    max-height: 400px;
    overflow-y: auto;
    display: none;
}

.cart-container.active {
    display: block;
}

.cart-item {
    background-color: #555;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
}

.cart-item .product-name {
    font-size: 16px;
    color: #ffffff;
}

.cart-item .quantity-controls {
    display: flex;
    gap: 5px;
}

.cart-item button {
    background-color: #ff9900;
    color: #ffffff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.cart-item button:hover {
    background-color: #e68a00;
}

.cart-item button.remove {
    background-color: #ff3333;
}

.cart-item button.remove:hover {
    background-color: #e62e2e;
}

.cart-total {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #ffcc66;
}

.cart-item button.increment,
.cart-item button.decrement {
    background-color: #28a745;
    font-size: 14px;
}

.cart-item button.increment:hover,
.cart-item button.decrement:hover {
    background-color: #218838;
}

.cart-item button.increment:active,
.cart-item button.decrement:active {
    background-color: #1e7e34;
}

  </style>
  
  <!-- Include Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- Font Awesome for the cart icon -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  
  <!-- Custom CSS -->
  <link rel="stylesheet" href="menu.css">
</head>
<body>

  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg bg-black navbar-dark">
    <div class="container">
      <a class="navbar-brand fs-3 fw-bold fst-italic" href="home.php">𝒯𝑒𝒸𝒽𝒷𝓇𝑒𝓌 𝒞@𝒻𝑒'</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto text-center">
          <li class="nav-item"><a class="nav-link" href="home.php">Home</a></li>
          <li class="nav-item"><a class="nav-link active" href="about.html">About</a></li>
          
          
          <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
        </ul>
        <div class="d-flex align-items-center">
          <!-- Shopping Cart Section -->
          <button class="btn btn-outline-light me-2">Search</button>
          <div class="shopping-cart">
            <!-- Shopping Cart Icon -->
            <button class="btn btn-outline-light position-relative">
              <i class="fas fa-shopping-cart"></i>
              <span class="cart-badge" id="cart-count">0</span>
            </button>
            <div id="cart-container">
              <!-- Cart items will be displayed here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Menu Content -->
  <div class="menu-page">
    <h1 class="menu-title">Tech Brew Menu</h1>

    <!-- Coffee and Drinks Section -->
    <section class="category">
      <h2 class="category-title">Coffee and Drinks</h2>
      <div class="product-grid">
        <div class="product">
          <p class="product-name">Cappuccino</p>
          <img src="menu/cappacino.jpg" alt="Cappuccino" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Cappuccino', 4.50)">Add to Cart - $4.50</button>
        </div>
        <div class="product">
          <p class="product-name">Latte</p>
          <img src="menu/latte.jpg" alt="Latte" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Latte', 5.00)">Add to Cart - $5.00</button>
        </div>
        <div class="product">
          <p class="product-name">Espresso</p>
          <img src="menu/expresso.jpg" alt="Espresso" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Espresso', 3.00)">Add to Cart - $3.00</button>
        </div>
        <div class="product">
          <p class="product-name">Cold Brew</p>
          <img src="menu/coldbrew.jpg" alt="Cold Brew" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Cold Brew', 4.00)">Add to Cart - $4.00</button>
        </div>
        <div class="product">
          <p class="product-name">Mocha</p>
          <img src="menu/mocha.jpg" alt="Mocha" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Mocha', 5.50)">Add to Cart - $5.50</button>
        </div>
      </div>
    </section>

    <!-- Beans and Sweets Section -->
    <section class="category">
      <h2 class="category-title">Beans and Sweets</h2>
      <div class="product-grid">
        <div class="product">
          <p class="product-name">Arabica Beans - $12.00</p>
          <img src="image/arabica beans.jpeg" alt="Arabica Beans" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Arabica Beans', 12.00)">Add to Cart - $12.00</button>
        </div>
        <div class="product">
          <p class="product-name">Robusta Beans - $10.00</p>
          <img src="image/robusta beans.jpeg" alt="Robusta Beans" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Robusta Beans', 10.00)">Add to Cart - $10.00</button>
        </div>
        <div class="product">
          <p class="product-name">Chocolate Bar - $2.50</p>
          <img src="./image/chocolate bar.jpeg" alt="Chocolate Bar" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Chocolate Bar', 2.50)">Add to Cart - $2.50</button>
        </div>
        <div class="product">
          <p class="product-name">Vanilla Cookies - $3.00</p>
          <img src="./image/vanilla cookies.jpg" alt="Vanilla Cookies" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Vanilla Cookies', 3.00)">Add to Cart - $3.00</button>
        </div>
        <div class="product">
          <p class="product-name">Caramel Squares - $3.50</p>
          <img src="./image/caramel squares.jpg" alt="Caramel Squares" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Caramel Squares', 3.50)">Add to Cart - $3.50</button>
        </div>
      </div>
    </section>

    <!-- Croissant and Cake Section -->
    <section class="category">
      <h2 class="category-title">Croissant and Cake</h2>
      <div class="product-grid">
        <div class="product">
          <p class="product-name">Butter Croissant - $3.00</p>
          <img src="./image/butter crossoint.jpg" alt="Butter Croissant" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Butter Croissant', 3.00)">Add to Cart - $3.00</button>
        </div>
        <div class="product">
          <p class="product-name">Chocolate Croissant - $3.50</p>
          <img src="./image/chocolate crossoint.jpg" alt="Chocolate Croissant" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Chocolate Croissant', 3.50)">Add to Cart - $3.50</button>
        </div>
        <div class="product">
          <p class="product-name">Cheesecake - $6.00</p>
          <img src="./image/cheesecake.jpg" alt="Cheesecake" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Cheesecake', 6.00)">Add to Cart - $6.00</button>
        </div>
        <div class="product">
          <p class="product-name">Fruit Tart - $5.50</p>
          <img src="./image/fruit tart.jpg" alt="Fruit Tart" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Fruit Tart', 5.50)">Add to Cart - $5.50</button>
        </div>
        <div class="product">
          <p class="product-name">Red Velvet Cake - $6.50</p>
          <img src="./image/red velvet cake.jpg" alt="Red Velvet Cake" class="product-image">
          <button class="add-to-cart" onclick="addToCart('Red Velvet Cake', 6.50)">Add to Cart - $6.50</button>
        </div>
      </div>
    </section>
  </div>

  <!-- Include Bootstrap JS and dependencies -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

  <!-- Custom JavaScript -->
  <script src="menu.js"></script>
  <script>
    // Array to store cart items
    let cart = [];
  
    // Function to add an item to the cart
    function addToCart(productName, price) {
      const itemIndex = cart.findIndex(item => item.name === productName);
  
      if (itemIndex > -1) {
        // If the item already exists in the cart, increment its quantity
        cart[itemIndex].quantity += 1;
      } else {
        // Otherwise, add a new item to the cart
        cart.push({ name: productName, price: price, quantity: 1 });
      }
  
      // Update cart count badge
      updateCartCount();
      alert(`${productName} added to the cart!`);
    }
  
    // Function to update the cart count
    function updateCartCount() {
      const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
      document.getElementById('cart-count').textContent = cartCount;
    }
  
    // Function to navigate to the cart page
    function goToCartPage() {
      const cartData = encodeURIComponent(JSON.stringify(cart));
      window.location.href = `cart.php?data=${cartData}`;
    }
  
    // Attach click event to the cart button
    document.querySelector('.shopping-cart button').addEventListener('click', goToCartPage);
  </script>
  
</body>
</html> 