const express = require('express');
const app = express();
const port = 3000;

// Optional: parse JSON bodies
app.use(express.json());

// Example route for root
app.get('/', (req, res) => {
    res.send('Hello World! Backend is working.');
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
