// Import database
const knex = require('../config/db');
const moment = require('moment');

// load all tbl_sales_details
exports.load_SalesDetails = async (req, res) => {
    try {
        if (req.body.StartDate !== "" && req.body.EndDate !== "") {
            const data = await knex.select('*')
                .from('tbl_sales_details')
                .where('Invoice_Date', '>=', moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
                .andWhere('Invoice_Date', '<=', moment(req.body.EndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))

                // .where('Invoice_Date', '>=', moment(req.body.StartDate + '00:00:00', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
                // .andWhere('Invoice_Date', '<=', moment(req.body.EndDate + '23:59:59', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
                .orderBy('id', 'desc') // asc / desc  Sort by  

            const formattedData = data.map(row => ({
                ...row,
                //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
                //   .replace(/\//g, '-') // replace slashes with dashes
                Invoice_Date: moment(row.Invoice_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
            }));

            res.json({
                message: 'Load Date sales_Details',
                data: formattedData,
                success: true,
                error: false
            });

        } else {
            await knex.select('*').from('tbl_sales_details').then(data => {
                res.json({
                    message: 'Load Sales_Details',
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


// get  single item from tbl_sales_details
exports.Get_SalesDetail = async (req, res) => {
    // console.log(req.params)
    try {
        const data = await knex.select('*')
            .from('tbl_sales_details')
            .where('Invoice_Number', '=', req.params.Invoice_Number)

        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            Invoice_Date: moment(row.Invoice_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get sales_details",
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

// get  Total_Sales from tbl_sales_details
exports.Get_TotalSales = async (req, res) => {
    // console.log(req.params)
    try {
        const data = await knex('tbl_sales_details')
            .sum('Total_Amount as Total')
            .sum('Amount_Paid as Paid')
            .sum('Balance_Amount as Balance')

            .where('Invoice_Date', '>=', moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
            .andWhere('Invoice_Date', '<=', moment(req.body.EndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))



        res.json({
            message: "Get Total_Sales",
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
    } finally {
        // knex.destroy(); // Close the connection
    }
}


// get Month wise Data
exports.Get_MonthWiseData = async (req, res) => {
    // console.log(req.params)
    try {


        const result = await knex
            .raw(
                `
        WITH months AS (
          SELECT '01' as month
          UNION ALL SELECT '02'
          UNION ALL SELECT '03'
          UNION ALL SELECT '04'
          UNION ALL SELECT '05'
          UNION ALL SELECT '06'
          UNION ALL SELECT '07'
          UNION ALL SELECT '08'
          UNION ALL SELECT '09'
          UNION ALL SELECT '10'
          UNION ALL SELECT '11'
          UNION ALL SELECT '12'
        )
        SELECT 
          '${req.params.Year}' as year,
          m.month,
          COALESCE(SUM(t.Total_Amount), 0) as amount
        FROM months m
        LEFT JOIN tbl_sales_details t 
          ON strftime('%Y', t.Invoice_Date) = '${req.params.Year}' 
          AND strftime('%m', t.Invoice_Date) = m.month
        GROUP BY m.month
        ORDER BY m.month
        `
            );

        // Extract total_amount into an array and round to 2 decimal places
        const totalAmounts = result.map(row =>
            parseFloat(row.amount.toFixed(2)) // Round to 2 decimals
        );

        // console.log(result);
        // return result; // Example: [{ year: '2024', month: '01', total_sales: 500, ... }]

        res.json({
            message: "Get Sales_MonthWiseData",
            data: totalAmounts,
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


// Add/Insert tbl_sales_details
exports.Insert_SalesDetails = async (req, res) => {
    try {
        await knex('tbl_sales_details')
            .returning('id')
            .insert({
                'Invoice_Number': req.body.Invoice_Number,
                'Invoice_Date': moment(req.body.Invoice_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                'Customer_Name': req.body.Customer_Name,
                'Address': req.body.Address,
                'State': req.body.State,
                'GSTIN': req.body.GSTIN,
                'Taxable_Amount': req.body.Taxable_Amount,
                'SGST': req.body.SGST,
                'CGST': req.body.CGST,
                'IGST': req.body.IGST,
                'Total_Amount': req.body.Total_Amount,
                'Amount_Paid': req.body.Amount_Paid,
                'Balance_Amount': req.body.Balance_Amount,
                'Pay_Mode': req.body.Pay_Mode,
                'Pay_Note': req.body.Pay_Note,
                'Pay_Status': req.body.Pay_Status,
                'GST_Status': req.body.GST_Status,
                'Model': req.body.Model,
                'Serial': req.body.Serial,
                'Note': req.body.Note
            }).then((data) => {
                res.json({
                    message: "Insert Sales Details",
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

// update tbl_sales_details
exports.Update_SalesDetails = async (req, res) => {
    // console.log(req.body)
    try {
        await knex('tbl_sales_details')
            .returning('id')
            .where('Invoice_Number', req.params.Invoice_Number)
            .update({

                'Invoice_Date': req.body.Invoice_Date ? moment(req.body.Invoice_Date, 'DD-MM-YYYY').format('YYYY-MM-DD') : "",
                'Customer_Name': req.body.Customer_Name,
                'Address': req.body.Address,
                'State': req.body.State,
                'GSTIN': req.body.GSTIN,
                'Taxable_Amount': req.body.Taxable_Amount,
                'SGST': req.body.SGST,
                'CGST': req.body.CGST,
                'IGST': req.body.IGST,
                'Total_Amount': req.body.Total_Amount,
                'Amount_Paid': req.body.Amount_Paid,
                'Balance_Amount': req.body.Balance_Amount,
                'Pay_Mode': req.body.Pay_Mode,
                'Pay_Note': req.body.Pay_Note,
                'Pay_Status': req.body.Pay_Status,
                'GST_Status': req.body.GST_Status,
                'Model': req.body.Model,
                'Serial': req.body.Serial,
                'Note': req.body.Note
            })
            .then((data) => {
                res.json({
                    message: "Updated Purchase_Details",
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

// Delete tbl_sales_details
exports.Delete_SalesDetails = async (req, res) => {
    try {
        await knex('tbl_sales_details')
            .returning('id')
            .where('Invoice_Number', '=', req.params.Invoice_Number)
            .del()
            .then((data) => {
                res.json({
                    message: "Deleted Sales_Details",
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