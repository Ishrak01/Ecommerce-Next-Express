"use client"

import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation
} from "@/app/redux/features/cart/cartApi";





const Cart = () => {

 let userId
  
 

 if (typeof localStorage !== 'undefined' && localStorage.getItem("auth")) {
  userId = JSON.parse(localStorage.getItem("auth")).user._id;

 }
  
  


  const { data: cartItems, isLoading } = useGetCartQuery(userId);
  const [updateCartItem, { isLoading: loading }] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  const handleUpdateCartItem = (cartItemId, productId, quantity) => {
    updateCartItem({ cartItemId, productId, quantity });
  };

  const handleRemoveCartItem = (cartItemId) => {
    removeCartItem(cartItemId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-opacity-25 border-r-4 border-gray-300 h-16 w-16 mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md h-screen">
      <h2 className="text-2xl text-black font-bold mb-4">Shopping Cart</h2>
      {!cartItems || cartItems.length === 0 ? (
        <p className="text-red-700 font-extrabold">Your cart is empty. Go for Shopping.....</p>
      ) : (
        <div>
          <ul>
            {cartItems?.map((item) => (
              <li key={item.userId} className="flex items-center text-black justify-between border-b border-gray-300 py-2">
                <div className="flex items-center space-x-4">
                  <img className="h-[60px]" src={item.productId.photo} alt={item.productId.name} />
                  <div>
                    <span className="font-bold">{item.productId.name}</span>
                    <br />
                    {item.productId.price} BDT <br />
                    Quantity: {item.quantity}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdateCartItem(item._id, item.productId._id, item.quantity + 1)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleUpdateCartItem(item._id, item.productId._id, item.quantity - 1)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleRemoveCartItem(item._id)}
                    className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Remove
                  </button>
                </div>
                <span>{item.productId.price * item.quantity} BDT</span>
              </li>
            ))}
          </ul>
          {/* Display total price and checkout button */}
          <div className="mt-4 flex justify-between items-center">
            <span className="font-bold text-lg">Total: {calculateTotalPrice()} BDT</span>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart
