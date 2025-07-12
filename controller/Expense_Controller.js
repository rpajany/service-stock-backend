// Import database
const knex = require('../config/db');
const moment = require('moment');

// load all tbl_Expense
exports.load_Expense = async (req, res) => {
    // console.log(req.body)

    try {

        if (req.body.StartDate !== "" && req.body.EndDate !== "") {
            const data = await knex.select('*')
                .from('tbl_Expense')
                // .where('Expense_Date', '>=', moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
                // .andWhere('Expense_Date', '<=', moment(req.body.EndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
              .where('Expense_Date', '>=', moment(req.body.StartDate + '00:00:00', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
             .andWhere('Expense_Date', '<=', moment(req.body.EndDate + '23:59:59', 'DD-MM-YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'))
                .orderBy('id', 'desc') // asc / desc  Sort by  

            const formattedData = data.map(row => ({
                ...row,
                //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
                //   .replace(/\//g, '-') // replace slashes with dashes
                Expense_Date: moment(row.Expense_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
            }));

            res.json({
                message: 'Load Date Expense',
                data: formattedData,
                success: true,
                error: false
            });

        } else {
            await knex.select('*')
                .from('tbl_Expense')
                .orderBy('id', 'desc') // asc / desc  Sort by  
                .then(data => {
                    res.json({
                        message: 'Load Expense',
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

// get  single item from tbl_Expense
exports.Get_Expense = async (req, res) => {
    // console.log(req.params)
    try {
        const data = await knex.select('*')
            .from('tbl_Expense')
            .where('id', '=', req.params.id)

        const formattedData = data.map(row => ({
            ...row,
            //Invoice_Date: new Date(row.Invoice_Date).toLocaleDateString('en-GB') // 'dd/mm/yyyy'
            //   .replace(/\//g, '-') // replace slashes with dashes
            Expense_Date: moment(row.Expense_Date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        }));

        res.json({
            message: "Get Expense Item",
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


// get  Total Expense from tbl_Expense
exports.Get_TotalExpense = async (req, res) => {
    // console.log(req.params)
    try {
        const data = await knex('tbl_Expense')
            .sum('Amount as total')

            .where('Expense_Date', '>=', moment(req.body.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
            .andWhere('Expense_Date', '<=', moment(req.body.EndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))



        res.json({
            message: "Get TotalExpense",
            data: data,
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

// get Month wise Data
exports.Get_MonthWiseData = async (req, res) => {
    // console.log(req.params)
    try {
   

    const result = await knex
      .raw(
        `
        WITH months AS (
          SELECT '01' as month
          UNION ALL SELECT '02'
          UNION ALL SELECT '03'
          UNION ALL SELECT '04'
          UNION ALL SELECT '05'
          UNION ALL SELECT '06'
          UNION ALL SELECT '07'
          UNION ALL SELECT '08'
          UNION ALL SELECT '09'
          UNION ALL SELECT '10'
          UNION ALL SELECT '11'
          UNION ALL SELECT '12'
        )
        SELECT 
          '${req.params.Year}' as year,
          m.month,
          COALESCE(SUM(t.Amount), 0) as amount
        FROM months m
        LEFT JOIN tbl_Expense t 
          ON strftime('%Y', t.Expense_Date) = '${req.params.Year}' 
          AND strftime('%m', t.Expense_Date) = m.month
        GROUP BY m.month
        ORDER BY m.month
        `
      );

     // Extract total_amount into an array and round to 2 decimal places
    const totalAmounts = result.map(row => 
      parseFloat(row.amount.toFixed(2)) // Round to 2 decimals
    );

    // console.log(result);
    // return result; // Example: [{ year: '2024', month: '01', total_sales: 500, ... }]

 res.json({
            message: "Get Purchase_MonthWiseData",
            data: totalAmounts,
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





// Add/Insert tbl_Expense
exports.Insert_Expense = async (req, res) => {
    try {
        await knex('tbl_Expense').insert({
            "Expense": req.body.Expense,
            "Qty": req.body.Qty,
            "Rate": req.body.Rate,
            "Amount": req.body.Amount,
            "Category": req.body.Category,
            "Expense_Date": moment(req.body.Expense_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            "Mode": req.body.Mode,
            "Note": req.body.Note,
            'EnterBy': req.body.EnterBy

        }).then((data) => {
            res.json({
                message: "Insert Expense",
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

// update tbl_Expense
exports.Update_Expense = async (req, res) => {
    try {
        await knex('tbl_Expense')
            .where('id', req.params.id)
            .update({
                "Expense": req.body.Expense,
                "Qty": req.body.Qty,
                "Rate": req.body.Rate,
                "Amount": req.body.Amount,
                "Category": req.body.Category,
                "Expense_Date": moment(req.body.Expense_Date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                "Mode": req.body.Mode,
                "Note": req.body.Note,
                'EnterBy': req.body.EnterBy
            }).then((data) => {
                res.json({
                    message: "Update Expense",
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


// Delete tbl_Expense
exports.Delete_Expense = async (req, res) => {
    try {
        await knex('tbl_Expense')
            .where('id', '=', req.params.id)
            .del().then((data) => {
                res.json({
                    message: "Deleted Expense",
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
