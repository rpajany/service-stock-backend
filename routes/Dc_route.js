const express = require('express');
const router = express.Router();

const {
    load_DC,
    Get_DC,
    Insert_DC,
    Update_DC,
    Delete_DC } = require('../controller/DC_Controller');

router.get('/load', load_DC);
router.get('/get_dc/:DC_Number', Get_DC);
router.post('/insert', Insert_DC);
router.post('/update/:DC_Number', Update_DC);
router.delete('/delete/:DC_Number', Delete_DC);


module.exports = router;