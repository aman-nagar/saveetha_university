// src/components/center/CenterStatsCard.jsx
export default function CenterStatsCard({
  title,
  value,
  icon,
  color = "blue",
}) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    yellow: "text-yellow-600 bg-yellow-50",
    purple: "text-purple-600 bg-purple-50",
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-5 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
          {/* You can use react-icons here */}
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}
