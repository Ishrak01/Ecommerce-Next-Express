import Link from "next/link";
import { useState } from "react";
import { useGetCategoryQuery, useGetProductsByCategoryQuery } from "../redux/features/admin/adminApi";

const Category = () => {
  const { data: categories } = useGetCategoryQuery();
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (categoryId) => {
    setHoveredCategoryId(categoryId);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const { data: productsByCat } = useGetProductsByCategoryQuery(hoveredCategoryId, {
    skip: !hoveredCategoryId,
  });

  return (
    <div className="object-cover mb-4 block bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-bold">All Categories</h2>
      {categories && categories.map((category) => (
        <div
          key={category._id}
          className="relative"
          onMouseEnter={() => handleMouseEnter(category._id)}
          onMouseLeave={handleMouseLeave}
        >
          <Link href="" className="text-black text-xs font-bold">
            <h1>{category.name}</h1>
          </Link>
          {(hoveredCategoryId === category._id && isHovered) && productsByCat && (
            <div
              className="fixed flex top-[100px] left-[200px] w-3/4 h-[270px] gap-2 p-4 bg-white border rounded-lg shadow-lg z-50"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {productsByCat.length > 0 ? (
                productsByCat.map((product) => (
                  <div key={product._id} className="mb-2">
                    <Link href={`/customer/singleProduct/${product._id}`}>
                    <div className="block bg-white p-4 rounded-lg shadow-md">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="h-20 w-full object-cover mb-4 text-black rounded-md"
                />
                <h2 className="text-sm text-black text-center font-semibold mb-2 truncate">{product.name}</h2>
                {/* <p className="text-gray-600">{category.description}</p> */}
              </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-xs">No products available.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Category;
