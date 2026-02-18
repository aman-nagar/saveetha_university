// src/pages/public/Home.jsx
import React from "react";
import Hero from "../../components/public/Hero";
import WhyUS from "../../components/public/WhyUS";
import { HeroSlider } from "../../components/public/HeroSlider";
import Stats from "../../components/public/Stats";
import Programs from "../../components/public/Programs";
import CTA from "../../components/public/CTA";
import HighlightNews from "../../components/public/HighlightNews";

export default function Home() {
  return (
    <div className="bg-bg">
      <Hero />
      <HeroSlider />
      <HighlightNews />
      <Stats />
      <WhyUS />
      <Programs />
      <CTA />
    </div>
  );
}
