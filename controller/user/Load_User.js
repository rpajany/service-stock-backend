// Import database
const knex = require('../../config/db');

// get all users
exports.load_User = async (req, res) => {
    try {
        await knex.select('user_id','username','role').from('tbl_User')
         .orderBy('user_id', 'desc') // asc / desc  Sort by  
        .then(data => {
            res.json({
                message: "Load All User",
                data: data,
                success: true,
                error: false
            });
        });
    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

// get  single item from tbl_EngStock
exports.Load_EngUser = async (req, res) => {
    try {
        await knex.select('username').from('tbl_User')
            .where('role', '=', 'Engineer')
            .then(data => {
                res.json({
                    message: "Load All Engineer User",
                    data: data,
                    success: true,
                    error: false
                });
            });
    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
// module.exports = load_User;