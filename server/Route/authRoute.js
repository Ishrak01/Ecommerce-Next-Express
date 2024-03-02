const express = require('express');
const checkLogin=require("../middleware/checkLogin")
const {
    ForgotPassword,
    GetAllUser,
    ResetPassword,
    loginController,
    registerController,
    getProfile,
    updateProfile
} = require('../Controller/authController.js');


//router onject
const router=express.Router()






//routing
router.post('/register',registerController)
router.post('/login',loginController)
router.get('/getUser',GetAllUser)
router.post('/forgotPassword',ForgotPassword)
router.post('/resetPassword/:id/:token',ResetPassword)


router.get('/getProfile',checkLogin,getProfile)
router.put('/updateProfile',checkLogin,updateProfile)






module.exports=router