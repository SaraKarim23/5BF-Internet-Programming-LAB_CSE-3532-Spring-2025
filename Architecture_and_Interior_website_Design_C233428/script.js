const text = "Choose Your Budget Range";
let index = 0;

function type() {
    const typingTextElement = document.getElementById("typing-text");
    if (index < text.length) {
        typingTextElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 300); // Delay between each character
    }
} 
// Change the color of the text
function styleText(color, bold,fontSize) {
    const typingTextElement = document.getElementById("typing-text");
    typingTextElement.style.color = color;
    typingTextElement.style.fontWeight = bold ? "bold" : "normal"; // Make text bold or normal
    typingTextElement.style.fontSize = fontSize; 
}
type(); // Start typing animation

setTimeout(() => {
    styleText("black",true,"40px"); // Change this color to whatever you prefer
}, 500); // Wait for the typing animation to start before changing the color


// Function to add the slide-in effect
function slideInServices() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Check if the item is in the viewport
        if (itemTop < windowHeight - 100) {
            item.classList.add('slide-in'); // Add the animation class
        }
    });
}

// Listen for scroll events and run the slideInServices function
window.addEventListener('scroll', slideInServices);

// Initial call to animate items already in view on page load
slideInServices();

// Add animation class to heading on page load
window.onload = function() {
    const heading = document.querySelector('.range-section h2');
    heading.classList.add('animate'); // Add the animation class
};

// Data for each range
const rangeData = {
    low: [
        { img: 'low1.jpg', price: '$100,000' },
        { img: 'low2.jpg', price: '$120,000' },
        { img: 'low3.jpg', price: '$150,000' }
    ],
    medium: [
        { img: 'medium1.jpg', price: '$200,000' },
        { img: 'medium2.jpg', price: '$250,000' },
        { img: 'medium3.jpg', price: '$300,000' }
    ],
    high: [
        { img: 'high1.jpg', price: '$500,000' },
        { img: 'high2.jpg', price: '$750,000' },
        { img: 'high3.jpg', price: '$1,000,000' }
    ]
};

// Data for range descriptions and materials
const rangeDetails = {
    low: {
       description: "This range offers budget-friendly options, perfect for first-time homebuyers or those looking to invest wisely. These homes provide a comfortable and stylish living space without breaking the bank.",
        material: "Standard finishes and fixtures such as vinyl flooring, composite countertops, and fiber-cement siding. Interiors use durable, low-cost materials like laminate cabinetry and engineered wood."
    },
    medium: {
        description: "The medium range offers a balanced blend of affordability and enhanced quality. These homes provide upgraded materials and finishes for a more luxurious feel, ideal for families seeking comfort and style.",
        material: "Quality finishes like hardwood flooring, granite countertops, and upgraded cabinetry. Enhanced energy efficiency with double-glazed windows, insulated walls, and natural wood accents."
    },
    high: {
        description: "The high range is designed for premium living with luxurious finishes, spacious layouts, and state-of-the-art amenities. These homes exemplify elegance and sophistication, suitable for those seeking a high-end lifestyle.",
        material: "Premium materials like marble countertops, custom cabinetry, hardwood flooring, and smart-home technology. Exterior features high-quality stone and brick finishes with exquisite custom lighting."
    }
};

// Function to update the description and material based on the selected range
function updateRangeDetails(range) {
    const descriptionElement = document.getElementById('range-description');
    const materialElement = document.getElementById('range-material');

    descriptionElement.innerHTML = rangeDetails[range].description;
    materialElement.innerHTML = rangeDetails[range].material;

    // Add animation class to make the information visible
    const rangeInfo = document.querySelector('.range-info');
    rangeInfo.classList.add('show');
}

// Function to display the selected range images
function showRange(range) {
    const rangeGallery = document.getElementById('range-gallery');
    rangeGallery.innerHTML = ''; // Clear previous images

    rangeData[range].forEach(item => {
        const rangeItem = document.createElement('div');
        rangeItem.classList.add('range-item');
        rangeItem.innerHTML = `
            <img src="${item.img}" alt="${range} range house">
            <span class="price-tag">${item.price}</span>
        `;
        rangeGallery.appendChild(rangeItem);
    });

    // Update the description and material text for the selected range
    updateRangeDetails(range);
}

// Display Low Range by default
showRange('low');

// Select all buttons and range items
const buttons = document.querySelectorAll('.range-btn');
const rangeItems = document.querySelectorAll('.range-item');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const targetRange = button.getAttribute('data-target');

        // Show the images related to the selected range
        showRange(targetRange);

        // Update the description and material text
        updateRangeDetails(targetRange);
    });
});