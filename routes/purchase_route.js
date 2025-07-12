const express = require('express');
const router = express.Router();

const { load_Purchase, Get_Purchase, Insert_Purchase, Update_Purchase, Delete_Purchase } = require('../controller/Purchase_Controller');

router.get('/load', load_Purchase);
router.get('/get_purchase/:Invoice_Number', Get_Purchase);
router.post('/insert', Insert_Purchase);
router.post('/update/:Invoice_Number', Update_Purchase);
router.delete('/delete/:Invoice_Number', Delete_Purchase);


module.exports = router;