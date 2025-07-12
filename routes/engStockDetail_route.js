const express = require('express');
const router = express.Router();

const {
    load_EngStock_Details,
    Get_EngStock_DetailByid,
    Get_EngStock_DetailByPart_id,
    Get_EngStockDetail_ByEngName,
    Get_Stock_ByEngName_Partid,
    updateStock,
    Insert_EngStockDetails,
    updateByid,
    updateByPart_id,
    Delete_EngStockDetail,
    CheckPart_Exists } = require('../controller/EngStockDetail_Controller');

router.post('/load', load_EngStock_Details);
router.get('/get_engStock_DetailByid/:id', Get_EngStock_DetailByid);
router.get('/get_engStock_DetailByPart_id/:Part_id', Get_EngStock_DetailByPart_id);
router.get('/get_engStock_DetailByEngName/:Eng_Name', Get_EngStockDetail_ByEngName);
router.post('/get_stock_ByEngName_Partid/:Part_id', Get_Stock_ByEngName_Partid);
router.post('/insert', Insert_EngStockDetails);
router.post('/updateByid/:id', updateByid);
router.post('/updateByPart_id/:Part_id', updateByPart_id);
router.post('/updateStock/:Part_id', updateStock);
router.delete('/delete/:id', Delete_EngStockDetail);
router.post('/checkPart_exist', CheckPart_Exists)


module.exports = router;