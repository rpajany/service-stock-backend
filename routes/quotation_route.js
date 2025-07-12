const express = require('express');
const router = express.Router();

const { load_Quotation, Get_Quotation, Insert_Quotation, Update_Quotation, Delete_Quotation } = require('../controller/Quotation_Controller');

router.get('/load', load_Quotation);
router.get('/get_quotation/:Quot_Number', Get_Quotation);
router.post('/insert', Insert_Quotation);
router.post('/update/:Quot_Number', Update_Quotation);
router.delete('/delete/:Quot_Number', Delete_Quotation);


module.exports = router;