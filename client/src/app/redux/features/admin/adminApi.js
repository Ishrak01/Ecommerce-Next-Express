import { apiSlice } from "../api/apiSlice";


export const adminApi= apiSlice.injectEndpoints({

  

  tagTypes:['post','update','delete'],
  endpoints: (builder)=> ({


   
      getAllProduct: builder.query({ 
        query:(data)=> ({
          url: "/getProducts",
          method: 'GET',
          body: data,
          
        }) ,
        providesTags:['post','delete','update'],
       
      }),

  

    postProducts: builder.mutation({
      query:(data)=> ({
        url: "/postProducts",
        method: "POST",
        body: data,
        
      }),
      invalidatesTags:["post"]

    }),

    updateProduct: builder.mutation({
      query:({id,data})=>({
        url: `/updateProducts/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags:["update"]
    }),

    
    deleteProduct: builder.mutation({
      query:(id)=>({
        url: `/deleteProducts/${id}`,
       
        method: "DELETE",
        
        
  }),
  invalidatesTags:["delete"]
  
}),
singleProduct: builder.query({
    query:(id)=>({
       url:`/getSingleProduct/${id}`,
     
     })

  }),


  //category api///////////////////////////////////////////
category: builder.mutation({
  query:(data)=> ({
    url: "/postcategory",
    method: "POST",
    body: data
  })
}),

getCategory:builder.query({
  query:(data)=> ({
    url: "/getcategory",
    method: 'GET',
    body: data,
    
  }) ,

}),
deleteCategory:builder.mutation({
  query:(id)=>({
    url: `/deletecategory/${id}`,
   
    method: "DELETE",
})
}),

updateCategory:builder.mutation({
  query:({id,data})=>({
    url: `/updateCategory/${id}`,
        method: "PUT",
        body: data

  })
}),

getProductsByCategory:builder.query({
  query:(id)=>({
    url: `/getProductsByCategory/${id}`,
  
  
  })
}),

searchProduct:builder.mutation({

  query:(data)=>({
    url: "/searchProduct",
    method: "POST",
    body: data
   
  })
})

  })
})

export const {usePostProductsMutation,useUpdateProductMutation,useDeleteProductMutation,useGetAllProductQuery,useSingleProductQuery,useCategoryMutation,useGetCategoryQuery,useDeleteCategoryMutation,useUpdateCategoryMutation,useGetProductsByCategoryQuery,useSearchProductMutation}=adminApi