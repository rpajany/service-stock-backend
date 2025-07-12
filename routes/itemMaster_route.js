const express = require('express');
const router = express.Router();

const { load_ItemMaster, get_ItemMaster, add_ItemMaster, update_ItemMaster, update_StockOfItem, delete_ItemMaster } = require('../controller/ItemMaster_Controller');

router.get('/load', load_ItemMaster);
router.get('/get_item/:Part_id', get_ItemMaster);
router.post('/add', add_ItemMaster);
router.post('/update/:Part_id', update_ItemMaster);
router.post('/update_stockofitem/:Part_id', update_StockOfItem);
router.delete('/delete/:Part_id', delete_ItemMaster);




module.exports = router;