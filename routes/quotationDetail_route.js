const express = require('express');
const router = express.Router();

const { load_QuotationDetails, Get_QuotationDetail, Insert_QuotationDetail, Update_QuotationDetail, UpdateStatus_QuotationDetail, Delete_QuotationDetail } = require('../controller/QuotationDetail_Controller');

router.post('/load', load_QuotationDetails);
router.get('/get_purchaseDetail', Get_QuotationDetail);
router.post('/insert', Insert_QuotationDetail);
router.post('/update/:Quot_Number', Update_QuotationDetail);
router.post('/updateStatus/:Quot_Number', UpdateStatus_QuotationDetail);
router.delete('/delete/:Quot_Number', Delete_QuotationDetail);


module.exports = router;