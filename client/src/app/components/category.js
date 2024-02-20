import Link from "next/link";
import { useGetCategoryQuery } from "../redux/features/admin/adminApi";

const Category = () => {
  const { data: allCategory,isLoading:loading } = useGetCategoryQuery();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-opacity-25 border-r-4 border-gray-300 h-16 w-16 mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 md:px-[120px]">
      <h1 className="text-center text-2xl font-bold mb-6">Find Products by Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allCategory &&
          allCategory.map((category) => (
            <Link key={category._id} href={`/customer/findByCategory/${category._id}`}>
              <div className="block bg-white p-4 rounded-lg shadow-md">
                <img
                  src={category.photo}
                  alt={category.name}
                  className="h-40 w-full object-cover mb-4 text-black rounded-md"
                />
                <h2 className="text-xl text-black font-semibold mb-2">{category.name}</h2>
                {/* <p className="text-gray-600">{category.description}</p> */}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Category;
