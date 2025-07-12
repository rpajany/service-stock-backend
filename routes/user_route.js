const express = require('express');
const router = express.Router();

const { load_User, Load_EngUser } = require('../controller/user/Load_User');
const signIn = require('../controller/user/SignIn');
const signUp = require('../controller/user/SignUp');
const update_User = require('../controller/user/Update_User');
const { Delete_User } = require('../controller/user/Delete_User');
const { Get_UserDetails } = require('../controller/user/Get_UserDetails');

const authToken = require('../middleware/authToken');

router.get('/load', load_User);
router.get('/user_details', authToken, Get_UserDetails); // authToken
router.get('/loadEng', Load_EngUser);
router.post('/signup', signUp);
router.post('/signin', signIn);

router.post('/update_user', update_User);
router.delete('/delete/:user_id', Delete_User);



module.exports = router;