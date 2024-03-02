const mongoose=require("mongoose")


const cartSchema= new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },

  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"products",
    required:true
  },
  quantity:{
    type:Number,
    default:1
  },
  totalCost:{
    type:Number,
    default:0
  }
  
})

module.exports=mongoose.model('cart',cartSchema)