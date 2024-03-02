const cartModel=require('../model/cartModel');
const productModel = require('../model/productModel');
const userModel=require("../model/userModel")


exports.addtoCart=async(req,res)=>{
  try {
    const {userId,productId}=req.body
    const quantity = 1;
    console.log(userId, productId)
    if (!userId || !productId) {
      return res.send({ error: "userId, productId, and quantity are required" });
    }

    const existingCartItem= await cartModel.findOne({userId,productId})
// If the item exists, update the quantity and send a response
    if(existingCartItem){
      existingCartItem.quantity += quantity
      await existingCartItem.save()
      return res.status(200).json(existingCartItem);
    }

    else{
      // If the item doesn't exist, create a new cart item
      const newCartItem= new cartModel({userId,productId,quantity})
      const savedCartItem= await newCartItem.save()
      res.status(201).json(savedCartItem)
    }
    


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get all cart items
exports.getCart=async(req,res)=>{
  try {
    const userId=req.params.id
    const cartItems=await cartModel.find({userId}).populate("productId")
    console.log(cartItems);
    return res.status(200).json(cartItems)
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get a specific cart item by ID
exports.getCartItemById = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const cartItem = await cartModel.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    return res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.updateCartItem = async (req, res) => {
  try {
    const cartItemId=req.params.id // Assuming cartItemId is passed as a parameter
    const { productId, quantity } = req.body;

    console.log(cartItemId, productId, quantity);

    // Input validation
    if (!cartItemId || !productId || !quantity) {
      return res.status(400).json({ error: "cartItemId, productId, and quantity are required" });
    }

    const existingCartItem = await cartModel.findById(cartItemId);

    if (!existingCartItem) {
      return res.status(404).json({ error: "CartItem not found" });
    }

    // Fetch the related product to get the price
    const relatedProduct = await productModel.findById(productId);

    if (!relatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the cart item with the new productId and quantity
    existingCartItem.productId = productId;
    existingCartItem.quantity = quantity;

    // Calculate total cost based on the product's price and quantity
    const itemPrice = relatedProduct.price;
    const totalCost = itemPrice * quantity;

    existingCartItem.totalCost = totalCost;

    // Save the updated cart item
    await existingCartItem.save();

    return res.status(200).json(existingCartItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Delete a cart item by ID

exports.deleteCartItem=async(req,res)=>{
  try {
    const cartItemId=req.params.id
    
    if(!cartItemId){
      return res.status(400).json({ error: "cartItemId is required" });
    }
    const cartItem= await cartModel.findByIdAndDelete(cartItemId)
    
    console.log(cartItemId)
    return res.status(204).send(); // No content
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}



// exports.getTotalCostByUserId = async (req, res) => {
//   try {
//     const userId = req.params.id; // Assuming userId is passed as a parameter

//     // Input validation
//     if (!userId) {
//       return res.status(400).json({ error: "userId is required" });
//     }

//     // Find the user by userId
//     const user = await userModel.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Retrieve the user's cart items
//     const userCartItems = await cartModel.find({ userId: userId });

//     // Calculate the total cost by summing up the totalCost property for each cart item
//     const totalCost = userCartItems.reduce((sum, cartItem) => sum + cartItem.totalCost, 0);
   

//     return res.status(200).json({ userId, totalCost });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

exports.getTotalCostByUserId = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming userId is passed as a parameter

    // Input validation
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Find the user by userId
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve the user's cart items
    const userCartItems = await cartModel.find({ userId: userId }).populate('productId');

    // Calculate the total cost by summing up the calculated totalCost property for each cart item
    const totalCost = userCartItems.reduce((sum, cartItem) => {
      const quantity = cartItem.quantity || 1;

      // Assuming each cart item has a "productId" and "quantity" property
      const itemPrice = cartItem.productId.price || 0;
      const itemTotalCost = itemPrice * quantity;

      return sum + itemTotalCost;
    }, 0);

    return res.status(200).json({ userId, totalCost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
