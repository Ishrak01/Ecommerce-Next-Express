"use client"
import { useGetProfileQuery } from '@/app/redux/features/auth/authApi';
import { useGetTotalPriceQuery, useOrderCreateMutation } from '@/app/redux/features/cart/cartApi';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Order = ({params}) => {
  const { id } = params;

  const router = useRouter();
  const { data: userProfile, error:profileError, isLoading:profileLoading } = useGetProfileQuery();
  
  const [orderCreate, { data:orderData,error:orderError,isLoading:orderLoading }] =useOrderCreateMutation() // Assuming this is the correct mutation hook

  const {data: totalPrice, error: priceError} =useGetTotalPriceQuery(id)
  console.log(totalPrice)

  const handleOrder = async (e) => {
    e.preventDefault();
  
    try {
      // Assuming orderCreate mutation takes an object with necessary properties
      const orderVariables = {
        name: userProfile.name,
        address: userProfile.address,
        email: userProfile.email,
        phone: userProfile.phone,
        amount: totalPrice.totalCost,
        // Add any other necessary properties for the mutation
      };
  
      // Call the orderCreate mutation with the variables
      const { data: orderMutationData } = await orderCreate(orderVariables);
  
      // Check if the mutation was successful
      if (orderMutationData) {
        toast.success('order placing!')
  
        // You can also redirect or perform other actions based on the result
        if (orderMutationData.url) {
          window.location.href = orderMutationData.url; // Redirect to the fetched URL
        }
      }
    } catch (error) {
      // Handle errors, you can log them or show an error message to the user
      console.error("Error placing order:", error);
    }
  };
  
  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-opacity-25 border-r-4 border-gray-300 h-16 w-16 mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
    }

  


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-100">
        <h1 className="text-2xl font-bold mb-6">Place Your Order</h1>
        {userProfile && (
        <div className="flex flex-col mb-4">
        <label htmlFor="phone" className="text-sm font-medium text-red-600 mb-2">
          User Information
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-red-600">
              Name:
            </label>
            <div className="text-gray-800">{userProfile.name}</div>
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-red-600">
              Address:
            </label>
            <div className="text-gray-800">{userProfile.address}</div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-red-600">
              Email:
            </label>
            <div className="text-gray-800">{userProfile.email}</div>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-red-600">
              Phone:
            </label>
            <div className="text-gray-800">{userProfile.phone}</div>
            </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-red-600 ">
              Amount:
            </label>
            {
              totalPrice && <div className="text-gray-800">{totalPrice.totalCost} BDT</div>
            }
            
            </div>
        
        </div>
      </div>
      
        )}

<button
        className="bg-blue-500 text-white p-2 rounded-md w-full"
        onClick={handleOrder}
        disabled={orderLoading}
      >
        {orderLoading ? "Placing Order..." : "Pay Now"}
      </button>
      </div>
    </div>
  );
};

export default Order;
