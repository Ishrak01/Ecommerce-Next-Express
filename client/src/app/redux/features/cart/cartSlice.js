import { createSlice } from "@reduxjs/toolkit"



const initialState = {

  cartItems: [],
  quantity: 0,
  cartTotalAmount: 0,
}


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {


    addToCart(state, action) {
      const item = action.payload
      const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        state.cartItems.push({ ...item })
        state.quantity += 1
      }

      state.cartTotalAmount += item.price * item.quantity
    },

    updateCartItem(state, action) {
      const { id, quantity } = action.payload
      const existingItem = state.cartItems.find(cartItem => cartItem.id === id)
      if (existingItem) {
        state.cartTotalAmount -= existingItem.price * existingItem.quantity
        existingItem.quantity = quantity
        state.cartTotalAmount += existingItem.price * quantity

      }
    },

    removeCartItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.id === id);
      if (existingItem) {
        state.cartTotalAmount -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== id);
        state.quantity -= 1;
      }
    },

    clearCart(state) {
      state.cartItems = [];
      state.quantity = 0;
      state.cartTotalAmount = 0;
    },
    setTotalAmount(state, action) {
      state.cartTotalAmount = action.payload;
    },



  },
})


export const { addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  setTotalAmount, } = cartSlice.actions

export default cartSlice.reducer