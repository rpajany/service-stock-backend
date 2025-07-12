const express = require('express');
const router = express.Router();

const { load_SalesPayDetails, Get_SalesPayDetails, Insert_SalesPayDetails, Update_SalesPayDetails, Delete_SalesPayDetails } = require('../controller/SalesPayment_Controller');

router.post('/load', load_SalesPayDetails);
router.get('/get_salesPayment/:Invoice_Number', Get_SalesPayDetails);
router.post('/insert', Insert_SalesPayDetails);
router.post('/update/:Invoice_Number', Update_SalesPayDetails);
router.delete('/delete/:Invoice_Number', Delete_SalesPayDetails);


module.exports = router;