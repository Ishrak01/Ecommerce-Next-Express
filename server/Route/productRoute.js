const express = require('express');
const checkLogin=require('../middleware/checkLogin')
const {
    createProduct,
    deleteProduct,
    getProduct,
    getSingleProduct,
    searchProduct,
    updateProduct
} = require('../Controller/productController.js');

const router = express.Router();

// Routing
router.post('/postProducts', createProduct);
router.get('/getProducts', getProduct);
router.get('/getSingleProduct/:id', getSingleProduct);
router.put('/updateProducts/:id',checkLogin, updateProduct);
router.delete('/deleteProducts/:id',checkLogin, deleteProduct);
router.post('/searchProduct', searchProduct);

module.exports = router;
