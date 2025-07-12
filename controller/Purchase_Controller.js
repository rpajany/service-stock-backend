// Import database
const knex = require('../config/db');
const moment = require('moment');

// load all tbl_purchase
exports.load_Purchase = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_purchase')
              .orderBy('id', 'desc') // asc / desc  Sort by  

        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            Invoice_Date: moment(row.Invoice_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: 'Load Purchase',
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
exports.Get_Purchase = async (req, res) => {
    // console.log(req.params)
    try {
        const data = await knex.select('*')
            .from('tbl_purchase')
            .where('Invoice_Number', '=', req.params.Invoice_Number)

        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            Invoice_Date: moment(row.Invoice_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get Purchase_Item",
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
exports.Insert_Purchase = async (req, res) => {
    try {
        await knex('tbl_purchase').insert({
            "Part_id": req.body.Part_id,
            "Invoice_Number": req.body.Invoice_Number,
            'Invoice_Date': moment(req.body.Invoice_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            "Item_Name": req.body.Item_Name,
            "PartNumber": req.body.PartNumber,
            "Qty": req.body.Qty,
            "HSN_Code": req.body.HSN_Code,
            "Purchase_Price": req.body.Purchase_Price,
            'taxable_Amount': req.body.taxable_Amount,
            "Discount_Percent": req.body.Discount_Percent,
            "Discount_Amount": req.body.Discount_Amount,
            "Tax_Percent": req.body.Tax_Percent,
            "Tax_Amount": req.body.Tax_Amount,
            "Total": req.body.Total,
        }).then((data) => {
            res.json({
                message: "Insert Purchase",
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

// update tbl_purchase
exports.Update_Purchase = async (req, res) => {
    try {
        await knex('tbl_purchase')
            .where('Invoice_Number', req.params.Invoice_Number)
            .update({
                "Part_id": req.body.Part_id,
                'Invoice_Date': moment(req.body.Invoice_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                "Item_Name": req.body.Item_Name,
                "PartNumber": req.body.PartNumber,
                "Qty": req.body.Qty,
                "HSN_Code": req.body.HSN_Code,
                "Purchase_Price": req.body.Purchase_Price,
                'taxable_Amount': req.body.taxable_Amount,
                "Discount_Percent": req.body.Discount_Percent,
                "Discount_Amount": req.body.Discount_Amount,
                "Tax_Percent": req.body.Tax_Percent,
                "Tax_Amount": req.body.Tax_Amount,
                "Total": req.body.Total,
            }).then((data) => {
                res.json({
                    message: "Update Purchase",
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

// Delete tbl_purchase
exports.Delete_Purchase = async (req, res) => {
    try {
        await knex('tbl_purchase')
            .where('Invoice_Number', '=', req.params.Invoice_Number)
            .del().then((data) => {
                res.json({
                    message: "Deleted Purchase",
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
