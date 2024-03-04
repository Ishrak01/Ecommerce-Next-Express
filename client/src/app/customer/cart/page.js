
"use client"

import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation
} from "@/app/redux/features/cart/cartApi";
import { withAuth } from "@/withAuth";
import Link from "next/link";




const Cart = () => {
  let userId;

  if (typeof window !== 'undefined' && localStorage.getItem("auth")) {
    userId = JSON.parse(localStorage.getItem("auth")).user._id;
  }
  
  const { data: cartItems, isLoading:newLoad } = useGetCartQuery(userId);
  const [updateCartItem, { isLoading: loading }] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  const handleUpdateCartItem = (cartItemId, productId, quantity) => {
    updateCartItem({ cartItemId, productId, quantity: Math.max(quantity, 1) });
  };

  const handleRemoveCartItem = (cartItemId) => {
    removeCartItem(cartItemId);
  };

  const calculateTotalPrice = () => {
    if (!cartItems) {
      return 0;
    }

    return cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-opacity-25 border-r-4 border-gray-300 h-16 w-16 mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
    }
  if (newLoad) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-opacity-25 border-r-4 border-gray-300 h-16 w-16 mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
    }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <p className="text-gray-600 font-extrabold">Your cart is empty!</p>
        <br/>
        
        <Link href="/">Go to Homepage</Link>
      </div>
    );
  }
  



  return (
    <div className="flex  gap-10 mx-20">
    
        <title>Shopping Cart</title>
     
      <div className="w-1/2 p-8 bg-gray-200">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <ul>
        {cartItems?.map((item) => (
            <li key={item.userId} className="mb-4 flex justify-between items-center">
               <div><img className="h-[60px] w-[60px]" src={item.productId.photo} alt={item.productId.name} />
              {item.productId.name} </div>

              <div>
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
               BDT {item.productId.price} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/4   p-8 bg-gray-300">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {/* Add your checkout form or relevant content here */}
        <div className="flex justify-between"> 
        <h1>Subtotal</h1>
        <h1>{calculateTotalPrice()}</h1>
        </div>


       <div className="flex justify-between">
       <p>Shipping Fee</p> <h1>0</h1>
       </div>

<div className="flex justify-between">
<p>Total: </p><p>{calculateTotalPrice()}</p>
</div>
        
        
        <br/>
        <hr/>
        <br/>
        <Link href={`/customer/order/${userId}`} className=" border-4 bg-[#BE185D]">Proceed To Checkout</Link>
      </div>
    </div>
  );
}

export default withAuth(Cart);