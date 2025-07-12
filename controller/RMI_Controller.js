// Import database
const knex = require('../config/db');
const moment = require('moment');

// load all items
exports.load_RMI = async (req, res) =>{
    try {
        if (req.body.StartDate !== "" && req.body.EndDate !== "") {
        const data = await knex.select('*')
        .from('tbl_EngStock_RMI')
        // .where('RMI_Date', '>=', moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
        // .andWhere('RMI_Date', '<=', moment(req.body.EndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
         .where('RMI_Date', '>=', moment(req.body.StartDate + '00:00:00', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
            .andWhere('RMI_Date', '<=', moment(req.body.EndDate + '23:59:59', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
          .orderBy('id', 'desc') // asc / desc  Sort by  


        const formattedData = data.map((row)=> ({
            ...row,
            RMI_Date:moment(row.RMI_Date,'YYYY-MM-DD').format('DD-MM-YYYY'),
            created_at: moment(row.created_at, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: 'Load RMI',
            data:formattedData,
            success:true,
            error:false
        });
    }

    } catch (err) {
         // Send a error message in response
         res.status(400).json({
            message: err.message || err,
            error:true,
            success:false
         })
    }
}

// get  single item Byid from tbl_EngStock_RMI
exports.Get_RMIByid = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_EngStock_RMI')
            .where('id', '=', req.params.id)

        const formattedData = data.map(row => ({
            ...row,
       
            RMI_Date: moment(row.RMI_Date, 'YYYY-MM-DD').format('DD-MM-YYYY'),
            created_at: moment(row.created_at, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get RMIByid",
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


// get  single item ByPart_id  from tbl_EngStock_RMI
exports.Get_RMIByPart_id = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_EngStock_RMI')
            .where('Part_id', '=', req.params.Part_id)

        const formattedData = data.map(row => ({
            ...row,
     
            RMI_Date: moment(row.RMI_Date, 'YYYY-MM-DD').format('DD-MM-YYYY'),
            created_at: moment(row.Invoice_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get RMIByPart_id",
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

// Insert tbl_EngStock_RMI
exports.Insert_RMI = async (req, res) => {

    try {
        await knex('tbl_EngStock_RMI')
            .insert({
                'Part_id': req.body.Part_id,             
                'PartNumber': req.body.PartNumber,
                'ModelNumber': req.body.ModelNumber,
                'Item_Name': req.body.Item_Name,
                'RMI_Qty': req.body.RMI_Qty,
                'RMI_No': req.body.RMI_No,
                'RMI_Date': moment(req.body.RMI_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                'Eng_Name': req.body.Eng_Name            

            }).then((data) => {
                res.json({
                    message: "Insert RMI",
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

// updateByid tbl_EngStock_RMI
exports.updateByid = async (req, res) => {
    try {
        await knex('tbl_EngStock_RMI')
            .where('id', '=', req.params.id)
            .update({

                'Part_id': req.body.Part_id,             
                'PartNumber': req.body.PartNumber,
                'ModelNumber': req.body.ModelNumber,
                'Item_Name': req.body.Item_Name,
                'RMI_Qty': req.body.RMI_Qty,
                'RMI_No': req.body.RMI_No,
                'RMI_Date': moment(req.body.RMI_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                'Eng_Name': req.body.Eng_Name            
               
            })
            .then((data) => {
                res.json({
                    message: "Updated RMI Byid",
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

// updateByPart_id tbl_EngStock_RMI
exports.updateByPart_id = async (req, res) => {
    try {
        await knex('tbl_EngStock_RMI')
            .where('Part_id', '=', req.params.Part_id)
            .update({

                'Part_id': req.body.Part_id,             
                'PartNumber': req.body.PartNumber,
                'ModelNumber': req.body.ModelNumber,
                'Item_Name': req.body.Item_Name,
                'RMI_Qty': req.body.RMI_Qty,
                'RMI_No': req.body.RMI_No,
                'RMI_Date': moment(req.body.RMI_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                'Eng_Name': req.body.Eng_Name            
                
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

// Delete tbl_EngStock_RMI
exports.Delete_RMI = async (req, res) => {
    try {
        await knex('tbl_EngStock_RMI')

            .where('id', '=', req.params.id)
            .del()
            .then((data) => {
                res.json({
                    message: "Deleted RMI",
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