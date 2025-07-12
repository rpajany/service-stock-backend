const express = require('express');
const router = express.Router();

const {
    load_RMI,
    Get_RMIByid,
    Get_RMIByPart_id,
    Insert_RMI,
    updateByid,
    updateByPart_id,
    Delete_RMI} = require('../controller/RMI_Controller');

router.post('/load', load_RMI);
router.get('/get_RMIByid/:id', Get_RMIByid);
router.get('/get_RMIByPart_id/:Part_id', Get_RMIByPart_id);
router.post('/insert', Insert_RMI);
router.post('/updateByid/:id', updateByid);
router.post('/updateByPart_id/:Part_id', updateByPart_id);
router.delete('/delete/:id', Delete_RMI);

module.exports = router;