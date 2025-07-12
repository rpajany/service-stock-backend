const express = require('express');
const router = express.Router();

const { 
    load_Customer, 
    Search_loadCustomer,
    Get_Customer, 
    Insert_Customer, 
    Update_Customer, 
    Delete_Customer } = require('../controller/Customer_Controller');

router.get('/load', load_Customer);
router.get('/search_load', Search_loadCustomer);
router.get('/get_customer/:Cust_id', Get_Customer);
router.post('/insert', Insert_Customer);
router.post('/update/:Cust_id', Update_Customer);
router.delete('/delete/:Cust_id', Delete_Customer);


module.exports = router;