import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import html2pdf from 'html2pdf.js';
import {
  FaDownload,
  FaPrint,
  FaArrowLeft,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaCalendarAlt,
  FaBook,
  FaBarcode,
} from 'react-icons/fa';

const StudentAdmitCard = () => {
  const { studentData } = useAuth();
  const cardRef = useRef(null);
  const [admitCardData, setAdmitCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmitCard = async () => {
      try {
        setLoading(true);
        // Replace with your actual API call
        // const data = await getAdmitCard();
        // setAdmitCardData(data);
        
        // Mock data for demonstration - replace with actual API
        setAdmitCardData({
          session: '2024-2025',
          roll_number: studentData?.enrollment_no,
          subjects: [
            {
              subject_code: 'CSE301',
              subject_name: 'Data Structures',
              exam_date: '2024-06-15',
              start_time: '09:00 AM',
              end_time: '12:00 PM',
            },
            {
              subject_code: 'CSE302',
              subject_name: 'Web Development',
              exam_date: '2024-06-17',
              start_time: '02:00 PM',
              end_time: '05:00 PM',
            },
            {
              subject_code: 'CSE303',
              subject_name: 'Database Systems',
              exam_date: '2024-06-19',
              start_time: '09:00 AM',
              end_time: '12:00 PM',
            },
          ],
        });
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch admit card');
        setAdmitCardData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmitCard();
  }, [studentData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="bg-surface rounded-2xl shadow-lg p-8 max-w-md text-center border border-border">
          <div className="animate-spin mb-4">
            <FaFileAlt className="text-5xl text-primary mx-auto" />
          </div>
          <p className="text-text font-semibold">Loading admit card...</p>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="bg-surface rounded-2xl shadow-lg p-8 max-w-md text-center border border-border">
          <FaFileAlt className="text-5xl text-primary mx-auto mb-4" />
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

  if (error || !admitCardData?.subjects?.length) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="bg-surface rounded-2xl shadow-lg p-8 max-w-md text-center border border-border">
          <FaExclamationTriangle className="text-5xl text-warning mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text mb-2">Admit Card Not Available</h2>
          <p className="text-muted mb-6">
            {error || 'Your admit card has not been generated yet. Please contact the administration office.'}
          </p>
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

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = cardRef.current;
    const opt = {
      margin: 10,
      filename: `${studentData.candidate_name}_Admit_Card.pdf`,
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
        format: 'a4',
        compress: true,
      },
    };

    try {
      html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Error generating PDF. Please try again or use print.');
    }
  };

  return (
    <div className="min-h-screen bg-bg p-4 sm:p-6 lg:p-8 pb-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 print:hidden">
        <div className="flex items-center gap-3 mb-4">
          <FaFileAlt className="text-3xl text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-text">Admit Card</h1>
            <p className="text-muted text-sm">Official examination entry document</p>
          </div>
        </div>
      </div>

      {/* Admit Card */}
      <div ref={cardRef} className="max-w-4xl mx-auto bg-surface rounded-2xl shadow-2xl overflow-hidden border border-border">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold">ADMIT CARD</h2>
              <p className="text-white/80 text-sm mt-1">Examination Entry Document</p>
            </div>
            <div className="text-4xl opacity-20">
              <FaFileAlt />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Student Information Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6 border-b border-border">
            {[
              { label: 'Name', value: studentData.candidate_name, icon: null },
              { label: 'Enrollment No', value: studentData.enrollment_no, icon: null },
              { label: 'Course', value: studentData.course, icon: null },
              { label: 'Stream', value: studentData.stream || 'N/A', icon: null },
              { label: 'Session', value: admitCardData.session, icon: null },
              { label: 'Roll Number', value: admitCardData.roll_number || 'N/A', icon: null },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-xs font-bold text-muted uppercase tracking-widest">
                  {item.label}
                </p>
                <p className="text-sm sm:text-base font-bold text-text">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Examination Schedule Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaCalendarAlt className="text-primary text-lg" />
              <h3 className="text-lg sm:text-xl font-bold text-text">
                Examination Schedule
              </h3>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary/10 border-b-2 border-primary">
                    <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
                      S.No.
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
                      Subject Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
                      Subject Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
                      Exam Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {admitCardData.subjects.map((subject, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-border hover:bg-primary/5 transition"
                    >
                      <td className="px-4 py-3 text-sm font-semibold text-text">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-primary font-bold">
                        {subject.subject_code}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-text">
                        {subject.subject_name}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-text">
                        {new Date(subject.exam_date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-text">
                        {subject.start_time} - {subject.end_time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-3">
              {admitCardData.subjects.map((subject, idx) => (
                <div
                  key={idx}
                  className="bg-primary/5 border-l-4 border-primary rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                        Subject {idx + 1}
                      </p>
                      <p className="font-bold text-text">{subject.subject_name}</p>
                    </div>
                    <span className="text-xs font-bold bg-primary text-white px-2 py-1 rounded">
                      {subject.subject_code}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-muted font-semibold mb-1">Date</p>
                      <p className="font-bold text-text">
                        {new Date(subject.exam_date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted font-semibold mb-1">Time</p>
                      <p className="font-bold text-text">{subject.start_time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Instructions */}
          <div className="bg-warning/10 border-l-4 border-warning rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <FaExclamationTriangle className="text-warning text-lg flex-shrink-0" />
              <h4 className="font-bold text-text uppercase tracking-wider text-sm">
                Important Instructions
              </h4>
            </div>
            <ul className="space-y-2 text-sm text-text ml-6">
              <li className="list-disc">Carry this admit card to the examination center</li>
              <li className="list-disc">
                Report 15 minutes before the examination time
              </li>
              <li className="list-disc">
                Bring valid identification and written admission letter
              </li>
              <li className="list-disc">
                Mobile phones and electronic devices are not allowed
              </li>
              <li className="list-disc">Examination timing is printed above - be punctual</li>
              <li className="list-disc">
                In case of any discrepancies, contact the examination department immediately
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted">
            <span>Issued: {new Date().toLocaleDateString()}</span>
            <span>Valid for Session: {admitCardData.session}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-4xl mx-auto print:hidden">
        <button
          onClick={handlePrint}
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

export default StudentAdmitCard;
