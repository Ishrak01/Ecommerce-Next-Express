
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Hasin Ishrak</h2>
          <p className="text-sm">Providing quality products since 2024</p>
        </div>

        <div className="flex flex-wrap space-x-4">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
          <a href="#" className="hover:text-gray-400">
            Shop
          </a>
          <a href="#" className="hover:text-gray-400">
            About Us
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </div>

        <div className="flex mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-square fa-lg"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white ml-4">
            <i className="fab fa-twitter-square fa-lg"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white ml-4">
            <i className="fab fa-instagram-square fa-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
