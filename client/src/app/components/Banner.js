import { useEffect, useState } from 'react';
import { useGetCategoryQuery } from '../redux/features/admin/adminApi';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: categories } = useGetCategoryQuery();

  useEffect(() => {
    if (Array.isArray(categories) && categories.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % categories.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [categories]);

  return (
    <div className="relative w-4/5 h-[300px] overflow-hidden">
      {categories &&
        categories.map((category, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={category.photo}
              alt={`Category ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4  bg-opacity-50 text-white text-center">
              
             
            </div>
          </div>
        ))}
    </div>
  );
};

export default Banner;
