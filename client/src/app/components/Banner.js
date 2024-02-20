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
    <div className="h-[400px] relative overflow-hidden">
      {categories &&
        categories.map((category, index) => (
          <div
            key={index}
            className={`w-full absolute left-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Add your category content here */}
            <img
              src={category.photo}
              alt={`Category ${index + 1}`}
              className="h-[380px] w-full px-[20px] md:px-[120px]"
            />
            <div className="text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
              <p className="text-sm">{category.description}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Banner;
