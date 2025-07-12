const express = require('express');
const router = express.Router();

const { load_Sales, Get_Sales, Insert_Sales, Update_Sales, Delete_Sales } = require('../controller/Sales_Controller');

router.get('/load', load_Sales);
router.get('/get_sales/:Invoice_Number', Get_Sales);
router.post('/insert', Insert_Sales);
router.post('/update/:Invoice_Number', Update_Sales);
router.delete('/delete/:Invoice_Number', Delete_Sales);


module.exports = router;