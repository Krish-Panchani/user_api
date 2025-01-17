const express = require('express');
const { registerUser, loginUser, getUserById, logoutUser } = require('../controllers/userController');
const adminAuth = require('../middlewares/authMiddleware');
const User = require('../models/userModel');

const router = express.Router();

// Existing routes
router.post('/register', registerUser);  // Register user
router.post('/login', loginUser);        // Login user
router.get('/:id', getUserById);         // Get user by ID
router.post('/logout/:id', logoutUser);  // Logout user

// New route to get all users (Admin only)
router.get('/', adminAuth, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Fetch all users, exclude password
        return res.status(200).json({ success: true, status: 'All users fetched successfully', data: users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, status: 'Internal Server Error', data: null });
    }
});

module.exports = router;
