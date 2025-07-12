// Import database
const knex = require('../config/db');
const moment = require('moment');

// load all items
exports.load_EngStock = async (req, res) => {
    try {
        if (req.body.StartDate !== "" && req.body.EndDate !== "") {
            const data = await knex.select('*')
                .from('tbl_EngStock')
                //  .where('Issue_Date', '>=', moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
                // .andWhere('Issue_Date', '<=', moment(req.body.EndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
                .where('Issue_Date', '>=', moment(req.body.StartDate + '00:00:00', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
                .andWhere('Issue_Date', '<=', moment(req.body.EndDate + '23:59:59', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
                .orderBy('id', 'desc') // asc / desc  Sort by  

            const formattedData = data.map(row => ({
                ...row,
                //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
                //   .replace(/\//g, '-') // replace slashes with dashes
                Issue_Date: moment(row.Issue_Date, 'YYYY-MM-DD').format('DD-MM-YYYY'),
                created_at: moment(row.created_at, 'YYYY-MM-DD').format('DD-MM-YYYY')
            }));

            res.json({
                message: "Load EngStock",
                data: formattedData,
                success: true,
                error: false
            });

        } else {
            await knex.select('*')
                .from('tbl_EngStock').then(data => {
                    res.json({
                        message: 'Load EngStock',
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
        })
    }
}

// get  single item from tbl_EngStock
exports.Get_EngStockByid = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_EngStock')
            .where('id', '=', req.params.id)
            .orderBy('id', 'desc') // asc / desc  Sort by  

        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            Issue_Date: moment(row.Issue_Date, 'YYYY-MM-DD').format('DD-MM-YYYY'),
            created_at: moment(row.created_at, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get EngStockByid",
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


// get  single item from tbl_EngStock
exports.Get_EngStockByPart_id = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_EngStock')
            .where('Part_id', '=', req.params.Part_id)
            .orderBy('id', 'desc') // asc / desc  Sort by  

        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            Issue_Date: moment(row.Issue_Date, 'YYYY-MM-DD').format('DD-MM-YYYY'),
            created_at: moment(row.created_at, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get EngStockByPart_id",
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

// Add/Insert tbl_EngStock
exports.Insert_EngStock = async (req, res) => {

    try {
        await knex('tbl_EngStock')
            .insert({
                'Part_id': req.body.Part_id,
                'Item_Code': req.body.Item_Code,
                'PartNumber': req.body.PartNumber,
                'ModelNumber': req.body.ModelNumber,
                'Item_Name': req.body.Item_Name,
                'Issue_Qty': req.body.Issue_Qty,
                'Issue_Date': moment(req.body.Issue_Date, 'DD-MM-YYYY').format('YYYY-MM-DD')


            }).then((data) => {
                res.json({
                    message: "Insert EngStock",
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

// updateByid tbl_EngStock
exports.updateByid = async (req, res) => {
    try {
        await knex('tbl_EngStock')
            .where('id', '=', req.params.id)
            .update({

                'Part_id': req.body.Part_id,
                'Item_Code': req.body.Item_Code,
                'PartNumber': req.body.PartNumber,
                'ModelNumber': req.body.ModelNumber,
                'Item_Name': req.body.Item_Name,
                'Issue_Qty': req.body.Issue_Qty,
                'Issue_Date': moment(req.body.Invoice_Date, 'DD-MM-YYYY').format('YYYY-MM-DD')

            })
            .then((data) => {
                res.json({
                    message: "Updated EngStock",
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


// updateByPart_id tbl_EngStock
exports.updateByPart_id = async (req, res) => {
    try {
        await knex('tbl_EngStock')
            .where('Part_id', '=', req.params.Part_id)
            .update({

                'Item_Code': req.body.Item_Code,
                'PartNumber': req.body.PartNumber,
                'ModelNumber': req.body.ModelNumber,
                'Item_Name': req.body.Item_Name,
                'Issue_Qty': req.body.Issue_Qty,
                'Issue_Date': moment(req.body.Issue_Date, 'DD-MM-YYYY').format('YYYY-MM-DD')

            })
            .then((data) => {
                res.json({
                    message: "Updated ByPart_id",
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

// update stock only tbl_EngStock
exports.updateStock = async (req, res) => {
    try {
        await knex('tbl_EngStock')
            .where('Part_id', '=', req.params.Part_id)
            .update({

                'Issue_Qty': req.body.Issue_Qty,

            })
            .then((data) => {
                res.json({
                    message: "Updated Stock in EngStock",
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

// Delete tbl_EngStock
exports.Delete_EngStock = async (req, res) => {
    try {
        await knex('tbl_EngStock')

            .where('id', '=', req.params.id)
            .del()
            .then((data) => {
                res.json({
                    message: "Deleted EngStock",
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


// check part exists in  tbl_EngStock
exports.CheckPart_Exists = async (req, res) => {
    // console.log(req.body)
    try {
        const data = await knex('tbl_EngStock')
            // .count('*') // Use .count() to get the row count
            .count('* as count') // Use .count() to get the row count
            .where('Part_id', '=', req.body.Part_id)
            .andWhere('Item_Name', '=', req.body.Item_Name);

        // Extract the count value from the query result
        const count = data[0]?.count || 0;

        res.json({
            message: "Get CheckPart_Exists",
            data: { count },
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