const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Import JWT library
const app = express();
const port = 3000;

// MySQL Database Connection
const db = mysql.createConnection({
    host: '34.128.103.197',
    user: 'dapurly-project',
    password: '12345',
    database: 'user-db',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Middleware
app.use(bodyParser.json());

// Register Endpoint
app.post('/register', (req, res) => {
    const { name, email, password } = req.body; // Extract name, email, and password from request body

    // ... existing code ...

    // Generate token
    const token = jwt.sign({ email }, 'qawsedrf'); // Replace 'secret_key' with your own secret key

    // Return token in the response
    res.json({ message: 'User registered successfully', token });
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body

    // ... existing code ...

    // Generate token
    const token = jwt.sign({ email }, 'qawsedrf'); // Replace 'secret_key' with your own secret key

    // Return token in the response
    res.json({ message: 'Login successful', token });
});

// Protected Endpoint
app.get('/protected', verifyToken, (req, res) => {
    // Verify token
    jwt.verify(req.token, 'qawsedrf', (err, decoded) => { // Replace 'secret_key' with your own secret key
        if (err) {
            console.error('Error verifying token: ', err);
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Token is valid, return protected data
        res.json({ message: 'Protected data', user: decoded });
    });
});

// Verify Token Middleware
function verifyToken(req, res, next) {
    // Get token from headers
    const token = req.headers['authorization'];

    if (typeof token !== 'undefined') {
        // Set token in request object
        req.token = token;
        next();
    } else {
        // No token provided
        res.status(403).json({ message: 'No token provided' });
    }
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
