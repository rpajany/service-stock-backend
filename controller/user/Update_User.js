// Import database
const knex = require('../../config/db');

async function update_User(req, res) {
    try {
        const { username, password, role  } = req.body;
        await knex('tbl_User')
            .where('user_id',  req.params.user_id)
            .update({
                'username': req.body.username,
                'password': req.body.password,
                'role': req.body.role
            })
            .then((data) => {
                res.json({
                    message: "Updated User Successfully..!",
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

module.exports = update_User;