// src/pages/public/Home.jsx
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
import AboutUsSection from "../../components/public/about/AboutUsSection";
import { publicMock } from "../../data/header.mock";

export default function Home() {
  return (
    <div className="bg-bg">
      <HeroSlider />
      <Hero />
      <AboutUsSection data={publicMock.aboutUs} />
      <HighlightNews />
      <Stats />
      <WhyUS />
      <Programs />
      <AcademicPhotoGallery />
      <StudentReviews />
      {/* <StepIntoaryavrat /> */}
      <AcademicStreams />
      <CTA />
    </div>
  );
}
