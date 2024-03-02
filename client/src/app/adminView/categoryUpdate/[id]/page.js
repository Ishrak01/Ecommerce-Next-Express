"use client"
import { useSingleCategoryQuery, useUpdateCategoryMutation } from "@/app/redux/features/admin/adminApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const updateCategorypage = ({params}) => {
  const {id}=params
  const router=useRouter();

  const [name,setName]=useState("")
  const [photo,setPhoto]=useState("")
  const [details,setDetails]=useState("")



  const {data:singleCategory}=useSingleCategoryQuery(id)
  
  const [updateCategory,{data:updatedCategory}]=useUpdateCategoryMutation()

  useEffect(()=>{
    if(singleCategory){
      console.log(singleCategory)
      setName(singleCategory.name)
      setPhoto(singleCategory.photo)
      setDetails(singleCategory.details)
     

    }
  },[singleCategory])

  const handleSubmit = (e) => {
    e.preventDefault();

  

  // Call the updateCategory function here
  updateCategory({
   
  id,
    data:{
      name,
      photo,
      details
    },
  
  })
  }
  
  useEffect(()=>{
    if(updatedCategory){
      alert("product updated")
    }
  },[updatedCategory])
 

 

  






  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-gray-100 shadow-md rounded-md ">
      <h2 className="text-2xl text-black font-bold mb-4">Add Category</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-semibold mb-2 text-black">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none text-black focus:border-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-semibold mb-2 text-black">
          Photo
        </label>
        <input
          type="text"
          id="photo"
          name="photo"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none text-black focus:border-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-semibold mb-2 text-black">
          Details
        </label>
        <input
          type="text"
          id="details"
          name="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none text-black focus:border-blue-500"
          required
        />
      </div>
      
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        update Category
      </button>
    </form>
    </div>
  )
}


export default updateCategorypage