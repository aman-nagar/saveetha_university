// src/pages/public/Home.jsx
import React from "react";
import Hero from "../../components/public/Hero";
import WhyUS from "../../components/public/WhyUS";
import { HeroSlider } from "../../components/public/HeroSlider";

export default function Home() {
  return (
    <div>
      <Hero />
      <HeroSlider />
      <WhyUS />
    </div>
  );
}
