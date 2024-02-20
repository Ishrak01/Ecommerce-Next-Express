"use client"

import { useEffect, useState } from "react";

import { useGetCategoryQuery, useSingleProductQuery, useUpdateProductMutation } from "@/app/redux/features/admin/adminApi";

const ProductUpdateForm = ({params}) => {
  const { id } =params
  
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");

  const {data: singleProduct,isLoading,error} = useSingleProductQuery(id);
 
  const {data:categoryData}=useGetCategoryQuery()
  const [updateProduct, { data:updatedProduct }] = useUpdateProductMutation();

  useEffect(()=>{
    if(singleProduct){
      setName(singleProduct.name)
      setDescription(singleProduct.description)
      setPrice(singleProduct.price)
      setPhoto(singleProduct.photo)
      setCategory(singleProduct.category)

    }
  },[singleProduct])
  

  

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProduct({
      id,
      data: {
        name,
        description,
        price,
        photo,
        category,
      },
    });
  };

  useEffect(()=>{
    if(updatedProduct){
      alert("product updated")
    }
  },[updatedProduct])

  return (
    <div>
      <div>
        {isLoading ? (<p>Loading...</p>) : error ? (<p>An error occured</p>):(<p></p>)
     
          
        }

        <hr />
      </div>
       
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Product Update</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto text-black">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        {/* Add more input fields for other product attributes (category, brand, imageUrls, stockQuantity) */}

        <div className="mb-4">
          <label
            htmlFor="imageUrls"
            className="block text-sm font-medium text-gray-700"
          >
            Image URLs (comma-separated)
          </label>
          <input
            type="text"
            id="imageUrls"
            name="imageUrls"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="stockQuantity"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          {
          categoryData && (
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        >
          <option value="" >Select a category</option>
          {
          categoryData.map((cat) => (
            <option key={cat.id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
          )
        }
        
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Update Product
          </button>
        </div>
      </form>
      
    </div>
    </div>
  );
};

export default ProductUpdateForm;
