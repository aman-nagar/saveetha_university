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
import AnnouncementPopup from "../../components/public/AnnouncementPopup";
import { SEOHelmet } from "@/components/SEO/SEOHelmet";

import AboutUsSection from "../../components/public/about/AboutUsSection";
import { publicMock } from "../../data/header.mock";
import VideoSection from "../../components/public/sections/VideoSection";
import AcademicStreams from "../../components/public/sections/AcademicStreams";
import ImageSection from "../../components/public/sections/ImageScetion";
import LeadingSection from "../../components/public/sections/LeadingSection";
import AccreditationSection from "../../components/public/sections/AccreditationSection";

export default function Home() {
  return (
    <>
      <SEOHelmet page="home" />
      <div className="bg-bg ">
        <AnnouncementPopup />
        <HeroSlider />
        <Hero />
        <AboutUsSection data={publicMock.aboutUs} />
        <VideoSection />
        <HighlightNews />
        {/* <Stats /> */}
        <WhyUS />
        {/* <AcademicStreams data={publicMock.home.academicStreams} /> */}

        <AccreditationSection />
        <Programs />
        <CTA />
        <AcademicPhotoGallery />
        <LeadingSection />
        <StudentReviews />
        <ImageSection />
      </div>
    </>
  );
}
