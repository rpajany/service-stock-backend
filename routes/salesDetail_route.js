const express = require('express');
const router = express.Router();

const { load_SalesDetails, Get_TotalSales, Get_SalesDetail, Get_MonthWiseData, Insert_SalesDetails, Update_SalesDetails, Delete_SalesDetails } = require('../controller/SalesDetail_Controller');

router.post('/load', load_SalesDetails);
router.post('/Get_TotalSales', Get_TotalSales);
router.get('/get_salesDetail/:Invoice_Number', Get_SalesDetail);
router.get('/Get_MonthWiseData/:Year', Get_MonthWiseData);
router.post('/insert', Insert_SalesDetails);
router.post('/update/:Invoice_Number', Update_SalesDetails);
router.delete('/delete/:Invoice_Number', Delete_SalesDetails);


module.exports = router;