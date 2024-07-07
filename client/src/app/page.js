"use client"
import Banner from "./components/Banner";
import Category from "./components/Category";
import Footer from "./components/Footer";
import Products from "./components/Products";





const Home = () => {



  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="animate-spin rounded-full border-t-4 border-opacity-25 border-r-4 border-gray-300 h-16 w-16 mb-4"></div>
  //       <p className="text-gray-600">Loading...</p>
  //     </div>
  //   );
  
  // }


  
  return (

    <div className="">
      <div className="mx-[80px] flex justify-between items-center">
       <Category/>
        <Banner/>
       
        </div>
      <br/>
      <hr/>
      <div><Products/></div>
      <hr/>
      <div><Footer/></div>
      
     
     

        
    </div>
   
     )}


export default Home;
