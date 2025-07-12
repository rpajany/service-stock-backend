const express = require('express');
const router = express.Router();

const { Get_SalesUID,
    Update_SalesUID,
    Get_QuoteUID,
    Update_QuoteUID,
    Get_NonGST_SalesUID,
    Update_NonGST_SalesUID,
    Get_ServiceUID,
    Update_ServiceUID,
    Get_CustomerUID,
    Update_CustomerUID,
    Get_DC_UID,
    Update_DC_UID

} = require('../controller/UID_Controller');

router.get('/get_salesUID', Get_SalesUID);
router.post('/update_salesUID/:id', Update_SalesUID);

router.get('/get_NonGST_salesUID', Get_NonGST_SalesUID);
router.post('/update_NonGST_salesUID/:id', Update_NonGST_SalesUID);

router.get('/get_quoteUID', Get_QuoteUID);
router.post('/update_quoteUID/:id', Update_QuoteUID);

router.get('/get_serviceUID', Get_ServiceUID);
router.post('/update_serviceUID/:id', Update_ServiceUID);

router.get('/get_customerUID', Get_CustomerUID);
router.post('/update_customerUID/:id', Update_CustomerUID);

router.get('/get_dcUID', Get_DC_UID);
router.post('/update_dcUID/:id', Update_DC_UID);

module.exports = router;