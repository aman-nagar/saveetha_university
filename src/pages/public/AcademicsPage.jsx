// src/pages/public/AcademicsPage.jsx
import React from "react";
import { SEOHelmet } from "@/components/SEO/SEOHelmet";
import AcademicsOverviewSection from "../../components/public/sections/AcademicsOverviewSection";
import ExaminationCommittee from "../../components/public/sections/ExaminationCommittee";

export default function AcademicsPage() {
  return (
    <>
      <SEOHelmet page="academics" />
      <div className="bg-bg min-h-screen">
        <AcademicsOverviewSection />
        <ExaminationCommittee />
      </div>
    </>
  );
}
