// src/components/public/HeroSlider.jsx
import { Carousel } from "flowbite-react";

export function HeroSlider() {
  return (
    <div className="h-[80vh]">
      <Carousel className="!rounded-none">
        <div className="flex h-full items-center justify-center bg-primary relative">
          <img
            src="https://saveethaamaravatiuniversity.ac.in/uploads/slider__17705748893.jpg"
            className="absolute w-full h-full object-cover"
            alt="Campus"
          />
          <div className="absolute inset-0 bg-[var(--color-overlay)]"></div>
          <div className="relative z-10 text-white text-center">
            <h3 className="text-2xl font-bold">Welcome to University</h3>
            <p className="text-lg">Excellence in Education</p>
          </div>
        </div>

        <div className="flex h-full items-center justify-center bg-primary relative">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f"
            alt="Students studying"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[var(--color-overlay)]"></div>
          <div className="relative z-10 text-white text-center">
            <h3 className="text-2xl font-bold">Modern Facilities</h3>
            <p className="text-lg">State-of-the-art campus</p>
          </div>
        </div>

        <div className="flex h-full items-center justify-center bg-primary relative">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
            alt="Graduation ceremony"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[var(--color-overlay)]"></div>
          <div className="relative z-10 text-white text-center">
            <h3 className="text-2xl font-bold">Bright Future</h3>
            <p className="text-lg">Shape your career with us</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
