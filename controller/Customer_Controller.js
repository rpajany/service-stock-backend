// Import database
const knex = require('../config/db');
const moment = require('moment');

// load all tbl_Customer
exports.load_Customer = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_Customer')
            .orderBy('id', 'desc') // asc / desc  Sort by  

        res.json({
            message: 'Load Customer',
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

// Seacrh load all tbl_Customer
exports.Search_loadCustomer = async (req, res) => {
    try {
        const data = await knex.select('Customer_Name', 'Mobile', 'Address')
            .from('tbl_Customer');

        res.json({
            message: 'Search load_Customer',
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

// get  single customer from tbl_Customer
exports.Get_Customer = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_Customer')
            .where('Cust_id', '=', req.params.Cust_id);

        // console.log('data :', data);

        if (data.length >= 1) {
            res.json({
                message: `Get Customer By Cust_id : ${req.params.Cust_id}`,
                data: data,
                success: true,
                error: false
            });
        } else {
            res.json({
                message: `Customer Not Found By Cust_id : ${req.params.Cust_id}`,
                data: null,
                success: true,
                error: false
            });
        }


    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

// Add/Insert tbl_Customer
exports.Insert_Customer = async (req, res) => {
    try {
        await knex('tbl_Customer').insert({
            "Cust_id": req.body.Cust_id,
            "Customer_Name": req.body.Customer_Name,
            "Address": req.body.Address,
            "State": req.body.State,
            "Mobile": req.body.Mobile,
            "Email": req.body.Email,
            "GSTIN": req.body.GSTIN
        }).then((data) => {
            res.json({
                message: "Insert Customer",
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


// update tbl_Customer
exports.Update_Customer = async (req, res) => {
    try {
        const data = await knex('tbl_Customer')
            .where('Cust_id', req.params.Cust_id)
            .update({
                "Cust_id": req.body.Cust_id,
                "Customer_Name": req.body.Customer_Name,
                "Address": req.body.Address,
                "State": req.body.State,
                "Mobile": req.body.Mobile,
                "Email": req.body.Email,
                "GSTIN": req.body.GSTIN
            });


        res.json({
            message: "Update Customer Successfull",
            data: data,
            success: true,
            error: false
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

// Delete tbl_Customer
exports.Delete_Customer = async (req, res) => {
    try {
        await knex('tbl_Customer')
            .where('Cust_id', '=', req.params.Cust_id)
            .del().then((data) => {
                res.json({
                    message: "Deleted Customer",
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
