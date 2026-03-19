// src/components/public/VideoSection.jsx

export default function VideoSection() {
  return (
    <section className="w-full h-[50vh] min-h-[350px] md:h-[70vh] bg-black overflow-hidden relative group">
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        // Added rel=0 to keep users on your channel and loading="lazy" for speed
        src="https://www.youtube.com/embed/JiIv689sp7s?si=ocKjFlzCMrMa9HY0&rel=0"
        title="University Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>

      {/* Branded University Overlay */}
      <div className="absolute inset-0 pointer-events-none border-y-8 border-accent/10 z-10">
        <div className="absolute top-0 w-full h-px bg-accent/30 shadow-[0_0_15px_rgba(161,42,42,0.5)]"></div>
        <div className="absolute bottom-0 w-full h-px bg-accent/30 shadow-[0_0_15px_rgba(161,42,42,0.5)]"></div>
      </div>

      {/* Subtle Navy Tint to blend with your site theme */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
    </section>
  );
}
