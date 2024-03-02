"use client"
import { useGetProductsByCategoryQuery } from '@/app/redux/features/admin/adminApi';
import { useAddToCartMutation } from '@/app/redux/features/cart/cartApi';
import Link from 'next/link';
import toast from 'react-hot-toast';

const FindByCategory = ({ params }) => {
  const { id } = params;
  const { data: products, isLoading, isError } = useGetProductsByCategoryQuery(id);
  let userId;

  if (typeof localStorage !== 'undefined' && localStorage.getItem('auth')) {
    userId = JSON.parse(localStorage.getItem('auth')).user._id;
  }

  const [addtoCart] = useAddToCartMutation();

  const handleAddToCart = (productId) => {
    addtoCart({ userId, productId });
    toast.success('Item added to cart!')
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center mt-8 text-red-500">Error loading products</div>;
  }

  return (
    <div className="container mx-auto my-8 grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4">
          <Link href={`/customer/singleProduct/${product._id}`}>
            <div>
              <img
                src={product.photo}
                className="w-full h-48 object-top mb-4 rounded"
                alt={product.name}
              />
              <p className="text-lg font-semibold mb-2">{product.name}</p>
              <p className="text-gray-600 mb-2 text-sm">{product.description}</p>
              <p className="text-lg font-semibold">BDT {product.price}</p>
            </div>
          </Link>
          <button
            onClick={() => handleAddToCart(product._id)}
            className="w-full mt-2 border bg-blue-400 rounded text-white py-1"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default FindByCategory;
