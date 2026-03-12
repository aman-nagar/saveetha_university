export default function TopBar({ data }) {
  return (
    <div
      className="text-white text-sm"
      style={{ background: "var(--color-primary)" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
        <div className="flex gap-6">
          <span>{data.email}</span>
          <span>{data.phone}</span>
        </div>

        <div className="flex items-center gap-4">
          {data.links.map((link) => (
            <a key={link.label} href={link.url} className="hover:underline">
              {link.label}
            </a>
          ))}

          <a
            href={data.admissionButton.url}
            className="px-3 py-1 rounded-full font-semibold"
            style={{ background: "var(--color-accent)", color: "#000" }}
          >
            {data.admissionButton.label}
          </a>

          {data.languageSelector && (
            <select className="bg-transparent border border-white px-2 py-1 rounded">
              <option>English</option>
              <option>Hindi</option>
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
