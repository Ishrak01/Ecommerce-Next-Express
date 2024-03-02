const express = require('express');
const checkLogin=require('../middleware/checkLogin')
const {orderCreate,success}=require("../Controller/orderController")

const router = express.Router();

// Routing
router.post('/orderCreate/',checkLogin,orderCreate);
router.post('/success/:tranId',success)

module.exports = router;
