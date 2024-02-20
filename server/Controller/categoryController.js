const categoryModel = require('../model/categoryModel.js');
const productModel = require('../model/productModel.js');


exports.getCategory=async(req,res)=>{
  try {
    const categoryList=await categoryModel.find()
    if(!categoryList){
      res.status(500).json({success: false})
    }
    res.send(categoryList)
  } catch (error) {
    
  }
}

exports.getProductsByCategory= async(req,res)=>{
try {
  const categoryId=req.params.id
  
  const productsByCategory=await productModel.find({category:categoryId}).populate("category",'name')
  if (!productsByCategory || productsByCategory.length === 0) {
    return res.status(404).json({ message: 'No products found for the specified category ID' });
  }
res.status(200).json(productsByCategory)
  
} catch (error) {
  res.status(500).json({ error: error.message });
}
}

exports.postCategory=async(req,res)=>{
  
  try {
    const {name,photo,details}= req.body
    if(!name && !photo && !details){
      return res.send({error:"All fields are required"})

    }
    const exist= await categoryModel.findOne({name})
   if(exist){
    return res.status(200).send({message:"name taken already"})
   }

   const newCategory =new categoryModel({name,photo,details})
   const saveCategory= await newCategory.save()
   res.status(201).json(saveCategory)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


exports.updateCategory=async(req,res)=>{
  try {
    const id=req.params.id
    const {name,photo,details}=req.body
    if(!name && !photo && !details){
      return res.send({error:"All fields are required"})
    }
    const updateCategory=await categoryModel.findByIdAndUpdate(id,{name,photo,details})
    res.status(200).json(updateCategory)

  
    
  } catch (error) {
    
  }
}

exports.deleteCategory=async(req,res)=>{
  const deleteCategory= await categoryModel.findByIdAndDelete(req.params.id)
  res.status(200).json('item deleted')
}