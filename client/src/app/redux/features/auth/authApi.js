import { apiSlice } from './../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi= apiSlice.injectEndpoints({

  tagTypes:['update'],
  endpoints: (builder)=> ({
    register: builder.mutation({
      query:(data)=> ({
        url: "/register",
        method: "POST",
        body: data
      }),

      
    }),


   login: builder.mutation({
      query:(data)=> ({
        url: "/login",
        method: "POST",
        body: data
      }),

     
  

      async onQueryStarted(args,{queryFulfilled,dispatch}){

       

        try {
          const result = await queryFulfilled;
        
          // Check if the result contains a valid token
          if (result.data && result.data.token) {
            localStorage.setItem("auth", JSON.stringify({
              token: result.data.token,
              user: result.data.user,
            }));
        
            dispatch(userLoggedIn({
              token: result.data.token,
              user: result.data.user,
            }));
          } else {
            // Handle the case where the login was not successful
            console.error("Login failed. Invalid token received.");
            // You can dispatch an action to handle the failed login state if needed
            // dispatch(handleLoginError());
          }



        } catch (error) {
          
        }

      }
    }),
    

    forgotPassword: builder.mutation({
      query:(data)=> ({
        url: "/forgotPassword",
        method: "POST",
        body: data
      }),
    }),

    resetPassword: builder.mutation({
      query:(data)=> ({
        url: `/resetPassword/${data.id}/${data.token}`,
        method: "POST",
        body: data
      }),
    }),

    updateProfile:builder.mutation({
      query:(data)=>({
        url:"/updateProfile",
        method:'PUT',
        body:data
      }),
      invalidatesTags:['update']
    }),

    getProfile:builder.query({
      query:(data)=>({
        url:'/getProfile',
        method:"GET",
        body:data
      }),
      providesTags:['update']
    }),
    
  })
})


export const{useRegisterMutation,useLoginMutation,useForgotPasswordMutation,useResetPasswordMutation,useGetProfileQuery,useUpdateProfileMutation}=authApi