const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

async function verifyAuth(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ isAuthenticated: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        // console.log('decoded', decoded)
        return res.status(200).json({ isAuthenticated: true, user: decoded });
    } catch (error) {
        return res.status(401).json({ isAuthenticated: false });
    }
}

router.get('/verify', verifyAuth);

module.exports = router;
