const express = require('express');
const {
    addtoCart,
    deleteCartItem,
    getCart,
    getCartItemById,
    updateCartItem
} = require('../Controller/cartController.js');

//router onject
const router=express.Router()






//routing
router.post('/addToCart',addtoCart)
router.get('/getAllCartItems/:id',getCart)
router.get('/getCartItemById',getCartItemById)
router.put('/updateCartItem/:id',updateCartItem)
router.delete('/deleteCartItem/:id',deleteCartItem)




module.exports= router