// src/pages/StudentDashboard.jsx
import React from "react";
import { Card } from "flowbite-react";
import {
  HiAcademicCap,
  HiCalendar,
  HiCash,
  HiChartBar,
  HiClock,
} from "react-icons/hi";

export default function StudentDashboard() {
  // Dummy data (later you'll replace with real API data)
  const student = {
    name: "Aman Nagar",
    rollNo: "SU2023CS045",
    branch: "Computer Science & Engineering",
    semester: "6th Semester",
    cgpa: "8.4",
    attendance: "92%",
  };

  const upcomingEvents = [
    { title: "Mid Semester Exam", date: "March 10–14, 2026" },
    { title: "Cultural Fest – Srijan", date: "March 20–22, 2026" },
    { title: "Fee Payment Deadline", date: "March 31, 2026" },
  ];

  const quickStats = [
    { icon: HiAcademicCap, label: "Current SGPA", value: "8.7" },
    { icon: HiClock, label: "Attendance", value: student.attendance },
    { icon: HiCash, label: "Pending Fee", value: "₹ 0" },
    { icon: HiChartBar, label: "Backlogs", value: "0" },
  ];

  return (
    <div className="min-h-screen bg-bg text-text p-4 md:p-6">
      {/* Header / Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          Welcome back, {student.name.split(" ")[0]}
        </h1>
        <p className="text-muted mt-1">
          {student.rollNo} • {student.branch}
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, idx) => (
          <Card
            key={idx}
            className="border-l-4 border-accent hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <stat.icon className="w-8 h-8 text-accent" />
              <div>
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left – Student Info Card */}
        <Card className="lg:col-span-1 border-t-4 border-primary">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <HiAcademicCap className="w-5 h-5 text-primary" />
            Student Profile
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Name</span>
              <span className="font-medium">{student.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Roll No</span>
              <span className="font-medium">{student.rollNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Semester</span>
              <span className="font-medium">{student.semester}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">CGPA</span>
              <span className="font-semibold text-success">{student.cgpa}</span>
            </div>
          </div>
        </Card>

        {/* Center – Upcoming Events */}
        <Card className="lg:col-span-2 border-t-4 border-secondary">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <HiCalendar className="w-5 h-5 text-secondary" />
            Upcoming Important Dates
          </h2>

          <div className="space-y-4">
            {upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 bg-surface/50 rounded-lg border border-border hover:bg-surface transition"
              >
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted">{event.date}</p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-accent/10 text-accent rounded-full">
                  Soon
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Optional small footer note */}
      <p className="text-center text-muted text-sm mt-10">
        Saveetha University Student Portal • Data will be updated from API soon
      </p>
    </div>
  );
}
