const knex = require('../config/db');
const moment = require('moment');


// load all tbl_sales_pay_report
exports.load_SalesPayDetails = async (req, res) => {
    try {
        if (req.body.StartDate !== "" && req.body.EndDate !== "") {
            const data = await knex.select('*')
                .from('tbl_sales_pay_report')
                // .where('created_at', '>=', moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
                // .andWhere('created_at', '<=', moment(req.body.EndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
 .where('created_at', '>=', moment(req.body.StartDate + '00:00:00', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
            .andWhere('created_at', '<=', moment(req.body.EndDate + '23:59:59', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
  .orderBy('id', 'desc') // asc / desc  Sort by  
  
            const formattedData = data.map(row => ({
                ...row,
                //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
                //   .replace(/\//g, '-') // replace slashes with dashes
                Invoice_Date: moment(row.Invoice_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
            }));

            res.json({
                message: 'Load Date sales_payment Details',
                data: formattedData,
                success: true,
                error: false
            });
        }
    } catch (error) {

    }
}

// get  single item from tbl_sales_pay_report
exports.Get_SalesPayDetails = async (req, res) => {
    // console.log(req.params)
    try {
        const data = await knex.select('*')
            .from('tbl_sales_pay_report')
            .where('Invoice_Number', '=', req.params.Invoice_Number)

        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            Invoice_Date: moment(row.Invoice_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get sales_payment Details",
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

// Add/Insert tbl_sales_pay_report
exports.Insert_SalesPayDetails = async (req, res) => {
    try {
        await knex('tbl_sales_pay_report')
            .returning('id')
            .insert({
                'Invoice_Number': req.body.Invoice_Number,
                'Invoice_Date': moment(req.body.Invoice_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                'Customer_Name': req.body.Customer_Name,
                'Amount_Recived': req.body.Amount_Recived,
                'Balance_Amount': req.body.Balance_Amount,
                'Pay_Mode': req.body.Pay_Mode,
                'Pay_Note': req.body.Pay_Note,
                'Pay_Date': req.body.Pay_Date,
                'Pay_Status': req.body.Pay_Status

            }).then((data) => {
                res.json({
                    message: "Insert sales_pay_report",
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


// update tbl_sales_pay_report
exports.Update_SalesPayDetails = async (req, res) => {
    try {
        await knex('tbl_sales_pay_report')
            .returning('id')
            .where('Invoice_Number', req.params.Invoice_Number)
            .update({

                'Invoice_Date': moment(req.body.Invoice_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                'Customer_Name': req.body.Customer_Name,
                'Amount_Recived': req.body.Amount_Recived,
                'Balance_Amount': req.body.Balance_Amount,
                'Pay_Mode': req.body.Pay_Mode,
                'Pay_Note': req.body.Pay_Note,
                'Pay_Date': req.body.Pay_Date,
                'Pay_Status': req.body.Pay_Status
            })
            .then((data) => {
                res.json({
                    message: "Updated SalesPayDetails",
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

// Delete tbl_sales_pay_report
exports.Delete_SalesPayDetails = async (req, res) => {
    try {
        await knex('tbl_sales_pay_report')
            .returning('id')
            .where('Invoice_Number', '=', req.params.Invoice_Number)
            .del()
            .then((data) => {
                res.json({
                    message: "Deleted SalesPayDetails",
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