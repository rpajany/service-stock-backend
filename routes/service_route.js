const express = require('express');
const router = express.Router();

const {
    load_Service,
    load_ServiceByEngineer,
    load_Engineer,
    Get_Service,
    Get_Devices,
    Insert_Service,
    Update_Service,

    Delete_Service
} = require('../controller/Service_Controller');

router.post('/load', load_Service);
router.post('/loadByEngineer', load_ServiceByEngineer);
router.get('/load_engineer', load_Engineer);
router.get('/get_service/:Serv_id', Get_Service);
router.get('/get_device/:Cust_id', Get_Devices);
router.post('/insert', Insert_Service);
router.post('/update/:Serv_id', Update_Service);

router.delete('/delete/:Serv_id', Delete_Service);




module.exports = router;