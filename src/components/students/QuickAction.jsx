import { FaIdCard, FaFileInvoice, FaPollH, FaDownload } from "react-icons/fa";

const actions = [
  {
    id: "id-card",
    title: "Digital ID Card",
    desc: "Official student identification",
    icon: <FaIdCard />,
    color: "bg-blue-600",
  },
  {
    id: "admit-card",
    title: "Exam Admit Card",
    desc: "Download for upcoming exams",
    icon: <FaFileInvoice />,
    color: "bg-indigo-600",
  },
  {
    id: "results",
    title: "Semester Results",
    desc: "View marks and grade sheets",
    icon: <FaPollH />,
    color: "bg-emerald-600",
  },
];

export default function QuickActions({ enrollmentNo }) {
  const handleAction = (type) => {
    // Logic for PDF generation or fetching results goes here
    alert(`Generating ${type} for ${enrollmentNo}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {actions.map((action) => (
        <div
          key={action.id}
          className="group relative bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
          onClick={() => handleAction(action.id)}
        >
          <div
            className={`${action.color} text-white w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:rotate-6 transition-transform`}
          >
            {action.icon}
          </div>
          <h4 className="text-slate-800 font-bold text-lg">{action.title}</h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            {action.desc}
          </p>

          <div className="mt-4 flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            <FaDownload /> Download PDF
          </div>
        </div>
      ))}
    </div>
  );
}
