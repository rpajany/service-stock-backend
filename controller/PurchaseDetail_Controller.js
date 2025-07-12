// Import database
const knex = require('../config/db');
const moment = require('moment');

// load all tbl_purchase_details
exports.load_PurchaseDetails = async (req, res) => {
    // console.log(moment(req.body.StartDate).format('YYYY-MM-DD'))
    try {
        let data;

        if (req.body.StartDate && req.body.EndDate) {
            // Format dates properly
            const startDate = moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
            const endDate = moment(req.body.EndDate, 'DD-MM-YYYY').format('YYYY-MM-DD');

            //  data = await knex.select('*')
            //     .from('tbl_purchase_details')
            //     .where('Invoice_Date', '>=', moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
            //     .andWhere('Invoice_Date', '<=', moment(req.body.EndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
            // // .where('Invoice_Date', '>=', moment(req.body.StartDate + '00:00:00', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
            // // .andWhere('Invoice_Date', '<=', moment(req.body.EndDate + '23:59:59', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))

            // // .orderBy('id', 'desc') // asc / desc  Sort by  

            // const formattedData = data.map(row => ({
            //     ...row,
            //     //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //     //   .replace(/\//g, '-') // replace slashes with dashes
            //     Invoice_Date: moment(row.Invoice_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
            // }));


           

             data = await knex('tbl_purchase_details')
                .select('*')
                .whereBetween('Invoice_Date', [startDate, endDate]); // ✅ Correct date comparison

        } else {
            // If no dates provided, return all records
            data = await knex('tbl_purchase_details').select('*');
        }


        // Format Invoice_Date properly
        const formattedData = data.map(row => ({
            ...row,
            Invoice_Date: moment(row.Invoice_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: 'Load Purchase Details',
            data: formattedData,
            success: true,
            error: false
        });

    } catch (err) {
        // Send a error message in response
        res.status(400).json({
            message: err.message || err,
            data: null,
            error: true,
            success: false
        });
    }
}


// get  single item from tbl_purchase_details
exports.Get_PurchaseDetail = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_purchase_details')
            .where('Invoice_Number', '=', req.params.Invoice_Number)

        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            Invoice_Date: moment(row.Invoice_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get purchase_details",
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


// get  Total_Purchase from tbl_sales_details
exports.Get_TotalPurchase = async (req, res) => {
    // console.log(req.params)
    try {
        const data = await knex('tbl_purchase_details')
            .sum('Total_Amount as Total')
            .sum('Amount_Paid as Paid')
            .sum('Balance_Amount as Balance')

            // .where('Invoice_Date', '>=', moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
            // .andWhere('Invoice_Date', '<=', moment(req.body.EndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
            .where('Invoice_Date', '>=', moment(req.body.StartDate + '00:00:00', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
            .andWhere('Invoice_Date', '<=', moment(req.body.EndDate + '23:59:59', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))


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
        // Generate all months (01 to 12) dynamically
        //     const result = await knex('tbl_purchase_details')
        //   .select(
        //     knex.raw("strftime('%Y', Invoice_Date) as year"), // Extract year
        //     knex.raw("strftime('%m', Invoice_Date) as month"), // Extract month

        //     knex.raw("SUM(Total_Amount) as total_purchases") // Sum Total_Amount

        //   )
        //   .whereRaw("strftime('%Y', Invoice_Date) = ?", [req.params.Year]) // Filter by year
        //   .groupBy('year', 'month') // Group by year and month
        //   .orderBy('month', 'asc'); // Sort by month


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
          COALESCE(SUM(t.Total_Amount), 0) as total_amount
        FROM months m
        LEFT JOIN tbl_purchase_details t 
          ON strftime('%Y', t.Invoice_Date) = '${req.params.Year}' 
          AND strftime('%m', t.Invoice_Date) = m.month
        GROUP BY m.month
        ORDER BY m.month
        `
            );

        // Extract total_amount into an array and round to 2 decimal places
        const totalAmounts = result.map(row =>
            parseFloat(row.total_amount.toFixed(2)) // Round to 2 decimals
        );

        // console.log(result);
        // return result; // Example: [{ year: '2024', month: '01', total_sales: 500, ... }]

        res.json({
            message: "Get Purchase_MonthWiseData",
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

// Add/Insert tbl_purchase_details
exports.Insert_PurchaseDetails = async (req, res) => {
    // console.log(moment(req.body.Invoice_Date).format('YYYY-MM-DD'))

    try {
        await knex('tbl_purchase_details')
            .insert({
                'Invoice_Number': req.body.Invoice_Number,
                'Invoice_Date': moment(req.body.Invoice_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                'Supplier': req.body.Supplier,
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
                'Pay_Note': req.body.Pay_Note
            }).then((data) => {
                res.json({
                    message: "Insert purchase_details",
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

// update tbl_purchase_details
exports.Update_PurchaseDetails = async (req, res) => {
    try {
        await knex('tbl_purchase_details')
            .where('Invoice_Number', req.params.Invoice_Number)
            .update({

                'Invoice_Date': moment(req.body.Invoice_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                'Supplier': req.body.Supplier,
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
                'Pay_Note': req.body.Pay_Note
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

// Delete tbl_purchase_details
exports.Delete_PurchaseDetails = async (req, res) => {
    try {
        await knex('tbl_purchase_details')

            .where('Invoice_Number', '=', req.params.Invoice_Number)
            .del()
            .then((data) => {
                res.json({
                    message: "Deleted Purchase_Details",
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