const page = () => {
  return (
<div>
      
        <title>eBay-like eCommerce</title>
     

      {/* Header Section */}
      <header className="bg-gray-900 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">eBay-like eCommerce</h1>
          {/* Add navigation menu, search bar, etc. */}
        </div>
      </header>

      {/* Featured Products Section */}
      <section className="py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
          {/* Display featured products here */}
        </div>
      </section>

      {/* Trending Deals Section */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Trending Deals</h2>
          {/* Display trending deals here */}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto">
          {/* Add footer content */}
        </div>
      </footer>
    </div>
  );
}

export default page