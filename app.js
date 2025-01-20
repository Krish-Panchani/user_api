const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors({
    origin: ['http://localhost:5173', 'https://users.thunderdevelops.in', 'https://user-api-nlbq.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Error Handling Middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, status: 'Internal Server Error', data: null });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
