// Import database
const knex = require('../config/db');
const moment = require('moment');

// load all tbl_Quotation_Details
exports.load_QuotationDetails = async (req, res) => {
    try {
        if (req.body.StartDate !== "" && req.body.EndDate !== "") {
            const data = await knex.select('*')
                .from('tbl_Quotation_Details')
                // .where('Date', '>=', moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
                // .andWhere('Date', '<=', moment(req.body.EndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
                .where('Date', '>=', moment(req.body.StartDate + '00:00:00', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
                .andWhere('Date', '<=', moment(req.body.EndDate + '23:59:59', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))

                .orderBy('id', 'desc') // asc / desc  Sort by  

            const formattedData = data.map(row => ({
                ...row,
                //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
                //   .replace(/\//g, '-') // replace slashes with dashes
                Date: moment(row.Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
            }));

            res.json({
                message: 'Load Quotation_Details',
                data: formattedData,
                success: true,
                error: false
            });

        } else {
            await knex.select('*').from('tbl_Quotation_Details').then(data => {
                res.json({
                    message: 'Load Quotation_Details',
                    data: data,
                    success: true,
                    error: false
                });
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

// get  single item from tbl_Quotation_Details
exports.Get_QuotationDetail = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_Quotation_Details')
            .where('Quot_Number', '=', req.params.Quot_Number)

        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            Date: moment(row.Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get Quotation_Details",
            data: formattedData,
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

// Add/Insert tbl_Quotation_Details
exports.Insert_QuotationDetail = async (req, res) => {
    try {
        await knex('tbl_Quotation_Details')
            .insert({
                'Quot_Number': req.body.Quot_Number,
                'Date': moment(req.body.Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                'Cust_id': req.body.Cust_id,
                'Company': req.body.Company,
                'Contact': req.body.Contact,
                'Taxable_Amount': req.body.Taxable_Amount,
                'Tax_Perc': req.body.Tax_Perc,
                'TaxAmount': req.body.TaxAmount,
                'Total': req.body.Total,
                'Status': req.body.Status,
                'Not_InScope': req.body.Not_InScope,
                'Tax_Terms': req.body.Tax_Terms,
                'Payment_Terms': req.body.Payment_Terms,
                'Validity_Terms': req.body.Validity_Terms,
                'Delivery_Terms': req.body.Delivery_Terms,
                'Model': req.body.Model,
                'Serial': req.body.Serial,
                'Job_No': req.body.Job_No

            }).then((data) => {
                res.json({
                    message: "Insert Quotation_Details",
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

// update tbl_Quotation_Details
exports.Update_QuotationDetail = async (req, res) => {
    try {
        await knex('tbl_Quotation_Details')
            .where('Quot_Number', req.params.Quot_Number)
            .update({

                'Date': moment(req.body.Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                'Cust_id': req.body.Cust_id,
                'Company': req.body.Company,
                'Contact': req.body.Contact,
                'Taxable_Amount': req.body.Taxable_Amount,
                'Tax_Perc': req.body.Tax_Perc,
                'TaxAmount': req.body.TaxAmount,
                'Total': req.body.Total,
                'Status': req.body.Status,
                'Not_InScope': req.body.Not_InScope,
                'Tax_Terms': req.body.Tax_Terms,
                'Payment_Terms': req.body.Payment_Terms,
                'Validity_Terms': req.body.Validity_Terms,
                'Delivery_Terms': req.body.Delivery_Terms,
                'Model': req.body.Model,
                'Serial': req.body.Serial,
                'Job_No': req.body.Job_No
            })
            .then((data) => {
                res.json({
                    message: "Updated Quotation_Details",
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


// update Status tbl_Quotation_Details
exports.UpdateStatus_QuotationDetail = async (req, res) => {
    try {
        await knex('tbl_Quotation_Details')
            .where('Quot_Number', req.params.Quot_Number)
            .update({


                'Status': req.body.Status,

            })
            .then((data) => {
                res.json({
                    message: "Updated Status in Quotation_Details success",
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


// Delete tbl_Quotation_Details
exports.Delete_QuotationDetail = async (req, res) => {
    try {
        await knex('tbl_Quotation_Details')

            .where('Quot_Number', '=', req.params.Quot_Number)
            .del()
            .then((data) => {
                res.json({
                    message: "Deleted Quotation_Details",
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