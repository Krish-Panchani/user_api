const express = require('express');
const { registerUser, loginUser, getUserById, logoutUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser); // Register user
router.post('/login', loginUser);       // Login user
router.get('/:id', getUserById);        // Get user by ID
router.post('/logout/:id', logoutUser); // Logout user

module.exports = router;
