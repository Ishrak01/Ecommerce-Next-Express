"use client"

import Link from "next/link";

import { useDeleteProductMutation, useGetAllProductQuery } from "@/app/redux/features/admin/adminApi";


const ProductDetails = () => {
  

  const { data, error, isLoading } = useGetAllProductQuery();

  const [deleteProduct, {}] = useDeleteProductMutation();

  const handleDelete = (id) => {
    deleteProduct(id);
  };





  return (
    <div className="flex h-screen bg-blue-900">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64">
        {/* Sidebar Content */}
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          {/* Add more sidebar items as needed */}
          <ul className="mt-4">
            <li className="mb-2">
              <Link className="hover:text-gray-300" href="/adminView/productUpload">
                Product Upload
              </Link>
            </li>
           
            <li className="mb-2">
              <Link className="hover:text-gray-300" href="/adminView/categoryUpload">
                Category Upload
              </Link>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-300">
                Orders
              </a>
            </li>
            {/* Add more sidebar items as needed */}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-5">Admin Product Page</h1>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((products) => (
              <tr key={products.id}>
                <td className="border border-gray-300 px-4 py-2">
                  <img className="h-10 w-10" src={products.photo} />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {products.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${products.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    href={`/adminView/productUpdate/${products._id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mx-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(products._id)}
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

export default ProductDetails;
