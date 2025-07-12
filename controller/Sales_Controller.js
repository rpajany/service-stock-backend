// Import database
const knex = require('../config/db');
const moment = require('moment');

// load all tbl_sales
exports.load_Sales = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_sales')
              .orderBy('id', 'desc') // asc / desc  Sort by  

        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            Invoice_Date: moment(row.Invoice_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: 'Load Sales Items',
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

// get  single item from tbl_sales
exports.Get_Sales = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_sales')
            .where('Invoice_Number', '=', req.params.Invoice_Number)
        
        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            Invoice_Date: moment(row.Invoice_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));


        res.json({
            message: "Get SalesItem",
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



// Add/Insert tbl_purchase
exports.Insert_Sales = async (req, res) => {
    // console.log(req.body)
    try {
        await knex('tbl_sales')
            .returning('id')
            .insert({
                "Part_id": req.body.Part_id,
                "Invoice_Number": req.body.Invoice_Number,
                "Invoice_Date": moment(req.body.Invoice_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                "Item_Name": req.body.Item_Name,
                "PartNumber": req.body.PartNumber,
                "Qty": req.body.Qty,
                "HSN_Code": req.body.HSN_Code,
                "Sale_Price": req.body.Sale_Price,
                'taxable_Amount': req.body.taxable_Amount,
                "Discount_Percent": req.body.Discount_Percent,
                "Discount_Amount": req.body.Discount_Amount,
                "Tax_Percent": req.body.Tax_Percent,
                "Tax_Amount": req.body.Tax_Amount,
                "Total": req.body.Total
            }).then((data) => {
                console.log('data:', data)
                res.json({

                    message: "Insert sales Item",
                    data: data,
                    success: true,
                    error: false
                });
            });
    } catch (err) {
        // Send a error message in response
        console.log('error:', err.message || err)
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}






// update tbl_sales
exports.Update_Sales = async (req, res) => {
    try {
        await knex('tbl_sales')
            .where('Invoice_Number', req.params.Invoice_Number)
            .update({
                "Part_id": req.body.Part_id,
                "Invoice_Date": moment(req.body.Invoice_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                "Item_Name": req.body.Item_Name,
                "PartNumber": req.body.PartNumber,
                "Qty": req.body.Qty,
                "HSN_Code": req.body.HSN_Code,
                "Sale_Price": req.body.Sale_Price,
                'taxable_Amount': req.body.taxable_Amount,
                "Discount_Percent": req.body.Discount_Percent,
                "Discount_Amount": req.body.Discount_Amount,
                "Tax_Percent": req.body.Tax_Percent,
                "Tax_Amount": req.body.Tax_Amount,
                "Total": req.body.Total,
            }).then((data) => {
                res.json({
                    message: "Update Sales item",
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


// Delete tbl_sales
exports.Delete_Sales = async (req, res) => {
    try {
        await knex('tbl_sales')
            .where('Invoice_Number', '=', req.params.Invoice_Number)
            .del().then((data) => {
                res.json({
                    message: "Deleted Sales Item",
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
