// Import database
const knex = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signIn(req, res) {
 
    try {
        const { username, password, role = 'user' } = req.body;

        if (!username) {
            throw new Error('UserName is Missing')
        }

        if (!password) {
            throw new Error('Password is Missing')
        }


        const user = await knex.select('*')
            .from('tbl_User')
            .where('username', '=', username)



        // console.log('user', user)




        if (!user.length >=1) {
            throw new Error("User not found") // throw error if no user found
        }




        const checkPassword = await bcrypt.compare(password, user[0].password); // check user passward with db password


        if (checkPassword) { // if password correct
            const tokenData = {   // create  token data obj
                user_id: user[0].user_id,
                username: user[0].username,
                role:user[0].role
            } 

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 }); // expires in 8 hour


            // true for Production & false for Development / secure: process.env.NODE_ENV === 'production', // Only secure in production
            const tokenOption = {
                httpOnly: true, // Prevents client-side JavaScript access
                // secure: true  // Ensures the cookie is sent over HTTPS
                //sameSite: 'Strict', // Protects against CSRF
                secure: process.env.NODE_ENV === 'production', // Secure in production only
            }

            // save json web token in user cookie and send res.data
            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            })

        } else {
            throw new Error("Please check Password")
        }



    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = signIn;