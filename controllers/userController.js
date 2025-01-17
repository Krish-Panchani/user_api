const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
// Register user
exports.registerUser = async (req, res) => {
    const { username, email, password, cnf_password, gender, isAdmin } = req.body;

    // Basic validation
    if (!username || !email || !password || !cnf_password || !gender) {
        return res.status(400).json({ success: false, status: 'Fields missing', data: null });
    }

    if (password !== cnf_password) {
        return res.status(400).json({ success: false, status: 'Passwords do not match', data: null });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, status: 'Email already registered', data: null });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            gender,
            isAdmin: isAdmin || false, // Default isAdmin to false if not provided
        });
        await newUser.save();

        return res.status(201).json({ success: true, status: 'User registered successfully', data: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, status: 'Internal Server Error', data: null });
    }
};


// Login user
// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, status: 'Fields missing', data: null });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, status: 'User not found', data: null });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, status: 'Invalid credentials', data: null });
        }

        // Set isLoggedIn to true
        user.isLoggedIn = true;
        await user.save();

        const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ success: true, status: 'Login successful', data: { token, user } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, status: 'Internal Server Error', data: null });
    }
};

// Logout user
exports.logoutUser = async (req, res) => {
    const { id } = req.params; // Extract user ID from route parameters

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, status: 'User not found', data: null });
        }

        // Set isLoggedIn to false
        user.isLoggedIn = false;
        await user.save();

        return res.status(200).json({ success: true, status: 'Logout successful', data: null });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, status: 'Internal Server Error', data: null });
    }
};


// Get user by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params; // Extract user ID from route parameters

    try {
        const user = await User.findById(id).select('-password'); // Exclude the password from the response
        if (!user) {
            return res.status(404).json({ success: false, status: 'User not found', data: null });
        }

        return res.status(200).json({ success: true, status: 'User fetched successfully', data: user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, status: 'Internal Server Error', data: null });
    }
};
