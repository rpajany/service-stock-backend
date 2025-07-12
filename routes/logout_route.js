 const express = require('express');
const router = express.Router();

async function logout(req, res) {
    // console.log(req)
    res.clearCookie("token", { path: '/' }).status(200).json({
        message: "Logout successful",
        success: true,
        error: false
    });
}

// router.post('/', logout);

module.exports = logout;