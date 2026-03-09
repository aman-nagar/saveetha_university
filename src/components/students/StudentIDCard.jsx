import React, { useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import html2pdf from 'html2pdf.js';
import { GradientBackground } from '../ui/GradientBackground';
import {
  FaDownload,
  FaPrint,
  FaArrowLeft,
  FaIdCard,
  FaUser,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const StudentIDCard = () => {
  const { studentData } = useAuth();
  const cardRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  if (!studentData) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="bg-surface rounded-2xl shadow-lg p-8 max-w-md text-center border border-border">
          <FaIdCard className="text-5xl text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text mb-2">No Student Data</h2>
          <p className="text-muted mb-6">Unable to load student information.</p>
          <a
            href="/student-dashboard"
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
          >
            <FaArrowLeft /> Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const handlePrintCard = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = cardRef.current;
    const opt = {
      margin: 5,
      filename: `${studentData.candidate_name}_ID_Card.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      },
      jsPDF: {
        orientation: 'portrait',
        unit: 'mm',
        format: 'a6', // ID card size
        compress: true,
      },
    };

    try {
      html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-bg p-4 sm:p-6 lg:p-8 pb-24">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8 print:hidden">
        <div className="flex items-center gap-3 mb-4">
          <FaIdCard className="text-3xl text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-text">Student ID Card</h1>
            <p className="text-muted text-sm">Official identification document</p>
          </div>
        </div>
      </div>

      {/* ID Card Container */}
      <div className="max-w-2xl mx-auto">
        <div ref={cardRef} className="bg-surface rounded-3xl shadow-2xl overflow-hidden border border-border">
          {/* Card Front Side */}
          <div className="relative h-96 sm:h-80 flex items-stretch bg-surface">
            {/* Gradient Background Section (Left) */}
            <div className="relative w-1/3 flex-shrink-0 overflow-hidden">
              <GradientBackground
                seed={studentData.candidate_name}
                size="full"
                className="absolute inset-0"
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent" />
            </div>

            {/* Content Section (Right) */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between relative z-10">
              {/* Top Section */}
              <div>
                {/* Institution Logo/Name */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">
                    Saveetha University
                  </p>
                  <h2 className="text-lg sm:text-xl font-bold text-text">STUDENT ID</h2>
                </div>

                {/* Student Name */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
                    Name
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-text truncate">
                    {studentData.candidate_name}
                  </p>
                </div>
              </div>

              {/* Middle Section */}
              <div className="space-y-3">
                {/* Enrollment No */}
                <div>
                  <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5">
                    Enrollment No
                  </p>
                  <p className="text-sm font-mono font-bold text-primary">
                    {studentData.enrollment_no}
                  </p>
                </div>

                {/* Course & Stream */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5">
                      Course
                    </p>
                    <p className="text-xs font-semibold text-text">
                      {studentData.course}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5">
                      Stream
                    </p>
                    <p className="text-xs font-semibold text-text">
                      {studentData.stream}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted">Valid Until</p>
                  <p className="text-sm font-semibold text-text">
                    {new Date().getFullYear() + 4}-{String(new Date().getMonth() + 1).padStart(2, '0')}-{String(new Date().getDate()).padStart(2, '0')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted mb-1">ID</p>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center border border-primary/30">
                    <FaIdCard className="text-primary text-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Back Side */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 sm:p-8 border-t border-border">
            <div className="space-y-4">
              {/* Header */}
              <div className="border-b border-border pb-4">
                <h3 className="text-sm font-bold text-text uppercase tracking-wider">
                  Contact & Address Information
                </h3>
              </div>

              {/* Two Column Layout */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Contact Information */}
                <div className="space-y-3">
                  {studentData.contact_number && (
                    <div className="flex gap-3">
                      <FaPhone className="text-primary text-sm flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted font-semibold uppercase">Phone</p>
                        <p className="text-sm font-medium text-text break-all">
                          {studentData.contact_number}
                        </p>
                      </div>
                    </div>
                  )}

                  {studentData.email && (
                    <div className="flex gap-3">
                      <FaEnvelope className="text-primary text-sm flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted font-semibold uppercase">Email</p>
                        <p className="text-sm font-medium text-text truncate">
                          {studentData.email}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Address Information */}
                <div className="space-y-3">
                  {(studentData.city || studentData.state) && (
                    <div className="flex gap-3">
                      <FaMapMarkerAlt className="text-primary text-sm flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted font-semibold uppercase">Location</p>
                        <p className="text-sm font-medium text-text">
                          {[studentData.city, studentData.state]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                      </div>
                    </div>
                  )}

                  {studentData.dob && (
                    <div className="flex gap-3">
                      <FaCalendarAlt className="text-primary text-sm flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted font-semibold uppercase">Date of Birth</p>
                        <p className="text-sm font-medium text-text">
                          {new Date(studentData.dob).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Important Notice */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted leading-relaxed">
                  This ID card is the official identification of Saveetha University. Please keep it safe and present it when required. Report the loss or damage immediately to the administration office.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8 print:hidden">
          <button
            onClick={handlePrintCard}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition shadow-lg"
          >
            <FaPrint /> Print Card
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition shadow-lg"
          >
            <FaDownload /> Download PDF
          </button>

          <a
            href="/student-dashboard"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition shadow-lg"
          >
            <FaArrowLeft /> Back
          </a>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .bg-bg {
            background: white !important;
          }
          .bg-surface {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentIDCard;
