const express = require('express');
const {
    ForgotPassword,
    GetAllUser,
    ResetPassword,
    loginController,
    registerController
} = require('../Controller/authController.js');


//router onject
const router=express.Router()






//routing
router.post('/register',registerController)
router.post('/login',loginController)
router.get('/getUser',GetAllUser)
router.post('/forgotPassword',ForgotPassword)
router.post('/resetPassword/:id/:token',ResetPassword)






module.exports=router