// Import database
const knex = require('../config/db');
const moment = require('moment');

// load all StockDetail_Report
exports.load_StockDetail_Report = async (req, res) => {
    try {
        if (req.body.StartDate !== "" && req.body.EndDate !== "") {
            const data = await knex.select('*')
                .from('tbl_StockDetail_Report')
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
                message: 'Load StockDetail_Report',
                data: formattedData,
                success: true,
                error: false
            });

        } else {
            const data = await knex.select('*')
                .from('tbl_StockDetail_Report')
                 .orderBy('id', 'desc') // asc / desc  Sort by  

            const formattedData = data.map(row => ({
                ...row,
                //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
                //   .replace(/\//g, '-') // replace slashes with dashes
                Invoice_Date: moment(row.Invoice_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
            }));


            res.json({
                message: "Load StockDetail_Report",
                data: formattedData,
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
        })
    }
}


// load all StockDetail_Report
exports.load_StockDetail_ByPartNumber = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_StockDetail_Report')
            .where({
                "PartNumber": req.params.PartNumber,
            })
              .orderBy('id', 'desc') // asc / desc  Sort by  

        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            Invoice_Date: moment(row.Invoice_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Load StockDetail_Report",
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
        })
    }
}


// Insert StockDetail_Report
exports.Insert_StockDetail_Report = async (req, res) => {
    // console.log(req.body)
    try {
        await knex('tbl_StockDetail_Report')
            .insert({

                "Type": req.body.Type,
                "Invoice_Number": req.body.Invoice_Number,
                "Invoice_Date": moment(req.body.Invoice_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                "Item_Name": req.body.Item_Name,
                "PartNumber": req.body.PartNumber,
                "ModelNumber": req.body.ModelNumber,
                "Stock_Qty": req.body.Stock_Qty,
                "Transact_Qty": req.body.Transact_Qty,
                "HandStock_Qty": req.body.HandStock_Qty,
                "Remarks": req.body.Remarks

            }).then((data) => {
                res.json({
                    message: "Insert StockDetail_Report",
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

// update StockDetail_Report
exports.Update_StockDetail_Report = async (req, res) => {
    try {
        await knex('tbl_StockDetail_Report')
            .where('id', req.params.id)
            .update({

                "Type": req.body.Type,
                "Invoice_Number": req.body.Invoice_Number,
                "Invoice_Date": moment(req.body.Invoice_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                "Item_Name": req.body.Item_Name,
                "PartNumber": req.body.PartNumber,
                "ModelNumber": req.body.ModelNumber,
                "Stock_Qty": req.body.Stock_Qty,
                "Transact_Qty": req.body.Transact_Qty,
                "HandStock_Qty": req.body.HandStock_Qty,
                "Remarks": req.body.Remarks
            })
            .then((data) => {
                res.json({
                    message: "Updated StockDetail_Report",
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

// Delete StockDetail_Report
exports.Delete_StockDetail_Report = async (req, res) => {
    try {
        await knex('tbl_StockDetail_Report')

            .where('Invoice_Number', '=', req.params.Invoice_Number)
            .del()
            .then((data) => {
                res.json({
                    message: "Deleted StockDetail_Report",
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