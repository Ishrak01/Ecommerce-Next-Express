import { createSlice } from "@reduxjs/toolkit"


const initialState={
  items:[],
  status: null, 
}

const adminSlice=createSlice({
  name:"admin",
  initialState,
  reducers: {}

})


export const {}=adminSlice.actions
export default adminSlice.reducer