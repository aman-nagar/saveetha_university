// src/components/public/HeroSlider.jsx
import { Carousel } from "flowbite-react";

export function HeroSlider() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <div className="flex h-full items-center justify-center bg-gray-400 relative">
          <img
            src="https://saveethaamaravatiuniversity.ac.in/uploads/slider__17705748893.jpg"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-white text-center">
            <h3 className="text-2xl font-bold">Welcome to University</h3>
            <p className="text-lg">Excellence in Education</p>
          </div>
        </div>

        <div className="flex h-full items-center justify-center bg-gray-400 relative">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Students studying"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-white text-center">
            <h3 className="text-2xl font-bold">Modern Facilities</h3>
            <p className="text-lg">State-of-the-art campus</p>
          </div>
        </div>

        <div className="flex h-full items-center justify-center bg-gray-400 relative">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Graduation ceremony"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-white text-center">
            <h3 className="text-2xl font-bold">Bright Future</h3>
            <p className="text-lg">Shape your career with us</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
