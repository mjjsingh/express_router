// Import required modules
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

// Route for login
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Route for chat
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html');
});

// Route for storing messages
app.post('/message', (req, res) => {
    const { username, message } = req.body;
    const data = `${username}: ${message}\n`;
    fs.appendFile('messages.txt', data, (err) => {
        if (err) throw err;
        console.log('Message saved!');
    });
    res.redirect('/chat');
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
