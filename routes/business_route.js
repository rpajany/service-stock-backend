const express = require('express');
const router = express.Router();

const authToken = require('../middleware/authToken');

const { Get_Business, Update_Business } = require('../controller/Business_Controller');

router.get('/get_business', authToken, Get_Business);
router.post('/update/:id', Update_Business);


module.exports = router;