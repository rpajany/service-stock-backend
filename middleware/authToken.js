const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {  // middleware -> use 'next"
    try {
        const token = req.cookies?.token || req.header // get the token from frontend cookies

        // console.log("token", token)

        if (!token) {  // if no token throw error and return
            return res.json({ // res.status(200).json
                message: "User not Login, Please Login...!",
                error: true,    
                success: false,
                isAuthenticated: false
            })
        }

        

        // decrypt token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            // console.log(err)
            // console.log("decoded", decoded)

            if (err) {  // on error
                console.log("error auth", err)
            }

            // console.log('decoded?.user_id ',decoded?.user_id)
            req.user_id = decoded?.user_id  // return userId which is passed to userDetails.js

            next()
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [], // return empty data on error
            error: true,
            success: false
        })
    }
}

module.exports = authToken