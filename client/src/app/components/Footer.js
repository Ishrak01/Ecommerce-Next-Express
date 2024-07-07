import Link from "next/link";
const Footer = () => {
  return (
    <footer className=" bg-red-500 text-white py-8">
      <div className=" mx-[80px] flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Hasin Ishrak</h2>
          <p className="text-sm">Providing quality products since 2024</p>
        </div>

        <div className="flex flex-wrap space-x-4">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
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

      
      </div>
    </footer>
  );
};

export default Footer;
