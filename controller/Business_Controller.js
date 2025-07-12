// Import database
const knex = require('../config/db');

// get  salesUID from  tbl_sales
exports.Get_Business = async (req, res) => {
    // console.log(req)
    try {
        await knex.select('*')
            .from('tbl_Business')
            .orderBy('id', 'desc') // asc / desc  Sort by  
            .then(data => {
                res.json({
                    message: "Get BussinessDetails",
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

// update BussinessDetails
exports.Update_Business = async (req, res) => {
    try {
        await knex('tbl_Business')
            .where('id', req.params.id)
            .update({

                "Business": req.body.Business,
                "Contact": req.body.Contact,
                "Address": req.body.Address,
                "Email": req.body.Email,
                "Website": req.body.Website,
                "Mobile": req.body.Mobile,
                "Landline": req.body.Landline,

                "City": req.body.City,
                "State": req.body.State,
                "Zip": req.body.Zip,
                "Country": req.body.Country,
                "GSTIN": req.body.GSTIN,
                "MSME": req.body.MSME,
                "BankName": req.body.BankName,
                "Branch": req.body.Branch,
                "AccountNumber": req.body.AccountNumber,
                "IFSC_Code": req.body.IFSC_Code,
                "MICR_Code": req.body.MICR_Code,
                "Brand_Logo": req.body.Brand_Logo

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