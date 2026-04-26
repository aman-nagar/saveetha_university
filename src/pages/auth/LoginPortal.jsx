// src/pages/auth/LoginPortal.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaUserGraduate,
  FaUniversity,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

export default function LoginPortal() {
  const navigate = useNavigate();

  const roles = [
    {
      id: "admin",
      title: "Administrator",
      desc: "University Management",
      icon: <FaUserTie />,
      path: "/admin/login",
      color: "from-blue-600 to-indigo-700",
    },
    {
      id: "center",
      title: "WIEP Portal",
      desc: "Branch Management",
      icon: <FaUniversity />,
      path: "/center/login",
      color: "from-emerald-500 to-teal-700",
    },
    {
      id: "student",
      title: "Student Portal",
      desc: "Exam, Admit Cards & Results",
      icon: <FaUserGraduate />,
      path: "/login",
      color: "from-orange-500 to-red-600",
    },
    {
      id: "member",
      title: "Member Portal",
      desc: "Secure dashboard access for members",
      icon: <FaUsers />,
      path: "/member/login",
      color: "from-sky-600 to-blue-800",
    },
  ];

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-text mb-4 font-heading">
            University Portal
          </h1>
          <p className="text-muted text-lg">
            Select your role to access the management system
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(role.path)}
              className="group cursor-pointer bg-surface border border-border p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative Gradient Bar */}
              <div
                className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${role.color}`}
              />

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}
              >
                {role.icon}
              </div>

              <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                {role.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6">
                {role.desc}
              </p>

              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                Login Now{" "}
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
