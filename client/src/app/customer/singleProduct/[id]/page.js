"use client"

import { useSingleProductQuery } from "@/app/redux/features/admin/adminApi";
import { useAddToCartMutation } from "@/app/redux/features/cart/cartApi";

const SingleProductView = ({ params }) => {
  const { id } = params;
  const { data } = useSingleProductQuery(id);

  const authData = JSON.parse(localStorage.getItem("auth"));
  const userId = authData && authData.user ? authData.user._id : null;
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = (productId) => {
    addToCart({ userId, productId });
    alert('Cart product added');
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4 md:mb-0">
            <img
              src={data.photo}
              alt="Product"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-4">{data.name}</h2>
            <p className="text-gray-600 mb-2 md:mb-4">{data.description}</p>
            <p className="text-lg md:text-2xl font-bold text-primary mb-2 md:mb-4">
              {data.price} taka
            </p>
            <button
              className="bg-orange-600 text-black px-4 py-2 rounded-md hover:bg-primary-dark border"
              onClick={() => handleAddToCart(data._id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductView;
