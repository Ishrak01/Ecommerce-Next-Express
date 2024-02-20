const mongoose=require('mongoose')


const categorySchema= new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },

  photo:{
    required:true,
    type:String
  },

  details:{
    required:true,
    type:String
  }

})

module.exports= mongoose.model("category",categorySchema)