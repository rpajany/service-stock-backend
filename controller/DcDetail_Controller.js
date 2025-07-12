// Import database
const knex = require('../config/db');
const moment = require('moment');

// load all tbl_DC_Details
exports.load_DC_Details = async (req, res) => {
    try {
        if (req.body.StartDate !== "" && req.body.EndDate !== "") {
            const data = await knex.select('*')
                .from('tbl_DC_Details')
                // .where('Date', '>=', moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
                // .andWhere('Date', '<=', moment(req.body.EndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
                .where('Date', '>=', moment(req.body.StartDate + '00:00:00', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
                .andWhere('Date', '<=', moment(req.body.EndDate + '23:59:59', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))

                .orderBy('id', 'desc') // asc / desc  Sort by  

            const formattedData = data.map(row => ({
                ...row,
                //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
                //   .replace(/\//g, '-') // replace slashes with dashes
                Date: moment(row.Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
            }));

            res.json({
                message: 'Load DC_Details',
                data: formattedData,
                success: true,
                error: false
            });

        } else {
            await knex.select('*').from('tbl_DC_Details').then(data => {
                res.json({
                    message: 'Load DC_Details',
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

// get  single item from tbl_DC_Details
exports.Get_DC_Detail = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_DC_Details')
            .where('DC_Number', '=', req.params.DC_Number)

        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            Date: moment(row.Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get DC_Details",
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

// Add/Insert tbl_DC_Details
exports.Insert_DC_Detail = async (req, res) => {
    try {
        await knex('tbl_DC_Details')
            .insert({
                'DC_Number': req.body.DC_Number,
                'Date': moment(req.body.Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                'Company': req.body.Company,
                'Address': req.body.Address,
                'GSTIN': req.body.GSTIN,
                'Contact': req.body.Contact,


                'Total': req.body.Total,
                'Status': req.body.Status,
                'Type': req.body.Type,
                'Reference': req.body.Reference,
                'Delivery_Mode': req.body.Delivery_Mode,
                'DC_Remarks': req.body.DC_Remarks

            }).then((data) => {
                res.json({
                    message: "Insert DC_Details",
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

// update tbl_DC_Details
exports.Update_DC_Detail = async (req, res) => {
    try {
        await knex('tbl_DC_Details')
            .where('DC_Number', req.params.DC_Number)
            .update({

                'Date': moment(req.body.Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                'Company': req.body.Company,
                'Address': req.body.Address,
                'GSTIN': req.body.GSTIN,
                'Contact': req.body.Contact,


                'Total': req.body.Total,
                'Status': req.body.Status,
                'Type': req.body.Type,
                'Reference': req.body.Reference,
                'Delivery_Mode': req.body.Delivery_Mode,
                'DC_Remarks': req.body.DC_Remarks
            })
            .then((data) => {
                res.json({
                    message: "Updated DC_Details",
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


// update Status tbl_DC_Details
exports.Update_DC_Status_Detail = async (req, res) => {
    try {
        await knex('tbl_DC_Details')
            .where('DC_Number', req.params.DC_Number)
            .update({


                'Status': req.body.Status,

            })
            .then((data) => {
                res.json({
                    message: "Updated Status in DC_Details success",
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


// Delete tbl_DC_Details
exports.Delete_DC_Detail = async (req, res) => {
    try {
        await knex('tbl_DC_Details')

            .where('DC_Number', '=', req.params.DC_Number)
            .del()
            .then((data) => {
                res.json({
                    message: "Deleted DC_Details",
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