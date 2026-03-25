import React from "react";
import { motion } from "framer-motion";
// Importing modern, solid icons from FontAwesome 6
import {
  FaScaleBalanced,
  FaLeaf,
  FaUserNurse,
  FaUsers,
  FaBookOpen,
  FaLaptopCode,
  FaChartLine,
  FaGears,
} from "react-icons/fa6";

// Helper function to map School IDs to specific Icons
const getStreamIcon = (id, className) => {
  switch (id) {
    case 1:
      return <FaScaleBalanced className={className} />;
    case 2:
      return <FaLeaf className={className} />;
    case 3:
      return <FaUserNurse className={className} />;
    case 4:
      return <FaUsers className={className} />;
    case 5:
      return <FaBookOpen className={className} />;
    case 6:
      return <FaLaptopCode className={className} />;
    case 7:
      return <FaChartLine className={className} />;
    case 8:
      return <FaGears className={className} />;
    default:
      return <FaBookOpen className={className} />;
  }
};

const AcademicStreams = ({ data }) => {
  if (!data || !data.streams) return null;
  const { title, highlightTitle, subtitle, streams } = data;

  return (
    <section className="py-20 lg:py-28 bg-bg relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-accent uppercase tracking-widest text-xs font-bold">
              {title}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-primary leading-tight mb-6">
            {highlightTitle}
          </h2>
          <p className="text-muted text-base md:text-lg leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[220px] md:auto-rows-[260px]">
          {streams.slice(0, 8).map((stream, index) => (
            <BentoCard key={stream.id || index} stream={stream} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BentoCard = ({ stream, index }) => {
  const isLarge = index === 0; // Top Left: 2x2
  const isWide = index === 7; // Bottom Right: 2x1

  let gridClasses = "col-span-1 row-span-1";
  if (isLarge) gridClasses = "md:col-span-2 md:row-span-2";
  if (isWide) gridClasses = "md:col-span-2 row-span-1";

  return (
    <motion.div
      whileHover="hover"
      className={`group relative overflow-hidden rounded-[2rem] bg-surface border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex ${gridClasses}`}
    >
      {/* LAYOUT 1: The Large Featured Card (Index 0) - NOW WITH IMAGE */}
      {isLarge && (
        <>
          {/* Background Image with slight zoom on hover */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${stream.image})` }}
          />
          {/* Smooth dark gradient overlay so text and icons pop */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-primary/20 transition-opacity duration-500 group-hover:opacity-90" />

          <div className="relative z-10 flex flex-col justify-end p-8 w-full h-full">
            {/* Frosted Glass Icon Box in Top Left */}
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-auto border border-white/20 text-white group-hover:bg-accent group-hover:text-primary transition-colors duration-500 shadow-lg">
              {getStreamIcon(stream.id, "w-8 h-8")}
            </div>

            <div className="mt-24">
              <span className="inline-block px-4 py-1.5 bg-accent text-primary text-xs font-black uppercase tracking-widest rounded-full mb-4 w-max shadow-md">
                {stream.approval}
              </span>
              <h3 className="text-3xl md:text-4xl font-heading font-black text-white mb-3 drop-shadow-md">
                {stream.name}
              </h3>
              <p className="text-white/90 font-medium text-sm md:text-base leading-relaxed max-w-md drop-shadow-sm">
                {stream.levels}
              </p>
            </div>
          </div>
        </>
      )}

      {/* LAYOUT 2: The Wide Footer Card (Index 7) - SOLID COLOR + LARGE ICON */}
      {isWide && !isLarge && (
        <div className="w-full h-full flex flex-col sm:flex-row items-center p-6 sm:p-8 bg-primary relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-500" />

          <div className="relative z-10 flex-1 pr-6">
            <span className="text-accent text-[10px] font-black uppercase tracking-widest block mb-2">
              {stream.approval}
            </span>
            <h3 className="text-2xl font-heading font-black text-white mb-2">
              {stream.name}
            </h3>
            <p className="text-white/60 text-sm font-medium line-clamp-2">
              {stream.levels}
            </p>
          </div>

          <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center shadow-lg mt-4 sm:mt-0 group-hover:bg-accent group-hover:border-accent transition-colors duration-500">
            {getStreamIcon(
              stream.id,
              "w-12 h-12 sm:w-16 sm:h-16 text-white/50 group-hover:text-primary transition-colors duration-500",
            )}
          </div>
        </div>
      )}

      {/* LAYOUT 3: Standard Square Cards (Indices 1-6) - MINIMAL + SMALL ICON */}
      {!isLarge && !isWide && (
        <div className="w-full h-full flex flex-col p-6 sm:p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 flex items-start justify-between mb-auto">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent transition-colors duration-500 shadow-sm">
              {getStreamIcon(stream.id, "w-6 h-6 text-primary")}
            </div>

            <span className="text-[9px] font-bold uppercase tracking-widest text-muted bg-bg px-2.5 py-1 rounded-md border border-border/50">
              {stream.approval}
            </span>
          </div>

          <div className="relative z-10 mt-6">
            <h3 className="text-lg md:text-xl font-heading font-bold text-primary group-hover:text-accent transition-colors duration-300 leading-tight mb-2">
              {stream.name}
            </h3>
            <p className="text-muted text-xs font-medium line-clamp-2">
              {stream.levels}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AcademicStreams;
