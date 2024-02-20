"use client"
import { useCategoryMutation, useDeleteCategoryMutation, useGetCategoryQuery } from "@/app/redux/features/admin/adminApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CategoriesPage = () => {
  const router=useRouter();
  const {data}=useGetCategoryQuery()
  const [category,{}]=useCategoryMutation()
  const [deleteCategory,{}]=useDeleteCategoryMutation()

  const [name,setName]=useState("")
  const [photo,setPhoto]=useState("")
  const [details,setDetails]=useState("")


 

  const handleSubmit = (e) => {
    e.preventDefault();

    category({
      name,
      photo,
      details
    });
  };

  const handleDelete=(id)=>{
    deleteCategory(id);
  }


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
        Add Category
      </button>
    </form>
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-5">Admin Category Page</h1>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((category) => (
              <tr key={category.id}>
                <td className="border border-gray-300 px-4 py-2">
                  <img className="h-10 w-10" src={category.photo} />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {category.name}
                </td>
              
                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    href={`/adminView/categoryUpdate/${category._id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mx-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mx-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default CategoriesPage;