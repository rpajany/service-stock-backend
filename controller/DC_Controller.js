// Import database
const knex = require('../config/db');

// load all tbl_Quotation
exports.load_DC= async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_DC')
            .orderBy('id', 'desc') // asc / desc  Sort by  

        res.json({
            message: 'Load DC',
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
        });
    }
}

// get single item from tbl_Quotation
exports.Get_DC = async (req, res) => {
    // console.log(req.params)
    try {
        await knex.select('*')
            .from('tbl_DC')
            .where('DC_Number', '=', req.params.DC_Number)
            .then(data => {
                res.json({
                    message: "Get DC_Data",
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

// Add/Insert tbl_Quotation
exports.Insert_DC = async (req, res) => {
    try {
        await knex('tbl_DC').insert({

            "DC_Number": req.body.DC_Number,
            "Description": req.body.Description,
            "Serial": req.body.Serial,
            "HSN_Code": req.body.HSN_Code,
            "Qty": req.body.Qty,
            "Rate": req.body.Rate,
            "Amount": req.body.Amount
        }).then((data) => {
            res.json({
                message: "Insert DC_Data",
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

// update tbl_Quotation
exports.Update_DC = async (req, res) => {
    try {
        await knex('tbl_DC')
            .where('DC_Number', '=', req.params.DC_Number)
            .update({

                "Description": req.body.Description,
                "Serial": req.body.Serial,
                "HSN_Code": req.body.HSN_Code,
                "Qty": req.body.Qty,
                "Rate": req.body.Rate,
                "Amount": req.body.Amount
            }).then((data) => {
                res.json({
                    message: "Update DC_Data",
                    data: data,
                    success: true,
                    error: false
                });
            });
    } catch (err) {
        // Send a error message in response
        res(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

// Delete tbl_Quotation
exports.Delete_DC = async (req, res) => {
    try {
        await knex('tbl_DC')
            .where('DC_Number', '=', req.params.DC_Number)
            .del().then((data) => {
                res.json({
                    message: "Deleted DC_Data",
                    data: data,
                    success: true,
                    error: false
                });
            });
    } catch (err) {
        // Send a error message in response
        res(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

