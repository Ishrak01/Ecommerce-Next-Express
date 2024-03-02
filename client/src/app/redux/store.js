import { configureStore } from "@reduxjs/toolkit"

import adminReducer from "./features/admin/adminSlice"
import { apiSlice } from "./features/api/apiSlice"
import cartReducer from "./features/cart/cartSlice"


const store= configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    
    cart:cartReducer,
    admin:adminReducer,
   
  },

  devTools:"",

  middleware: (GetDefaultMiddleware) => GetDefaultMiddleware().concat(apiSlice.middleware),
})

export default store
