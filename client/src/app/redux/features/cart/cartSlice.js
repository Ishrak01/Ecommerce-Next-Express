import { createSlice } from "@reduxjs/toolkit"



const initialState= {
  
  cartItems: [],
  Quantity: 0,
  cartTotalAmount: 0,
}


const cartSlice=createSlice ({
  name: 'cart',
  initialState, 
  reducers: {},
})


export const {}= cartSlice.actions

export default cartSlice.reducer