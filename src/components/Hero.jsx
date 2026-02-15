// components/HeroSection.jsx
import React, { useState, useEffect } from "react";

const HeroSection = ({ heroData = {}, latestNews = [], events = [] }) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Update time for demo purposes
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Default hero data structure
  const defaultHeroData = {
    universityName: "Aryavart International University",
    establishedBy:
      "Established by State Legislature of Government of Tripura by Act No 03 of 2023",
    recognition: "Recognised Under Section 2(f) of UGC Act, 1956.",
    tagline: "Building Skilled Healthcare & Pharma Professionals",
    description:
      "Advance your medical career with AIU's comprehensive programs — BHM, BMLT, DMLT, BFND, B.Pharma & D.Pharma designed with hands-on clinical training, modern labs, and industry-oriented learning to prepare you for real-world medical and pharmaceutical careers.",
    ctaText: "ADMISSION OPEN",
    ctaLink: "/admission",
    academicYear: "2025 - 2026",
    videoThumbnail: "/images/video-thumbnail.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example",
  };

  // Default latest news
  const defaultNews = [
    {
      id: 1,
      title:
        "NOTICE INVITING APPLICATIONS FOR APPOINTMENT OF VICE CHANCELLOR FOR JANANAYAK CHANDRA SHEKHAR UNIVERSITY, BALLIA (U.P.)",
      date: "2024-02-14",
      link: "#",
      type: "pdf",
    },
    {
      id: 2,
      title: "Admission Open for 2025-26 Academic Year",
      date: "2024-02-10",
      link: "#",
    },
    {
      id: 3,
      title: "International Conference on Medical Sciences",
      date: "2024-02-05",
      link: "#",
    },
    {
      id: 4,
      title: "Placement Drive 2024 Registration Open",
      date: "2024-02-01",
      link: "#",
    },
  ];

  // Default events
  const defaultEvents = [
    {
      id: 1,
      title: "Teachers' Day Celebration",
      date: "2025-09-05",
      type: "event",
    },
    {
      id: 2,
      title: "Personality Development Workshop",
      date: "2025-09-11",
      type: "workshop",
    },
    { id: 3, title: "Engineer's Day", date: "2025-09-15", type: "event" },
    { id: 4, title: "Fresher's Party", date: "2025-09-25", type: "social" },
  ];

  const data = { ...defaultHeroData, ...heroData };
  const news = latestNews.length > 0 ? latestNews : defaultNews;
  const eventList = events.length > 0 ? events : defaultEvents;

  // Format date for display
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Main Hero Content - Mobile First */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Main Content (2/3 on desktop) */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* University Header */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 leading-tight">
                {data.universityName}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 border-l-4 border-blue-600 pl-3">
                {data.establishedBy}
              </p>
              <p className="text-xs sm:text-sm font-medium text-blue-700 bg-blue-50 inline-block px-3 py-1 rounded-full">
                {data.recognition}
              </p>
            </div>

            {/* Tagline & Description */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
                {data.tagline}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={data.ctaLink}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <span className="block text-sm sm:text-base">
                  {data.ctaText}
                </span>
                <span className="block text-xs opacity-90 mt-1">
                  Click Here To Enroll Now!
                </span>
              </a>

              <a
                href="#programs"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg text-center transition-all"
              >
                Explore Programs
              </a>
            </div>

            {/* Academic Year */}
            <div className="text-sm text-gray-500 font-medium">
              Academic Year: {data.academicYear}
            </div>

            {/* Mobile Video Player - Shows on mobile/tablet, hidden on desktop */}
            <div className="lg:hidden mt-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div
                  className="relative aspect-video bg-gray-900 group cursor-pointer"
                  onClick={() => setVideoPlaying(!videoPlaying)}
                >
                  {!videoPlaying ? (
                    <>
                      <img
                        src={data.videoThumbnail || "/api/placeholder/640/360"}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-all group-hover:scale-110 shadow-xl">
                          <svg
                            className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        <span>0:00 / 1:40</span>
                      </div>
                    </>
                  ) : (
                    <video
                      controls
                      autoPlay
                      className="w-full h-full"
                      src={data.videoUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-xs text-gray-600 font-medium">
                    Campus Tour Video
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar (1/3 on desktop) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Desktop Video Player - Hidden on mobile/tablet */}
            <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
              <div
                className="relative aspect-video bg-gray-900 group cursor-pointer"
                onClick={() => setVideoPlaying(!videoPlaying)}
              >
                {!videoPlaying ? (
                  <>
                    <img
                      src={data.videoThumbnail || "/api/placeholder/640/360"}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-all group-hover:scale-110 shadow-xl">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      <span>0:00 / 1:40</span>
                    </div>
                  </>
                ) : (
                  <video
                    controls
                    autoPlay
                    className="w-full h-full"
                    src={data.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <p className="text-xs text-gray-600 font-medium">
                  Campus Tour Video
                </p>
              </div>
            </div>

            {/* Latest News Widget */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-600 text-white px-4 py-3">
                <h3 className="font-semibold text-sm sm:text-base flex items-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  Latest News
                </h3>
              </div>
              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {news.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      {item.type === "pdf" && (
                        <span className="text-red-500 text-xs font-bold px-1.5 py-0.5 bg-red-50 rounded">
                          PDF
                        </span>
                      )}
                      <p className="text-xs sm:text-sm text-gray-700 flex-1 line-clamp-2">
                        {item.title}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </a>
                ))}
              </div>
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                <a
                  href="/news"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center justify-between"
                >
                  View All News
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Event Calendar Widget */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-green-600 text-white px-4 py-3">
                <h3 className="font-semibold text-sm sm:text-base flex items-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                  </svg>
                  Event Calendar
                </h3>
              </div>
              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {eventList.map((event) => (
                  <div key={event.id} className="px-4 py-3 hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 text-center">
                        <div className="text-sm font-bold text-gray-800">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-700">
                          {event.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 capitalize">
                          {event.type}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                <a
                  href="/events"
                  className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center justify-between"
                >
                  View Full Calendar
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Career Opportunity Widget */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-4 py-4">
                <h3 className="font-semibold text-sm sm:text-base mb-2 flex items-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 4.6c0 1.3-1.1 2.4-2.4 2.4H8.4C7.1 19 6 17.9 6 16.6c0-2.2 3-4 6-4s6 1.8 6 4z" />
                  </svg>
                  Career Opportunity
                </h3>
                <p className="text-xs sm:text-sm opacity-90 mb-3">
                  Faculty positions open in multiple departments
                </p>
                <a
                  href="/careers"
                  className="inline-block bg-white text-purple-700 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Apply Now →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner - Mobile optimized */}
        <div className="mt-8 lg:mt-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6">
            <div className="flex items-center space-x-3 mb-3 sm:mb-0">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <div>
                <h4 className="font-bold text-sm sm:text-base">
                  RAGGING IN ANY FORM IS STRICTLY PROHIBITED
                </h4>
                <p className="text-xs opacity-90">
                  National Anti-Ragging Helpline: 1800-180-5522 (24x7)
                </p>
              </div>
            </div>
            <a
              href="/anti-ragging"
              className="bg-white text-blue-700 text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Report Incident
            </a>
          </div>
        </div>

        {/* Current Time Display - Mobile optimized */}
        <div className="mt-4 text-right text-xs text-gray-400">
          Last updated: {currentTime}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
