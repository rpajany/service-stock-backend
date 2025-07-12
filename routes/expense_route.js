const express = require('express');
const router = express.Router();

const { load_Expense, Get_Expense, Get_MonthWiseData, Get_TotalExpense, Insert_Expense, Update_Expense, Delete_Expense } = require('../controller/Expense_Controller');

router.post('/load', load_Expense);
router.post('/Get_TotalExpense', Get_TotalExpense);
router.get('/Get_Expense/:id', Get_Expense);
router.get('/Get_MonthWiseData/:Year', Get_MonthWiseData);
router.post('/insert', Insert_Expense);
router.post('/update/:id', Update_Expense);
router.delete('/delete/:id', Delete_Expense);

module.exports = router;