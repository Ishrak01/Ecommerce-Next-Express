"use client"
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Category from "./components/category";




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

    <div className="h-screen">
      <div><Banner/></div>
      <br/>
      <hr/>
      <div><Category/></div>
      <hr/>
      <div><Footer/></div>
      
     
     

        
    </div>
   
     )}


export default Home;
