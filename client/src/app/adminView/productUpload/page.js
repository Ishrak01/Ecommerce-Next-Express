"use client"

import { useEffect, useState } from "react";


import { useGetCategoryQuery, usePostProductsMutation } from "@/app/redux/features/admin/adminApi";




const ProductUpload = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");

  const [postProducts, { data, isLoading }] = usePostProductsMutation()

  const {data:categoryData}=useGetCategoryQuery()

 
 

  const handleSubmit = (e) => {
    e.preventDefault();

    postProducts({
      name,
      description,
      price,
      photo,
      category,
    });
  };
useEffect(() => {
  if(data){
    alert("product uploaded")
  }

  
}, [data])

 

  

  return (
  <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 h-screen text-black bg-gray-100 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Upload Product</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-semibold mb-2">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-semibold mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-semibold mb-2">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-semibold mb-2">
          Photo
        </label>
        <input
          type="string"
          id="price"
          name="photo"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-semibold mb-2">
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
      <button
        type="submit"
        className="bg-blue-500 text-black px-6 py-2  rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Upload Product
      </button>
    </form>

);
};

export default ProductUpload;