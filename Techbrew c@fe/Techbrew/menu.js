let shoppingCart = [];

// Function to toggle cart modal
function toggleCart() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.style.display = cartModal.style.display === "block" ? "none" : "block";
}

// Function to add items to the cart
function addToCart(productName, price) {
  const existingItem = shoppingCart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    shoppingCart.push({ name: productName, price, quantity: 1 });
  }
  updateCartDisplay();
  updateCartCount();
}

// Function to update the cart display
function updateCartDisplay() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  if (shoppingCart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  shoppingCart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
      <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(cartItem);
  });
}

// Function to update cart count badge
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const totalCount = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalCount;
}

// Function to remove an item from the cart
function removeFromCart(index) {
  shoppingCart.splice(index, 1);
  updateCartDisplay();
  updateCartCount();
}

// Close modal when clicking outside
window.onclick = function(event) {
  const cartModal = document.getElementById("cart-modal");
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
};