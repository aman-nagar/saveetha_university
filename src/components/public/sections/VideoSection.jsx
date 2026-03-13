// src/components/public/VideoSection.jsx

export default function VideoSection({ videoUrl }) {
  if (!videoUrl) return null;

  // Convert standard watch link to embed link if necessary
  const getEmbedUrl = (url) => {
    if (url.includes("youtube.com/embed")) return url;
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&mute=1`;
  };

  return (
    <section className="w-full h-[50vh] min-h-[300px] md:h-[60vh] bg-black overflow-hidden relative">
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={getEmbedUrl(videoUrl)}
        title="University Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      
      {/* Optional Overlay to match your university theme */}
      <div className="absolute inset-0 pointer-events-none border-y-4 border-accent/20"></div>
    </section>
  );
}