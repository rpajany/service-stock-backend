// Import database
const knex = require('../config/db');

// load all tbl_Quotation_Terms
exports.load_QuoteTerms = async (req, res) => {
    try {
        await knex.select('*')
            .from('tbl_Quotation_Terms').then(data => {
                res.json({
                    message: 'Load Quotation_Terms',
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
        });
    }
}