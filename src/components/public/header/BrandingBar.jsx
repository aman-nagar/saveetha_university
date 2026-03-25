// src/components/public/header/BrandingBar.jsx
import { Link } from "react-router-dom";
import { usePublicContent } from "../../../hooks/usePublicContent";

export default function BrandingBar({ data }) {
  const { siteDetails } = usePublicContent();
  if (!data) return null;

  return (
    <div className="bg-white border-b border-slate-200 w-full shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 lg:py-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-5">
        <div className="flex flex-row items-center text-left gap-3 sm:gap-4 lg:gap-6 w-full lg:w-auto">
          <img
            src={siteDetails.additional_logo}
            alt="university logo"
            className="h-12 sm:h-16 lg:h-20 w-auto object-contain shrink-0"
          />

          <div className="flex flex-col justify-center min-w-0">
            <h1
              className="font-black text-lg sm:text-2xl lg:text-3xl leading-none tracking-tight text-slate-900 truncate"
              style={{ color: "var(--color-primary)" }}
            >
              {data.universityName}
            </h1>

            {/* <p className="text-[10px] sm:text-xs lg:text-sm text-slate-600 font-semibold leading-tight mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-none">
              {data.tagline}
            </p>

            <p className="text-[8px] sm:text-[10px] text-slate-600 font-bold leading-none mt-1 sm:mt-1.5 bg-slate-100 border border-slate-200 inline-block self-start px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded-md uppercase tracking-wide w-max">
              {data.recognition}
            </p> */}
          </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-8 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-slate-100 pt-3 lg:pt-0 shrink-0">
          <Link
            to="/apply-admission"
            className="inline-flex items-center justify-center px-6 py-2 sm:px-8 sm:py-3 text-xs sm:text-sm font-bold text-white transition-all duration-300 bg-indigo-600 rounded-full shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 uppercase tracking-wider w-full lg:w-auto"
          >
            Admission 2026
          </Link>
        </div>
      </div>
    </div>
  );
}
