// Import database
const knex = require('../config/db');
const moment = require('moment');

// load all tbl_Customer
exports.load_Service = async (req, res) => {
    // console.log(req.body)
    try {
        // if (req.body.StartDate !== "" && req.body.EndDate !== "") {
        const combinedData = await knex('tbl_Customer')
            .join('tbl_Service', 'tbl_Service.Cust_id', '=', 'tbl_Customer.Cust_id') // Join Users with Orders
            .select(
                'tbl_Customer.Cust_id',
                'tbl_Customer.Customer_Name',
                'tbl_Customer.Address',
                'tbl_Customer.Mobile',
                'tbl_Service.Serv_id',
                'tbl_Service.Job_No',
                'tbl_Service.Serial_No',
                'tbl_Service.Product_Type',
                'tbl_Service.Brand',
                'tbl_Service.Model_Name',
                'tbl_Service.Model_Number',
                'tbl_Service.Status',
                'tbl_Service.Move_To',
                'tbl_Service.created_at'

                // 'tbl_Customer.*', // All columns from tbl_Customer
                // 'tbl_Service.*'   // All columns from tbl_Service

            ) // Select desired columns

            // .where('tbl_Service.created_at', '>=', moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
            // .andWhere('tbl_Service.created_at', '<=', moment(req.body.EndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
            .where('tbl_Service.created_at', '>=', moment(req.body.StartDate + '00:00:00', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
            .andWhere('tbl_Service.created_at', '<=', moment(req.body.EndDate + '23:59:59', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
            .orderBy('tbl_Service.Serv_id', 'desc') // asc / desc  Sort by  

            // .andWhere('tbl_Service.Move_To', '=', req.body.Move_To === 'All' ? '' : req.body.Move_To)

            .modify((queryBuilder) => {
                if (req.body.Move_To !== 'All') {
                    queryBuilder.andWhere('tbl_Service.Move_To', '=', req.body.Move_To);
                }
            })

        //.debug(); // Enable query logging

        const formattedData = combinedData.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            created_at: moment(row.created_at, 'YYYY-MM-DD HH:mm:ss', true).format('DD-MM-YYYY HH:mm:ss')
        }));

        res.json({
            message: 'Load Service Data',
            data: formattedData,
            success: true,
            error: false
        });
        // }

    } catch (err) {
        // Log and send the error response
        console.error('Error loading service data:', err); // Log error for debugging

        res.status(400).json({
            message: err.message || 'An error occurred while loading services.',
            error: true,
            success: false
        });
    }
}


// load ByEngineer  tbl_Customer
exports.load_ServiceByEngineer = async (req, res) => {
    try {
        // if (req.body.StartDate !== "" && req.body.EndDate !== "") {
        const combinedData = await knex('tbl_Customer')
            .join('tbl_Service', 'tbl_Service.Cust_id', '=', 'tbl_Customer.Cust_id') // Join Users with Orders
            .select(
                'tbl_Customer.Cust_id',
                'tbl_Customer.Customer_Name',
                'tbl_Customer.Address',
                'tbl_Customer.Mobile',
                'tbl_Service.Serv_id',
                'tbl_Service.Job_No',
                'tbl_Service.Serial_No',
                'tbl_Service.Product_Type',
                'tbl_Service.Brand',
                'tbl_Service.Model_Name',
                'tbl_Service.Model_Number',
                'tbl_Service.Status',
                'tbl_Service.Move_To',
                'tbl_Service.created_at'

                // 'tbl_Customer.*', // All columns from tbl_Customer
                // 'tbl_Service.*'   // All columns from tbl_Service

            ) // Select desired columns
            // .where('tbl_Service.created_at', '>=', moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
            // .andWhere('tbl_Service.created_at', '<=', moment(req.body.EndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
            .where('tbl_Service.created_at', '>=', moment(req.body.StartDate + '00:00:00', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
            .andWhere('tbl_Service.created_at', '<=', moment(req.body.EndDate + '23:59:59', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))

            .andWhere('tbl_Service.Assign_Engineer', '=', req.body.Assign_Engineer)

            .orderBy('tbl_Service.Serv_id', 'desc') // asc / desc  Sort by  

            // .andWhere('tbl_Service.Move_To', '=', req.body.Move_To === 'All' ? null : req.body.Move_To)
            .modify((queryBuilder) => {
                if (req.body.Move_To !== 'All') {
                    queryBuilder.andWhere('tbl_Service.Move_To', '=', req.body.Move_To);
                }
            })

        //.debug(); // Enable query logging

        const formattedData = combinedData.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            created_at: moment(row.created_at, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: 'Load Service Data',
            data: formattedData,
            success: true,
            error: false
        });
        // }

    } catch (err) {
        // Log and send the error response
        console.error('Error loading service data:', err); // Log error for debugging

        res.status(400).json({
            message: err.message || 'An error occurred while loading services.',
            error: true,
            success: false
        });
    }
}




// load all tbl_User
exports.load_Engineer = async (req, res) => {
    try {
        const data = await knex.select('username')
            .from('tbl_User')
            .where('role', '=', 'Engineer');

        res.json({
            message: 'Load Engineer',
            data: data,
            success: true,
            error: false
        });
    } catch (err) {
        // Log and send the error response
        console.error('Error loading Engineer data:', err); // Log error for debugging

        res.status(400).json({
            message: err.message || 'Error while loading Engineer Data.',
            error: true,
            success: false
        });
    }
}

// get  single item from tbl_Service
exports.Get_Service = async (req, res) => {
    try {
        const data = await knex.select('*')
            .from('tbl_Service')
            .where('Serv_id', '=', req.params.Serv_id)

        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            created_at: moment(row.created_at, 'YYYY-MM-DD hh:mm:ss a').format('DD-MM-YYYY hh:mm:ss a')
        }));

        res.json({
            message: "Get Service by Serv_id",
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


// get Devices from tbl_Service
exports.Get_Devices = async (req, res) => {
    try {
        const data = await knex.select('Product_Type', 'Brand', 'Model_Name', 'Model_Number', 'Serial_No')
            .from('tbl_Service')
            .where('Cust_id', '=', req.params.Cust_id)

        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            created_at: moment(row.created_at, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get Devices by Cust_id",
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


// Add/Insert tbl_Service
exports.Insert_Service = async (req, res) => {
    try {
        await knex('tbl_Service')
            .returning('Serv_id')
            .insert({

                "Cust_id": req.body.Cust_id,
                "Job_No": req.body.Job_No,
                "Service_Type": req.body.Service_Type,
                "Product_Type": req.body.Product_Type,
                "Brand": req.body.Brand,
                "Model_Name": req.body.Model_Name,
                "Model_Number": req.body.Model_Number,
                "Product_Colour": req.body.Product_Colour,
                "Configuration": req.body.Configuration,
                "Password": req.body.Password,
                "Serial_No": req.body.Serial_No,
                "Status": req.body.Status,
                "Problem_Reported": req.body.Problem_Reported,
                "Condition": req.body.Condition,
                "Estimate": req.body.Estimate,
                "Advance": req.body.Advance,
                "Delivery_Date": req.body.Delivery_Date,
                "Remarks": req.body.Remarks,
                "Assign_Engineer": req.body.Assign_Engineer,
                "Initial_CheckDate": req.body.Initial_CheckDate,
                "Revised_Estimate": req.body.Revised_Estimate,
                "Problem_Dignosed": req.body.Problem_Dignosed,
                "Move_To": req.body.Move_To,
                "Service_Date": req.body.Service_Date,
                "Bill_Type": req.body.Bill_Type,
                "Total_Pages": req.body.Total_Pages,
                "Service_Charge": req.body.Service_Charge,
                "Engineer_Remarks": req.body.Engineer_Remarks,
                "Customer_Remarks": req.body.Customer_Remarks
            }).then((data) => {
                res.json({
                    message: "Insert Service",
                    data: data,
                    success: true,
                    error: false
                });
            });

    } catch (err) {
        // Log and send the error response
        console.error('Error Insert Service data:', err); // Log error for debugging

        res.status(400).json({
            message: err.message || 'Error Insert Services Data.!',
            error: true,
            success: false
        });
    }
}

// update tbl_Service
exports.Update_Service = async (req, res) => {
    // console.log(req.params)
    try {
        const data = await knex('tbl_Service')
            .where('Serv_id', '=', req.params.Serv_id)
            .update({
                // "Cust_id": req.body.Cust_id,
                // "Job_No": req.body.Job_No,
                "Service_Type": req.body.Service_Type,
                "Product_Type": req.body.Product_Type,
                "Brand": req.body.Brand,
                "Model_Name": req.body.Model_Name,
                "Model_Number": req.body.Model_Number,
                "Product_Colour": req.body.Product_Colour,
                "Configuration": req.body.Configuration,
                "Password": req.body.Password,
                "Serial_No": req.body.Serial_No,
                "Status": req.body.Status,
                "Problem_Reported": req.body.Problem_Reported,
                "Condition": req.body.Condition,
                "Estimate": req.body.Estimate,
                "Advance": req.body.Advance,
                "Delivery_Date": req.body.Delivery_Date,
                "Remarks": req.body.Remarks,
                "Assign_Engineer": req.body.Assign_Engineer,
                "Initial_CheckDate": req.body.Initial_CheckDate,
                "Revised_Estimate": req.body.Revised_Estimate,
                "Problem_Dignosed": req.body.Problem_Dignosed,
                "Move_To": req.body.Move_To,
                "Service_Date": req.body.Service_Date,
                "Bill_Type": req.body.Bill_Type,
                "Total_Pages": req.body.Total_Pages,
                "Service_Charge": req.body.Service_Charge,
                "Engineer_Remarks": req.body.Engineer_Remarks,
                "Customer_Remarks": req.body.Customer_Remarks
            });

        res.json({
            message: "Update Service Successful",
            data: data,
            success: true,
            error: false
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

// Delete tbl_Service
exports.Delete_Service = async (req, res) => {
    try {
        await knex('tbl_Service')

            .where('Serv_id', '=', req.params.Serv_id)
            .del()
            .then((data) => {
                res.json({
                    message: "Deleted Service by Serv_id",
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