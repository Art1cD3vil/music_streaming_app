const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL user
    password: 'Varareet&&1127', // replace with your MySQL password
    database: 'music_streaming'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// API endpoint for login
app.post('/login', async (req, res) => {
    const { username, password } = req.body; // username is the email

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Query to find the user
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).json({ message: 'Login failed.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const user = results[0];

        // Compare the hashed password with the provided password
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return res.status(200).json({ message: 'Login successful!' });
        } else {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
    });
});

// API endpoint for registration
app.post('/register', async (req, res) => {
    const { name, phone, email, dob, password } = req.body;

    // Simple validation
    if (!name || !phone || !email || !dob || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const query = 'INSERT INTO users (name, phone, email, dob, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, phone, email, dob, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ message: 'Error creating user.' });
        }
        res.status(201).json({ message: 'User created successfully!' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// Fetch songs from MySQL
app.get('/api/songs', async (req, res) => {
    try {
        const [rows] = await db.promise().query("SELECT * FROM songs");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching songs:", error);
        res.status(500).send('Error fetching songs');
    }
});
// Example Express.js route
app.get('/api/songs', async (req, res) => {
    const userId = req.user.id; // Assuming you have user authentication

    // Check if the user is premium
    const user = await User.findById(userId);
    
    let songs;
    if (user.isPremium) {
        // Fetch all songs including premium ones
        songs = await Song.find(); // This can fetch all songs
    } else {
        // Fetch only normal songs
        songs = await Song.find({ is_premium: false });
    }

    res.json(songs);
});
