const cors = require('cors');
const express = require('express');
const {
    deleteCategory,
    getCategory,
    getProductsByCategory,
    postCategory,
    updateCategory
} = require('../Controller/categoryController.js');

const router = express.Router();


router.post('/postcategory', postCategory);
router.get('/getcategory', getCategory);
router.get('/getProductsByCategory/:id', getProductsByCategory);
router.put('/updateCategory/:id', updateCategory);
router.delete('/deletecategory/:id', deleteCategory);

module.exports = router;
