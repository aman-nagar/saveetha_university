import { FaSearch } from "react-icons/fa";

export default function SidebarSearch({
  isCollapsed,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div
      className={`overflow-hidden transition-[height] duration-200 ${
        isCollapsed ? "h-0" : "h-auto"
      }`}
    >
      <div className="p-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-accent/50 outline-none"
          />
          <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40 w-3 h-3" />
        </div>
      </div>
    </div>
  );
}
