const mongoose=require('mongoose')


const orderSchema= new mongoose.Schema({
  paidStatus: {
    type: Boolean,
    required: true,
  },
  tranjectionId: {
    type: String,
    required: true,
    unique: true,
  },

})

module.exports= mongoose.model("order",orderSchema)