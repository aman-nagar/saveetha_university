export default function Navbar({ items }) {
  return (
    <nav style={{ background: "var(--color-primary)" }}>

      <div className="max-w-7xl mx-auto flex gap-6 px-4 py-3 text-white font-medium">

        {items.map((item) => (
          <a
            key={item.label}
            href={item.url}
            className="hover:text-accent transition"
          >
            {item.label}
          </a>
        ))}

      </div>

    </nav>
  );
}