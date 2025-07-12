// Import database
const knex = require('../config/db');

// load all items
exports.load_ItemMaster = async (req, res) => {
    try {
        await knex.select('Part_id', 'Item_Code', 'PartNumber', 'ModelNumber', 'Item_Name', 'Stock_Qty', 'Supplier', 'Purchase_Price', 'Sale_Price', 'Tax_Percent', 'HSN_Code')
            .from('tbl_ItemMaster')
            .orderBy('Part_id', 'desc') // asc / desc  Sort by  
            .then(data => {
                res.json({
                    message: "Load ItemMaster",
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

// get_item from itemMaster
exports.get_ItemMaster = async (req, res) => {
    // console.log(req.params.Part_id)
    try {
        await knex.select('*')
            .from('tbl_ItemMaster')
            .where('Part_id', req.params.Part_id)
            .then(data => {
                res.json({
                    message: "Get ItemMaster",
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




// Add itemMaster
exports.add_ItemMaster = async (req, res) => {
    try {
        await knex('tbl_ItemMaster')
            .insert({
                'Item_Code': req.body.Item_Code,
                'PartNumber': req.body.PartNumber,
                'ModelNumber': req.body.ModelNumber,
                'Item_Name': req.body.Item_Name,
                'Stock_Qty': req.body.Stock_Qty,
                'Supplier': req.body.Supplier,
                'Purchase_Price': req.body.Purchase_Price,
                'Sale_Price': req.body.Sale_Price,
                'Tax_Percent': req.body.Tax_Percent,
                'HSN_Code': req.body.HSN_Code,


            }, ['Part_id']
            )
            .then((data) => {
                res.json({
                    message: "Insert ItemMaster",
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

// update Data ItemMaster
exports.update_ItemMaster = async (req, res) => {
    // console.log(req.params.Part_id)
    try {
        await knex('tbl_ItemMaster')
            .where('Part_id', req.params.Part_id)
            .update({
                'Item_Code': req.body.Item_Code,
                'PartNumber': req.body.PartNumber,
                'ModelNumber': req.body.ModelNumber,
                'Item_Name': req.body.Item_Name,
                'Stock_Qty': req.body.Stock_Qty,
                'Supplier': req.body.Supplier,
                'Purchase_Price': req.body.Purchase_Price,
                'Sale_Price': req.body.Sale_Price,
                'Tax_Percent': req.body.Tax_Percent,
                'HSN_Code': req.body.HSN_Code,
            })
            .then((data) => {
                res.json({
                    message: "Updated ItemMaster",
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

// update Stock of an Item 
exports.update_StockOfItem = async (req, res) => {
    // console.log(req.params.Part_id)
    try {
        await knex('tbl_ItemMaster')
            .where('Part_id', req.params.Part_id)
            .update({


                'Stock_Qty': req.body.Stock_Qty,

            })
            .then((data) => {
                res.json({
                    message: "Updated StockOfItem",
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

// Delete ItemMaster
exports.delete_ItemMaster = async (req, res) => {
    // console.log(req.params.Part_id)
    try {
        await knex('tbl_ItemMaster')

            .where('Part_id', '=', req.params.Part_id)
            .del()
            .then((data) => {
                res.json({
                    message: "Deleted ItemMaster",
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