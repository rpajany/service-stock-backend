// Import database
const knex = require('../config/db');

// get  salesUID from  tbl_UID
exports.Get_SalesUID = async (req, res) => {
    try {
        await knex.select('Sales_UID').from('tbl_UID').then(data => {
            res.json({
                message: "Get Sales_UID",
                data: data,
                success: true,
                error: false
            });
        })
    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

// update salesUID from  tbl_UID
exports.Update_SalesUID = async (req, res) => {
    try {
        await knex('tbl_UID')
            .where('id', req.params.id)
            .update({ "Sales_UID": req.body.Sales_UID, })
            .then(data => {
                res.json({
                    message: "Get Sales_UID",
                    data: data,
                    success: true,
                    error: false
                });
            })
    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

// get  quoteUID from  tbl_UID
exports.Get_QuoteUID = async (req, res) => {
    try {
        await knex.select('Quotation_UID').from('tbl_UID').then(data => {
            res.json({
                message: "Get Quotation_UID",
                data: data,
                success: true,
                error: false
            });
        })
    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

// update salesUID from  tbl_UID
exports.Update_QuoteUID = async (req, res) => {
    try {
        await knex('tbl_UID')
            .where('id', req.params.id)
            .update({ "Quotation_UID": req.body.Quotation_UID })
            .then(data => {
                res.json({
                    message: "Update Quotation_UID",
                    data: data,
                    success: true,
                    error: false
                });
            })
    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

// get  NonGST_sales_UID from  tbl_UID
exports.Get_NonGST_SalesUID = async (req, res) => {
    try {
        await knex.select('NonGST_sales_UID').from('tbl_UID').then(data => {
            res.json({
                message: "Get NonGST_sales_UID",
                data: data,
                success: true,
                error: false
            });
        })
    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

// update NonGST_sales_UID from  tbl_UID
exports.Update_NonGST_SalesUID = async (req, res) => {
    try {
        await knex('tbl_UID')
            .where('id', req.params.id)
            .update({ "NonGST_Sales_UID": req.body.NonGST_Sales_UID, })
            .then(data => {
                res.json({
                    message: "Get NonGST_sales_UID",
                    data: data,
                    success: true,
                    error: false
                });
            })
    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

// get  Service_UID from  tbl_UID
exports.Get_ServiceUID = async (req, res) => {
    try {
        await knex.select('Service_UID').from('tbl_UID').then(data => {
            res.json({
                message: "Get Service_UID",
                data: data,
                success: true,
                error: false
            });
        })
    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

// update salesUID from  tbl_UID
exports.Update_ServiceUID = async (req, res) => {
    try {
        await knex('tbl_UID')
            .where('id', req.params.id)
            .update({ "Service_UID": req.body.Service_UID })
            .then(data => {
                res.json({
                    message: "Update Service_UID",
                    data: data,
                    success: true,
                    error: false
                });
            })
    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

// get  Customer_UID from  tbl_UID
exports.Get_CustomerUID = async (req, res) => {
    try {
        await knex.select('Customer_UID').from('tbl_UID').then(data => {
            res.json({
                message: "Get Customer_UID",
                data: data,
                success: true,
                error: false
            });
        })
    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

// update Customer UID from  tbl_UID
exports.Update_CustomerUID = async (req, res) => {
    try {
        await knex('tbl_UID')
            .where('id', req.params.id)
            .update({ "Customer_UID": req.body.Customer_UID })
            .then(data => {
                res.json({
                    message: "Update Customer_UID",
                    data: data,
                    success: true,
                    error: false
                });
            })
    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}


// get  DC_UID from  tbl_UID
exports.Get_DC_UID = async (req, res) => {
    try {
        await knex.select('DC_UID').from('tbl_UID').then(data => {
            res.json({
                message: "Get DC_UID",
                data: data,
                success: true,
                error: false
            });
        })
    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

// update DC UID from  tbl_UID
exports.Update_DC_UID = async (req, res) => {
    try {
        await knex('tbl_UID')
            .where('id', req.params.id)
            .update({ "DC_UID": req.body.DC_UID })
            .then(data => {
                res.json({
                    message: "Update DC_UID",
                    data: data,
                    success: true,
                    error: false
                });
            })
    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}