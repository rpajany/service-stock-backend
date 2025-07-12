// Import database
const knex = require('../config/db');
const moment = require('moment');

// load all items
exports.load_EngStock_Details = async (req, res) => {
    try {
        if (req.body.StartDate !== "" && req.body.EndDate !== "") {
        const data = await knex.select('*')
            .from('tbl_EngStock_Details')
            // .where('Issue_Date', '>=', moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
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
            message: "Load EngStock_Details",
            data: formattedData,
            success: true,
            error: false
        });
    } else {
            await knex.select('*')
                .from('tbl_EngStock_Details')
                  .orderBy('id', 'desc') // asc / desc  Sort by  

                .then(data => {
                    res.json({
                        message: 'Load EngStock_Details',
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

// get  single item from tbl_EngStock_Details
exports.Get_EngStock_DetailByid = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_EngStock_Details')
            .where('id', '=', req.params.id)

        const formattedData = data.map(row => ({
            ...row,

            Issue_Date: moment(row.Issue_Date, 'YYYY-MM-DD').format('DD-MM-YYYY'),
            created_at: moment(row.created_at, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get EngStock_DetailByid",
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

// get  single item from tbl_EngStock_Details
exports.Get_EngStock_DetailByPart_id = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_EngStock_Details')
            .where('Part_id', '=', req.params.Part_id)


        const formattedData = data.map(row => ({
            ...row,

            Issue_Date: moment(row.Issue_Date, 'YYYY-MM-DD').format('DD-MM-YYYY'),
            created_at: moment(row.created_at, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get EngStock_DetailByPart_id",
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

// get  all stock by Part_id & Eng_Name from tbl_EngStock_Details
exports.Get_EngStockDetail_ByEngName = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_EngStock_Details')
            .where('Eng_Name', '=', req.params.Eng_Name)
              .orderBy('id', 'desc') // asc / desc  Sort by  


        const formattedData = data.map(row => ({
            ...row,

            Issue_Date: moment(row.Issue_Date, 'YYYY-MM-DD').format('DD-MM-YYYY'),
            created_at: moment(row.created_at, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get EngStock_DetailByEngName",
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

// get  stock by Part_id & Eng_Name from tbl_EngStock_Details
exports.Get_Stock_ByEngName_Partid = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_EngStock_Details')
            .where('Part_id', '=', req.params.Part_id)
            .andWhere('Eng_Name', '=', req.body.Eng_Name)
            .orderBy('id', 'desc') // asc / desc  Sort by  


        const formattedData = data.map(row => ({
            ...row,

            Issue_Date: moment(row.Issue_Date, 'YYYY-MM-DD').format('DD-MM-YYYY'),
            created_at: moment(row.created_at, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get Stock_ByEngName_Partid",
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


// Insert tbl_EngStock_Details
exports.Insert_EngStockDetails = async (req, res) => {

    try {
        await knex('tbl_EngStock_Details')
            .insert({
                'Part_id': req.body.Part_id,
                'Item_Code': req.body.Item_Code,
                'Item_Name': req.body.Item_Name,
                'PartNumber': req.body.PartNumber,
                'ModelNumber': req.body.ModelNumber,
                'Issue_Qty': req.body.Issue_Qty,
                'Issue_Date': moment(req.body.Issue_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                'Eng_Name': req.body.Eng_Name

            }).then((data) => {
                res.json({
                    message: "Insert EngStock_Details",
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

// updateByid tbl_EngStock_Details
exports.updateByid = async (req, res) => {
    try {
        await knex('tbl_EngStock_Details')
            .where('id', '=', req.params.id)
            .update({

                'Part_id': req.body.Part_id,
                'Item_Code': req.body.Item_Code,
                'Item_Name': req.body.Item_Name,
                'PartNumber': req.body.PartNumber,
                'ModelNumber': req.body.ModelNumber,
                'Issue_Qty': req.body.Issue_Qty,
                'Issue_Date': moment(req.body.Issue_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                'Eng_Name': req.body.Eng_Name
            })
            .then((data) => {
                res.json({
                    message: "Updated EngStock_Byid",
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


// updateByPart_id tbl_EngStock_Details
exports.updateByPart_id = async (req, res) => {
    try {
        await knex('tbl_EngStock_Details')
            .where('Part_id', '=', req.params.Part_id)
            .update({
                'Item_Code': req.body.Item_Code,
                'Item_Name': req.body.Item_Name,
                'PartNumber': req.body.PartNumber,
                'ModelNumber': req.body.ModelNumber,
                'Issue_Qty': req.body.Issue_Qty,
                'Issue_Date': req.body.Issue_Date,
                'Eng_Name': req.body.Eng_Name
            })
            .then((data) => {
                res.json({
                    message: "Updated EngStock_ByPart_id",
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


// update stock only tbl_EngStock_Details
exports.updateStock = async (req, res) => {
    try {
        await knex('tbl_EngStock_Details')
            .where('Part_id', '=', req.params.Part_id)
            .andWhere('Eng_Name', '=', req.body.Eng_Name)
            .update({
                'Issue_Qty': req.body.Issue_Qty,
            })
            .then((data) => {
                res.json({
                    message: "update Stock in EngStock_Details",
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

// Delete tbl_EngStock_Details
exports.Delete_EngStockDetail = async (req, res) => {
    try {
        await knex('tbl_EngStock_Details')

            .where('id', '=', req.params.id)
            .del()
            .then((data) => {
                res.json({
                    message: "Deleted EngStock_Details",
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

// check part exists in  tbl_EngStock_Details
exports.CheckPart_Exists = async (req, res) => {
    // console.log(req.body)
    try {
        const data = await knex.select('*')
            .from('tbl_EngStock_Details')
            // const data = await knex('tbl_EngStock_Details')

            // .count('*') // Use .count() to get the row count
            // .count('* as count') // Use .count() to get the row count
            .where('Part_id', '=', req.body.Part_id)
            // .andWhere('Item_Name', '=', req.body.Item_Name)
            .andWhere('Eng_Name', '=', req.body.Eng_Name);


        // Extract the count value from the query result
        // const count = data[0]?.count || 0;

        const formattedData = data.map(row => ({
            ...row,

            Issue_Date: moment(row.Issue_Date, 'YYYY-MM-DD').format('DD-MM-YYYY'),
            created_at: moment(row.created_at, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get EngStock_Details_CheckPart_Exists",
            // data: { count },
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