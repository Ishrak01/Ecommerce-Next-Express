const express = require('express');
const checkLogin=require('../middleware/checkLogin')
const {
    addtoCart,
    deleteCartItem,
    getCart,
    getCartItemById,
    updateCartItem,
    getTotalCostByUserId
} = require('../Controller/cartController.js');

//router onject
const router=express.Router()






//routing
router.post('/addToCart',checkLogin,addtoCart)
router.get('/getAllCartItems/:id',checkLogin,getCart)
router.get('/getCartItemById/:id',checkLogin,getCartItemById)
router.put('/updateCartItem/:id',checkLogin,updateCartItem)
router.delete('/deleteCartItem/:id',checkLogin,deleteCartItem)
router.get('/getTotalPrice/:id',checkLogin,getTotalCostByUserId)




module.exports= router