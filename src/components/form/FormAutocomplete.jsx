export default function FormAutocomplete({
  label,
  value,
  onChange,
  results = [],
  showResults = false,
  onSelect,
  placeholder = "Search...",
  renderItem,
}) {
  return (
    <div className="relative space-y-1.5">
      {label && (
        <label className="text-sm font-semibold text-text-muted block">
          {label}
        </label>
      )}

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-border rounded-lg px-3 py-2 bg-bg outline-none focus:ring-2 focus:ring-accent"
      />

      {showResults && results.length > 0 && (
        <div className="absolute z-50 w-full bg-surface border border-border rounded-lg shadow-xl mt-1 max-h-48 overflow-auto">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="p-3 hover:bg-accent/10 cursor-pointer text-sm border-b border-border"
            >
              {renderItem ? renderItem(item) : item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
