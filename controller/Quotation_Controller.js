// Import database
const knex = require('../config/db');

// load all tbl_Quotation
exports.load_Quotation = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_Quotation')
              .orderBy('id', 'desc') // asc / desc  Sort by  

        res.json({
            message: 'Load Quotation',
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
exports.Get_Quotation = async (req, res) => {
    // console.log(req.params)
    try {
        await knex.select('*')
            .from('tbl_Quotation')
            .where('Quot_Number', '=', req.params.Quot_Number)
            .then(data => {
                res.json({
                    message: "Get Quotation_Data",
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
exports.Insert_Quotation = async (req, res) => {
    try {
        await knex('tbl_Quotation').insert({

            "Quot_Number": req.body.Quot_Number,
            "Description": req.body.Description,
            "HSN_Code": req.body.HSN_Code,
            "Qty": req.body.Qty,
            "Rate": req.body.Rate,
            "Amount": req.body.Amount
        }).then((data) => {
            res.json({
                message: "Insert Quotation_Data",
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
exports.Update_Quotation = async (req, res) => {
    try {
        await knex('tbl_Quotation')
            .where('Quot_Number', '=', req.params.Quot_Number)
            .update({

                "Description": req.body.Description,
                "HSN_Code": req.body.HSN_Code,
                "Qty": req.body.Qty,
                "Rate": req.body.Rate,
                "Amount": req.body.Amount
            }).then((data) => {
                res.json({
                    message: "Update Quotation_Data",
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
exports.Delete_Quotation = async (req, res) => {
    try {
        await knex('tbl_Quotation')
            .where('Quot_Number', '=', req.params.Quot_Number)
            .del().then((data) => {
                res.json({
                    message: "Deleted Quotation_Data",
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

