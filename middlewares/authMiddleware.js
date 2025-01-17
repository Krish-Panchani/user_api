// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const adminAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from `Authorization` header

    if (!token) {
        return res.status(401).json({ success: false, status: 'Unauthorized: No token provided', data: null });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT
        const user = await User.findById(decoded.id);

        if (!user || !user.isAdmin) {
            return res.status(403).json({ success: false, status: 'Forbidden: Access denied', data: null });
        }

        req.user = user; // Attach the user object to the request
        next(); // Proceed to the next middleware/handler
    } catch (err) {
        console.error(err);
        return res.status(401).json({ success: false, status: 'Unauthorized: Invalid token', data: null });
    }
};

module.exports = adminAuth;
