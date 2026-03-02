import React, { useState } from "react";
import { 
  FaRegNewspaper, 
  FaBullhorn, 
  FaUniversity, 
  FaArrowRight, 
  FaCalendarAlt,
  FaSearch
} from "react-icons/fa";

const CategoryIcon = ({ type }) => {
  switch (type) {
    case "Campus": return <FaRegNewspaper className="text-accent" />;
    case "Announcements": return <FaBullhorn className="text-secondary" />;
    default: return <FaUniversity className="text-primary" />;
  }
};

function NewsCard({ item, type }) {
  return (
    <div className="group bg-surface border border-border p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-4 cursor-pointer relative overflow-hidden hover:-translate-y-1">
      {/* Background glow on hover */}
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
      
      <div className="flex justify-between items-start">
        <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-accent/20 transition-colors">
          <CategoryIcon type={type} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full">
          {type}
        </span>
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg md:text-xl font-bold text-primary leading-tight mb-3 group-hover:text-accent transition-colors">
          {item.title}
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="flex items-center gap-2 text-muted text-xs font-medium">
            <FaCalendarAlt className="text-accent/60" /> {item.date}
          </span>
          <FaArrowRight className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={14} />
        </div>
      </div>
    </div>
  );
}

export default function News() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const newsData = {
    Campus: [
      { title: "Diploma exam notice for session 2025-26", date: "08/12/2025" },
      { title: "Promotion notice for senior faculty teachers", date: "21/11/2025" },
      { title: "Annual Merit Scholarship notice", date: "30/10/2025" },
    ],
    Announcements: [
      { title: "Project Associate recruitment for Research Lab", date: "16/01/2026" },
      { title: "Research incentive notice for Ph.D. Scholars", date: "25/12/2025" },
      { title: "Assistant professor recruitment drive", date: "18/11/2025" },
    ],
    University: [
      { title: "Registration instructions for new students", date: "07/02/2026" },
      { title: "Semester course notice & registration", date: "07/02/2026" },
      { title: "National Education Policy (NEP) updates", date: "06/02/2026" },
    ],
  };

  const tabs = ["All", "Campus", "Announcements", "University"];

  return (
    <div className="min-h-screen bg-bg">
      {/* 1. Header Section */}
      <section className="relative bg-primary py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs">Official Portal</span>
              <h1 className="text-4xl md:text-7xl font-heading font-black text-white mt-4 tracking-tighter">
                Latest <span className="text-accent italic">Updates</span>
              </h1>
            </div>
            
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Search notices..."
                className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all backdrop-blur-sm"
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              />
              <FaSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tab Navigation */}
      <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6 md:gap-12 py-4 overflow-x-auto no-scrollbar scroll-smooth">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs md:text-sm font-black uppercase tracking-widest transition-all relative py-2 whitespace-nowrap ${
                  activeTab === tab ? "text-primary" : "text-muted hover:text-primary"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. News Feed Grid */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(newsData).map(([category, items]) => (
              (activeTab === "All" || activeTab === category) && 
              items
                .filter(item => item.title.toLowerCase().includes(searchQuery))
                .map((item, i) => (
                  <NewsCard key={`${category}-${i}`} item={item} type={category} />
                ))
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}