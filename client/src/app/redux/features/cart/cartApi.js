import { apiSlice } from "../api/apiSlice";

export const cartApi= apiSlice.injectEndpoints({
  
  tagTypes:["cart","delete","update","price"],
  endpoints:(builder)=>({
  getCart:builder.query({
    query:(userId)=>({
      url: `/getAllCartItems/${userId}`,
      method: 'GET',
      
    }),
    
    providesTags: ['cart','delete','update']
  }),

  addToCart: builder.mutation({
    query: ({userId, productId }) => ({
      url: '/addToCart',
      method: 'POST',
      body: {userId, productId},
    }),
    invalidatesTags:['cart','price']
  }),

  updateCartItem: builder.mutation({
    query: ({ cartItemId, productId, quantity }) => ({
      url: `/updateCartItem/${cartItemId}`,
      method: 'PUT',
      body: { productId, quantity },
    }),
    invalidatesTags:['update','price']
  }),

  removeCartItem: builder.mutation({
    query: (cartItemId) => ({
     
      url: `/deleteCartItem/${cartItemId}`,
      method: 'DELETE',
    }),
    invalidatesTags:['delete'],
   
  }),

  getTotalPrice:builder.query({
    query:(id)=>({
      url:`/getTotalPrice/${id}`,
      method:"GET"
    }),
      
    providesTags: ['price','cart']
    
  }),

  
  orderCreate:builder.mutation({
    query:(data)=>({
      url: "/orderCreate",
      method: 'POST',
      body:data
    }),
  
 
  }),

})

  })


export const {useGetCartQuery,useAddToCartMutation,useUpdateCartItemMutation,useRemoveCartItemMutation,useGetTotalPriceQuery,useOrderCreateMutation}=cartApi