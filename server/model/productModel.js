const mongoose=require('mongoose')


const productSchema= new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description:{
    type:String,
    required: true
  },
  price:{
    type:Number,
    required:true
  },

  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "category",
    required:true,
  },
  photo:{
    type:String
  }
})

module.exports= mongoose.model("products",productSchema)