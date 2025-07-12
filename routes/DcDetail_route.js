const express = require('express');
const router = express.Router();

const {
    load_DC_Details,
    Get_DC_Detail,
    Insert_DC_Detail,
    Update_DC_Detail,
    Update_DC_Status_Detail,
    Delete_DC_Detail } = require('../controller/DcDetail_Controller');

router.post('/load', load_DC_Details);
router.get('/get_dcDetail', Get_DC_Detail);
router.post('/insert', Insert_DC_Detail);
router.post('/update/:DC_Number', Update_DC_Detail);
router.post('/updateStatus/:DC_Number', Update_DC_Status_Detail);
router.delete('/delete/:DC_Number', Delete_DC_Detail);


module.exports = router;