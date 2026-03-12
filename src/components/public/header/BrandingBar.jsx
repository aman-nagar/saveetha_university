export default function BrandingBar({ data }) {
  return (
    <div className="bg-white border-b border-border">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">

        <div className="flex items-center gap-4">

          <img
            src={data.logo}
            alt="university logo"
            className="h-16 w-auto"
          />

          <div>
            <h1
              className="font-bold text-3xl"
              style={{ color: "var(--color-primary)" }}
            >
              {data.universityName}
            </h1>

            <p className="text-sm text-muted">
              {data.tagline}
            </p>

            <p className="text-xs text-muted">
              {data.recognition}
            </p>
          </div>

        </div>

        {data.rightBanner && (
          <img
            src={data.rightBanner}
            className="h-20 object-contain"
          />
        )}

      </div>

    </div>
  );
}