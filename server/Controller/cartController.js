const cartModel=require('../model/cartModel')


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

// Update a cart item by ID
exports.updateCartItem= async(req,res)=>{
  try {
    const cartItemId=req.params.id
    const{productId,quantity}=req.body

    if (!cartItemId || !quantity || !productId) {
      return res.status(400).json({ error: "cartItemId and quantity are required" });
    }

    const cartItem= await cartModel.findByIdAndUpdate(cartItemId)
    console.log("+++++++++++++",cartItem)
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    cartItem.quantity=quantity
    await cartItem.save()
    return res.status(200).json(cartItem);


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


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