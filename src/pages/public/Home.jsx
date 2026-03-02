// src/pages/public/Home.jsx
import React from "react";
import Hero from "../../components/public/Hero";
import WhyUS from "../../components/public/WhyUS";
import { HeroSlider } from "../../components/public/HeroSlider";
import Stats from "../../components/public/Stats";
import Programs from "../../components/public/Programs";
import CTA from "../../components/public/CTA";
import HighlightNews from "../../components/public/HighlightNews";
import AcademicPhotoGallery from "./sections/AcademicPhotoGallery";
import StudentReviews from "./sections/StudentReviews";
import StepIntoaryavrat from "./sections/StepIntoAryavart";
import AcademicStreams from "./sections/AcademicStreams";

export default function Home() {
  return (
    <div className="bg-bg">
      <Hero />
      <HeroSlider />
      <HighlightNews />
      <Stats />
      <WhyUS />
      <Programs />
      <AcademicPhotoGallery />
      <StudentReviews />
      <StepIntoaryavrat />
      <AcademicStreams />
      <CTA />
    </div>
  );
}
