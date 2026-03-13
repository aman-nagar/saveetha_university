export default function LeadershipSlide({ profile }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-6 py-12">

      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
        }}
      />

      <div className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">

        {/* Profile image */}
        <div className="flex-shrink-0">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 object-cover shadow-xl"
            style={{ borderColor: "var(--color-accent)" }}
          />
        </div>

        {/* Testimonial */}
        <div className="text-white text-center md:text-left">

          <p className="italic leading-relaxed text-sm md:text-base mb-4">
            “{profile.testimonial}”
          </p>

          <p className="font-semibold text-lg">{profile.name}</p>

          <p className="text-sm" style={{ color: "var(--color-accent)" }}>
            {profile.title}
          </p>

        </div>
      </div>
    </div>
  );
}