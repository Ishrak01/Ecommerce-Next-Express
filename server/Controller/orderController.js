const express=require('express')
const orderModel = require('../model/orderModel');
const { ObjectId } = require('mongodb');
const SSLCommerzPayment = require('sslcommerz-lts');
const dotenv = require('dotenv');

dotenv.config();
//rest object
const app=express()
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false; // true for live, false for sandbox

// sslcommerz init
exports.orderCreate = async (req, res) => {
  try {
    const { name, address, email, phone, amount } = req.body; // Assuming these properties are sent from the client
console.log(name, address, email, phone, amount)
    const tran_id = new ObjectId().toString();

    const data = {
      total_amount:amount,
      currency: 'BDT',
      tran_id: tran_id,
      success_url: `http://localhost:3000/customer/success/${tran_id}`,
      fail_url: 'http://localhost:3030/fail',
      cancel_url: 'http://localhost:3030/cancel',
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'Courier',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: name,
      cus_email: email,
      cus_add1: address,
      // Add other customer details accordingly
      cus_phone: phone,
      cus_fax: phone,
      ship_name: name,
      ship_add1: address,
      // Add other shipping details accordingly
      ship_phone: phone,
      ship_city: 'Dhaka',
      ship_postcode: '1000',
      ship_country:"Bangladesh"
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);

    console.log(apiResponse);

    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });

    const finalOrder = {
     paidStatus: false,
      tranjectionId: tran_id,
      // Add other order details accordingly
    };

    try {
      const result = await orderModel.create(finalOrder);
      console.log('Final Order inserted into MongoDB:', result);
    } catch (error) {
      console.error('Error inserting final order into MongoDB:', error);
      // Handle the error as needed
    }

    console.log('Redirecting to: ', GatewayPageURL);


    app.post('/customer/success/:tranId',async (req,res)=>{
      const tranId=req.params.tranId
      // Update the order status in MongoDB
  try {
    const updateResult = await orderModel.updateOne(
      { tranjectionId: tran_id },
      { $set: { paidStatus: true } }
    );

    console.log('Order status updated in MongoDB:', updateResult);

    // Handle other actions related to successful payment if needed

    return res.status(200).send('Payment successful. Order status updated.');
  } catch (error) {
    console.error('Error updating order status in MongoDB:', error);
    // Handle the error as needed
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
    
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.success = async (req, res) => {
  // Handle success callback from the payment gateway
  // You may want to update the order status in your database or perform other actions
};
