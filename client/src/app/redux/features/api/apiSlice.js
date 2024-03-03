"use client"

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice= createApi({
  reducerPath: 'api',
  
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5500",
    prepareHeaders: (headers) => {
       // Retrieve the token from local storage
       const auth = localStorage.getItem('auth');
       if(auth){
        const token = JSON.parse(auth).token;
        if(token){
         // Add your common security header here
         headers.set('Authorization', `Bearer ${token}`);
        }
       }
       
      
      return headers;
    }



}),

 
  endpoints:(builder)=> ({}),
})

