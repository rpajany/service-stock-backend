const express = require('express');
const router = express.Router();

const { load_StockDetail_Report, load_StockDetail_ByPartNumber, Insert_StockDetail_Report, Update_StockDetail_Report, Delete_StockDetail_Report } = require('../controller/StockDetail_Report_Controller');

router.post('/load', load_StockDetail_Report);
router.get('/stockDetail_ByPartNumber/:PartNumber', load_StockDetail_ByPartNumber);
router.post('/insert', Insert_StockDetail_Report);
router.post('/update/:id', Update_StockDetail_Report);
router.delete('/delete/:Invoice_Number', Delete_StockDetail_Report);


module.exports = router;