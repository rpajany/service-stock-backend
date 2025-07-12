const express = require('express');
const router = express.Router();

const { load_PurchaseDetails, Get_TotalPurchase, Get_PurchaseDetail, Get_MonthWiseData, Insert_PurchaseDetails, Update_PurchaseDetails, Delete_PurchaseDetails } = require('../controller/PurchaseDetail_Controller');

router.post('/load', load_PurchaseDetails);
router.post('/Get_TotalPurchase', Get_TotalPurchase);
router.get('/get_purchaseDetail', Get_PurchaseDetail);
router.get('/Get_MonthWiseData/:Year', Get_MonthWiseData);
router.post('/insert', Insert_PurchaseDetails);
router.post('/update/:Invoice_Number', Update_PurchaseDetails);
router.delete('/delete/:Invoice_Number', Delete_PurchaseDetails);


module.exports = router;