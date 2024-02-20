import { apiSlice } from "../api/apiSlice";

export const cartApi= apiSlice.injectEndpoints({
  
  tagTypes:["cart","delete","update"],
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
    invalidatesTags:['cart']
  }),

  updateCartItem: builder.mutation({
    query: ({ cartItemId, productId, quantity }) => ({
      url: `/updateCartItem/${cartItemId}`,
      method: 'PUT',
      body: { productId, quantity },
    }),
    invalidatesTags:['update']
  }),

  removeCartItem: builder.mutation({
    query: (cartItemId) => ({
     
      url: `/deleteCartItem/${cartItemId}`,
      method: 'DELETE',
    }),
    invalidatesTags:['delete'],
   
  }),

  })
})

export const {useGetCartQuery,useAddToCartMutation,useUpdateCartItemMutation,useRemoveCartItemMutation}=cartApi