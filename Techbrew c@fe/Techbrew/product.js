const categoryBg = document.getElementById('coffee-bg');
  const products = document.querySelectorAll('.shop1');

  // Function to show initial products
  function showInitialProducts() {
    products.forEach((product, index) => {
      product.classList.add('hidden'); // Hide all products
      if (index < 3) {
        product.classList.remove('hidden'); // Show only the first three
      }
    });
  }

  // Call function to show initial products on page load
  showInitialProducts();

  // Handle filter click events
  document.querySelectorAll('.links li').forEach(filter => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.filter;

      // Reset the background for the coffee category
      if (category === 'coffee') {
        categoryBg.style.backgroundImage = 'url("coffee-bg.jpg")';
        categoryBg.classList.remove('hidden');
      } else {
        categoryBg.classList.add('hidden');
      }

      // Show/hide products based on the selected category
      products.forEach(product => {
        product.classList.toggle(
          'hidden',
          category !== 'all' && !product.classList.contains(category)
        );
      });
    });
  });


