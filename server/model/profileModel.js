const mongoose=require('mongoose')


const profileSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },

  address:{
    required:true,
    type:String
  },

  phone:{
    required:true,
    type:Number,
  },

  email:{
    required:true,
    type:String
  }

})

module.exports= mongoose.model("profile",profileSchema)