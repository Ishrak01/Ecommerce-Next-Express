import { apiSlice } from './../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi= apiSlice.injectEndpoints({

  
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
          const result=await queryFulfilled

          localStorage.setItem("auth", JSON.stringify({
            token: result.data.token,
            user:result.data.user,
          }))

          dispatch(userLoggedIn({
           token: result.data.token,
            user:result.data.user,
          }
            
          ))



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
  })
})


export const{useRegisterMutation,useLoginMutation,useForgotPasswordMutation,useResetPasswordMutation}=authApi