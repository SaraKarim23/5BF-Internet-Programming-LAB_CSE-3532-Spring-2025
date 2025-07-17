const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Dummy data for demonstration
let users = [{ id: 1, name: 'John Doe', token: 'abc123' }];
let cartItems = [
    { userId: 1, productId: 101, productName: 'Pizza', quantity: 1 },
    { userId: 1, productId: 102, productName: 'Burger', quantity: 2 },
];

// Middleware to authenticate user
function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    const user = users.find(u => u.token === token);

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
}

// Add item to cart
app.post('/api/cart/add', authenticate, (req, res) => {
    const { productId, productName, quantity } = req.body;

    if (!productId || !productName || !quantity) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    cartItems.push({ userId: req.user.id, productId, productName, quantity });
    res.status(200).json({ message: 'Item added to cart successfully' });
});

// Get cart items
app.get('/api/cart', authenticate, (req, res) => {
    const userCart = cartItems.filter(item => item.userId === req.user.id);
    res.status(200).json(userCart);
});

// Simulate login (for demo purposes only)
app.post('/api/login', (req, res) => {
    const { name } = req.body;
    const user = users.find(u => u.name === name);

    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }

    res.status(200).json({ token: user.token });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
