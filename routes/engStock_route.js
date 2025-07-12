const express = require('express');
const router = express.Router();

const { load_EngStock, Get_EngStockByid, Get_EngStockByPart_id, Insert_EngStock, updateByid, updateByPart_id,updateStock, Delete_EngStock, CheckPart_Exists } = require('../controller/EngStock_Controller');

router.post('/load', load_EngStock);
router.get('/get_engStockByid/:id', Get_EngStockByid);
router.get('/get_engStockByPart_id/:Part_id', Get_EngStockByPart_id);
router.post('/insert', Insert_EngStock);
router.post('/updateByid/:id', updateByid);
router.post('/updateByPart_id/:Part_id', updateByPart_id);
router.post('/updateStock/:Part_id', updateStock);
router.delete('/delete/:id', Delete_EngStock);
router.post('/checkPart_exist', CheckPart_Exists)


module.exports = router;