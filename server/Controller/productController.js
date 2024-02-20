const productModel = require('../model/productModel.js');




//get all 
exports.getProduct= async(req, res)=>{
  
  try {
    const allProduct = await productModel.find().populate('category','name')
    res.status(200).json(allProduct)
  } catch (error) {
    res.json(error)
  }
}


//create a new Product
exports.createProduct=async (req,res)=>{
  
  try {
    const{name,description,price,photo,category}=req.body
    
    if(!name && !description && !price && !photo && !category){
      return res.send({error:"All fields are required"})
    }
    const newProduct =new productModel({name,description,price,photo,category})
    const saveProduct= await newProduct.save()
    
    res.status(201).json(saveProduct)
  } catch (error) {
    res.json({error:'error uploading'})
  }
}



//get single product by id
exports.getSingleProduct=async(req,res)=>{
  try {
    const singleProduct=await productModel.findById(req.params.id).populate('category','name')
    res.status(200).json(singleProduct)
  } catch (error) {
    
  }
}

//update a product by id
exports.updateProduct=async (req,res)=>{
  try {
    const { name, description, price, photo, category } = req.body;
    const updateProduct=await productModel.findByIdAndUpdate
    (req.params.id,{name, description, price, photo, category }).populate('category','name')
    res.status(200).json(updateProduct)
  } catch (error) {
    res.json(error)
  }
}




//delete by id
exports.deleteProduct=async(req,res)=>{
  try {
    const deleteProduct= await productModel.findByIdAndDelete(req.params.id).populate('category','name')
  res.status(200)('item deleted',deleteProduct)
    
  } catch (error) {
    res.json(error)
  }
  
}

// search products
// search products
exports.searchProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { query } = req.body

    // Use a regular expression to make the search case-insensitive
    console.log("==============", query)
    const searchRegex = new RegExp(query, 'i');
    
    // Perform a search in both name and description fields
    const searchResults = await productModel.find(
        { name: { $regex: searchRegex } }).populate('category', 'name');

    res.status(200).json(searchResults);
  } catch (error) {
    res.json(error);
  }
};
