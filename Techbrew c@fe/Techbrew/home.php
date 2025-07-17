
<?php
// Start session to check login status
session_start();
include 'db.php';

// Check if user is logged in
$isLoggedIn = isset($_SESSION['email']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechBrew Cafe</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Bootstrap Icons -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
  <!-- Custom CSS -->
  <link href="home.css" rel="stylesheet">
  <style>
    /* Additional styles for Contact Section */
    .contact-section {
      background-color: #f8f9fa;
      padding: 50px 0;
    }

    .contact-description {
      display: flex;
      align-items: flex-start;
      gap: 20px;
    }

    .coffee-icon {
      font-size: 50px;
      color: #8B4513;
    }

    .contact-form input,
    .contact-form textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .contact-form button {
      background-color: #8B4513;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
    }

    .contact-form button:hover {
      background-color: #5A3210;
    }

    /* Styles for new sections */
    .bg-service {
      display: flex;
      justify-content: space-between;
      margin: 50px 0;
    }

    .service-one {
      position: relative;
      width: 30%;
    }

    .service-one img {
      width: 100%;
      border-radius: 10px;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .service-one:hover .overlay {
      opacity: 1;
    }

    .over-txt p {
      font-size: 18px;
    }

    .over-txt h4 {
      font-size: 24px;
      font-weight: bold;
    }

    .bg-shop {
      background-color: #f8f9fa;
      padding: 50px 0;
    }

    .shop-links {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .shop-links .links li {
      display: inline-block;
      margin: 0 10px;
      cursor: pointer;
    }

    .shop-flex {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }

    .shop1 {
      width: 23%;
      background-color: white;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      text-align: center;
    }

    .shop1 img {
      width: 100%;
    }

    .price {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      padding: 5px 10px;
      font-size: 14px;
      border-radius: 5px;
    }

    .social a {
      margin: 0 5px;
    }

    .stars i {
      color: gold;
    }

    .stars i.far {
      color: gray;
    }
  </style>
</head>
<body>

  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg bg-black navbar-dark">
    <div class="container">
      <a class="navbar-brand fs-3 fw-bold fst-italic" href="#">𝒯𝑒𝒸𝒽𝒷𝓇𝑒𝓌 𝒞@𝒻𝑒'</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto text-center">
          <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
          
          <li class="nav-item"><a class="nav-link" href="event.php">Events</a></li>
          <li class="nav-item"><a class="nav-link" href="contact.php">Contact</a></li>
          <li class="nav-item"><a class="nav-link" href="gallery.html">Gallery</a></li>
        </ul>
          <!-- Search, Sign In, and Cart -->
      <div class="d-flex align-items-center mt-3 mt-lg-0">
        
        <?php if ($isLoggedIn): ?>
          <a href="logout.php" class="btn btn-outline-light ms-2">Logout</a>
        <?php else: ?>
          <a href="login.php" class="btn btn-outline-light ms-2">Sign In</a>
        <?php endif; ?>

        <a href="cart.php" class="btn btn-outline-light me-2" aria-label="Cart">
                <i class="bi bi-cart"></i>
              </a>
         

      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="hero">
    <video src="v7.mp4" autoplay muted loop></video>
    <div class="hero-text">
      <h5>Just Brew It at the C@fe!</h5>
      <h1>Welcome to TechBrew C@fe.</h1>
      <h2>Where coffee meets community and learning.</h2>
      <p>Our mission is to blend the warmth of a cafe with the excitement of lifelong education. Whether you're here to learn, share, or relax, this is your hub for creativity and growth. Let’s brew something amazing together!</p>
      <a href="menu.php" class="btn btn-primary">Order Now</a>
      <!-- Social Media Icons -->
      <div class="media-icons">
        <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" aria-label="Twitter"><i class="bi bi-twitter"></i></a>
      </div>
    </div>
  </section>

  <!-- Section Two -->
  <div class="bg-service">
    <div class="service-one">
      <img src="img1.jpg" alt="">
      <div class="overlay">
        <div class="over-txt">
          <p>for drinks</p>
          <h4>coffee & drinks</h4>
        </div>
      </div>
    </div>
    <div class="service-one">
      <img src="img2.jpg" alt="">
      <div class="overlay">
        <div class="over-txt">
          <p>for entertainment</p>
          <h4>beans & sweets</h4>
        </div>
      </div>
    </div>
    <div class="service-one">
      <img src="img3.jpg" alt="">
      <div class="overlay">
        <div class="over-txt">
          <p>for food</p>
          <h4>croissant & cakes</h4>
        </div>
      </div>
    </div>
  </div>

  
  <!--PRODUCT SECTION-->
  <div class="bg-shop" id="shop">
    <div class="shop-links">
      <div>
        <h2>Products</h2>
      </div>
      <div class="links">
        <li data-filter="all">All</li>
        <li data-filter="coffee">Coffee</li>
        <li data-filter="machines">Machines</li>
        <li data-filter="sweets">Sweets</li>
      </div>
    </div>
    <div class="category-bg hidden" id="coffee-bg"></div>
    <div class="shop-flex">
      <!-- Coffee Products -->
      <div class="shop1 coffee hidden" data-category="black">
        <div class="shop-image">
          <img src="blackcoffee.jpg" alt="Black Coffee">
          <div class="price">$45.00</div>
        </div>
        <h2>Black Coffee</h2>
        
      </div>

      <div class="shop1 coffee hidden" data-category="green">
        <div class="shop-image">
          <img src="greencoffee.jpg" alt="Green Coffee">
          <div class="price">$50.00</div>
        </div>
        <h2>Green Coffee</h2>
        
      </div>

      <!-- Machines -->
      <div class="shop1 machines hidden">
        <div class="shop-image">
          <img src="coffeemachine1.jpg" alt="Coffee Machine">
          <div class="price">$150.00</div>
        </div>
        <h2>Coffee Machine 1</h2>
       
      </div>
      <div class="shop1 machines hidden">
        <div class="shop-image">
          <img src="coffeemachine2.jpg" alt="Coffee Machine">
          <div class="price">$200.00</div>
        </div>
        <h2>Coffee Machine 2</h2>
        
      </div>
      <div class="shop1 machines hidden">
        <div class="shop-image">
          <img src="coffeemachine3.jpg" alt="Coffee Machine">
          <div class="price">$250.00</div>
        </div>
        <h2>Coffee Machine 3</h2>
        
      </div>

      <!-- Sweets -->
      <div class="shop1 sweets hidden">
        <div class="shop-image">
          <img src="sweet1.jpg" alt="Sweet 1">
          <div class="price">$10.00</div>
        </div>
        <h2>Sweet 1</h2>
        
      </div>
      <div class="shop1 sweets hidden">
        <div class="shop-image">
          <img src="sweet2.jpg" alt="Sweet 2">
          <div class="price">$12.00</div>
        </div>
        <h2>Sweet 2</h2>
        
      </div>
      <div class="shop1 sweets hidden">
        <div class="shop-image">
          <img src="sweet3.jpg" alt="Sweet 3">
          <div class="price">$15.00</div>
        </div>
        <h2>Sweet 3</h2>
       
      </div>
      <div class="shop1 sweets hidden">
        <div class="shop-image">
          <img src="sweet4.jpg" alt="Sweet 4">
          <div class="price">$18.00</div>
        </div>
        <h2>Sweet 4</h2>
        
      </div>
    </div>
  </div>
  <!--END OF PRODUCT SECTION -->

<!-- Most Popular Items Section -->
<section class="popular-items py-5 bg-light" id="popular-items">
  <div class="container">
    <h2 class="text-center mb-4">Most Popular Items</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4">

      <!-- Item 1 -->
      <div class="col">
        <div class="card h-100 popular-item">
          <div class="item-image">
            <img src="cup7.jpg" alt="Cappuccino">
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">Cappuccino</h5>
            <p class="card-text">A classic blend of espresso, steamed milk, and foam.</p>
            <p class="fw-bold">$4.99</p>
             
          </div>
        </div>
      </div>

      <!-- Item 2 -->
      <div class="col">
        <div class="card h-100 popular-item">
          <div class="item-image">
            <img src="pastry3.jpg" alt="Latte">
            </div>
          <div class="card-body text-center">
            <h5 class="card-title">Latte</h5>
            <p class="card-text">Rich espresso mixed with creamy steamed milk.</p>
            <p class="fw-bold">$5.49</p>
            
          </div>
        </div>
      </div>

      <!-- Item 3 -->
      <div class="col">
        <div class="card h-100 popular-item">
          <div class="item-image">
            <img src="cup3.jpeg" alt="Cold Brew">
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">Cold Brew</h5>
            <p class="card-text">Smooth and refreshing coffee, brewed cold for hours.</p>
            <p class="fw-bold">$4.49</p>
             
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


  
     <!-- Shopping Cart Icon -->
  <div class="cart-icon">
    <i class="fa-solid fa-cart-shopping"></i>
    <span id="cartCount">0</span>
  </div>
     

  <div class="menu-section">
  <p class="menu-text">Here is the most exciting menu of Tech Brew!</p>
  <!-- Menu Button -->
  <a href="menu.php" class="menu-button">Menu</a>
</div>



  <!-- Membership Section -->
  <section id="membership" class="container my-5">
    <h2 class="text-center mb-4">Membership List</h2>
    <div class="list-group">
      <?php
      $sql = "SELECT name, email FROM members";
      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
          echo "<div class='list-group-item'>";
          echo "<h5>" . $row['name'] . "</h5>";
          echo "<p>Email: " . $row['email'] . "</p>";
          echo "</div>";
        }
      } else {
        echo "<p>No members found.</p>";
      }
      ?>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="row">
        <!-- Description -->
        <div class="col-md-6 contact-description">
          <i class="bi bi-cup-fill coffee-icon"></i>
          <div>
            <h3>Get in Touch</h3>
            <p>At TechBrew Cafe, we believe in fostering a warm and welcoming environment. Whether you want to share feedback, ask a question, or just say hello, feel free to reach out to us!</p>
          </div>
        </div>
        <!-- Form -->
       <!--<div class="col-md-6">
          <h3 class="mb-4">Contact Us</h3>
          <form method="POST" action="contact_submit.php" class="contact-form">
            <input type="email" name="email" class="form-control" placeholder="Your Email" required>
            <textarea name="message" class="form-control" rows="4" placeholder="Your Message" required></textarea>
            <button type="submit" class="btn">Send Message</button>
          </form>
        </div>-->
      </div>
    </div>
  </section>



   <!-- Footer Section -->
<footer class="footer bg-dark text-light py-4">
  <div class="container">
    <div class="row">
      <!-- About Us -->
      <div class="col-md-4">
        <h5>About TechBrew Cafe</h5>
        <p>At TechBrew Cafe, we blend the warmth of coffee with the joy of community and lifelong learning. Join us to relax, create, and grow together.</p>
      </div>
       <!-- Quick Links -->
       <div class="col-md-4">
       <h5>Quick Links</h5>
       <ul class="list-unstyled">
       <li><a href="about.html" class="text-light">About Us</a></li> 
       <li><a href="#membership" class="text-light">Membership</a></li>
       <li><a href="events.php" class="text-light">Events</a></li>
       <li><a href="#contact" class="text-light">Contact</a></li>
       <li><a href="gallery.html" class="text-light">Gallery</a></li>

       </ul>
       </div>

      <!-- Contact Info -->
      <div class="col-md-4">
        <h5>Contact Us</h5>
        <p>
          <i class="bi bi-envelope"></i> 
          <a href="mailto:info@techbrewcafe.com" class="text-light">info@techbrewcafe.com</a>
        </p>
        <p>
          <i class="bi bi-telephone"></i> 
          <a href="tel:+1234567890" class="text-light">+1-234-567-890</a>
        </p>
        <p>
          <i class="bi bi-geo-alt"></i> 
          <a href="https://www.google.com/maps/dir/?api=1&destination=123+Brew+Street,+Coffee+City" 
             class="text-light" 
             target="_blank">
            123 Brew Street, Coffee City
          </a>
        </p>
        <div class="social-icons">
          <a href="#" class="text-light me-3 social-icon"><i class="bi bi-facebook"></i></a>
          <a href="#" class="text-light me-3 social-icon"><i class="bi bi-instagram"></i></a>
          <a href="#" class="text-light social-icon"><i class="bi bi-twitter"></i></a>
        </div>
      </div>
    </div>
    <div class="text-center mt-3">
      <p>&copy; 2025 TechBrew Cafe. All rights reserved.</p>
    </div>
  </div>
</footer>


<!-- Bootstrap JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

  <script>
    
    
    // Search Input Toggle
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchInput.classList.toggle('d-none');
      if (!searchInput.classList.contains('d-none')) {
        searchInput.focus();
      }
    });

    function redirectToMenu() {
  window.location.href = "menu.html";
}



</script>

<script src="product.js"></script>
 
</body>
</html>
