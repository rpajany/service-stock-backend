// Import database
const knex = require('../../config/db');

// Delete tbl_EngStock
exports.Delete_User = async (req, res) => {
    try {
        const data = await knex('tbl_User')
            .where('user_id', '=', req.params.user_id)
            .del()

        res.json({
            message: "Load All Engineer User",
            data: data,
            success: true,
            error: false
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