// Import database
const knex = require('../../config/db');
const bcrypt = require('bcryptjs');

async function signUp(req, res) {
    try {
        const { username, password, role = 'user' } = req.body;

        if (!username) {
            throw new Error("Please provide userName");
        }

        if (!password) {
            throw new Error("Please provide password");
        }

        // function to check duplicate username is present
        const duplicate_User = await knex.select('*')
            .from('tbl_User')
            .where('username', '=', username)
            .andWhere('password', '=', password)
            
    

        if (duplicate_User.length >=1) {
            throw new Error("Already user exits.")
        }

        // hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
        
        // if error in hash throw error
        if (!hashPassword) {
            throw new Error("Something is wrong")
        }

        // const payload = {
        //     ...req.body, // spread the perivouse frontend value
        //     role: "GENERAL", // add to perivouse frontend value
        //     password: hashPassword  // overwrite the frontend password with hashed password
        // }

        await knex('tbl_User')

            .insert({
                'username': username,
                'password': hashPassword,
                'role': role

            }, ['user_id'])

            .then((data) => {
                res.json({
                    message: "Register User Success",
                    data: data,
                    success: true,
                    error: false
                })
            })

    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = signUp;