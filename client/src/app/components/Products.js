import Link from "next/link";
import { useGetAllProductQuery } from "../redux/features/admin/adminApi";

const Products = () => {
  const { data: allProducts,isLoading:loading } = useGetAllProductQuery();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-opacity-25 border-r-4 border-gray-300 h-16 w-16 mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 md:px-[80px]">
      <h1 className="text-center text-2xl font-bold mb-6">Find all Products </h1>
      <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
        {allProducts &&
          allProducts.map((products) => (
            <Link key={products._id} href={`/customer/singleProduct/${products._id}`}>
              <div className="block bg-white p-4 rounded-lg shadow-md">
                <img
                  src={products.photo}
                  alt={products.name}
                  className="h-20 w-full object-cover mb-4 text-black rounded-md"
                />
                <h2 className="text-sm text-black text-center font-semibold mb-2 truncate">{products.name}</h2>
                {/* <p className="text-gray-600">{category.description}</p> */}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Products
