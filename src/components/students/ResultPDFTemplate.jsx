// src/components/students/ResultPDFTemplate.jsx
import React from "react";
import universityLetterhead from "../../assets/images/student_result_format.png";
import { formatOrdinal } from "../../utils/formatters";

export const ResultPDFTemplate = React.forwardRef(({ result, user }, ref) => {
  if (!result) return null;
  console.log(result);
  return (
    <div
      ref={ref}
      className="relative flex-shrink-0 bg-white"
      style={{
        width: "794px",
        height: "1123px",
        color: "#000000",
        fontFamily: "'Helvetica', 'Arial', sans-serif",
      }}
    >
      {/* Background Letterhead */}
      <img
        src={universityLetterhead}
        className="absolute inset-0 w-full h-full z-0"
        alt="Official Letterhead"
      />

      {/* Content Overlay */}
      <div
        className="relative z-10 w-full h-full text-[13.5px]"
        style={{ color: "#1a1a1a" }}
      >
        {/* Header Information */}
        <div
          style={{
            position: "absolute",
            top: "229px",
            left: "245px",
            fontWeight: "700",
          }}
        >
          {result.enrollment_no}
        </div>
        <div
          style={{
            position: "absolute",
            top: "252px",
            left: "665px",
            fontWeight: "700",
          }}
        >
          {result.duration_type?.toUpperCase()} {formatOrdinal(result.duration)}
        </div>

        {/* Personal Details - Standardized Alignment */}
        <div style={{ position: "absolute", top: "269px", left: "245px" }}>
          {result.roll_no}
        </div>
        <div
          style={{
            position: "absolute",
            top: "297px",
            left: "245px",
            fontWeight: "600",
          }}
        >
          {(result.student_name || user?.name || "N/A").toUpperCase()}
        </div>
        <div style={{ position: "absolute", top: "325px", left: "245px" }}>
          {(result.father_name || user?.father_name || "N/A").toUpperCase()}
        </div>
        <div style={{ position: "absolute", top: "355px", left: "245px" }}>
          {(result.mother_name || user?.mother_name || "N/A").toUpperCase()}
        </div>
        <div
          style={{
            position: "absolute",
            top: "383px",
            left: "245px",
            fontWeight: "600",
          }}
        >
          {result.course_name || result.course || "N/A"} ({result.stream_name})
        </div>

        {/* Dynamic Table Section */}
        <div
          style={{
            position: "absolute",
            top: "490px",
            left: "82px",
            width: "630px",
          }}
        >
          <table
            style={{
              width: "100%",
              tableLayout: "fixed" /* 👈 CRITICAL FIX: Forces full width */,
              borderCollapse: "collapse",
              fontSize: "11px",
              border: "1px solid #000000",
            }}
          >
            <thead>
              {/* Top Row*/}
              <tr style={{ fontSize: "9px", fontWeight: "bold" }}>
                <th
                  rowSpan={2}
                  style={{
                    backgroundColor: "#f3f4f6" /* MOVED HERE */,
                    border: "1px solid #000000",
                    padding: "8px 4px",
                    verticalAlign: "middle",
                    width: "auto",
                  }}
                >
                  Subject Name
                </th>
                <th
                  rowSpan={2}
                  style={{
                    backgroundColor: "#f3f4f6",
                    border: "1px solid #000000",
                    padding: "8px 4px",
                    verticalAlign: "middle",
                    width: "60px", // Small width for code
                  }}
                >
                  Code
                </th>
                <th
                  colSpan={2}
                  style={{
                    backgroundColor: "#f3f4f6" /* MOVED HERE */,
                    border: "1px solid #000000",
                    padding: "4px",
                    verticalAlign: "middle",
                    textAlign: "center",
                    width: "130px",
                  }}
                >
                  Theory
                </th>
                <th
                  colSpan={2}
                  style={{
                    backgroundColor: "#f3f4f6" /* MOVED HERE */,
                    border: "1px solid #000000",
                    padding: "4px",
                    verticalAlign: "middle",
                    textAlign: "center",
                    width: "130px",
                  }}
                >
                  Practical
                </th>
                <th
                  rowSpan={2}
                  style={{
                    backgroundColor: "#f3f4f6" /* MOVED HERE */,
                    border: "1px solid #000000",
                    width: "65px",
                    verticalAlign: "middle",
                  }}
                >
                  Total
                </th>
              </tr>

              {/* Bottom Row - Removed background from <tr> */}
              <tr style={{ fontSize: "9px", fontWeight: "bold" }}>
                <th
                  style={{
                    backgroundColor: "#f3f4f6" /* MOVED HERE */,
                    border: "1px solid #000000",
                    width: "65px",
                    padding: "4px",
                    verticalAlign: "middle",
                    textAlign: "center",
                  }}
                >
                  Max Marks
                </th>
                <th
                  style={{
                    backgroundColor: "#f3f4f6" /* MOVED HERE */,
                    border: "1px solid #000000",
                    width: "65px",
                    padding: "4px",
                    verticalAlign: "middle",
                    textAlign: "center",
                  }}
                >
                  Obtain Marks
                </th>
                <th
                  style={{
                    backgroundColor: "#f3f4f6" /* MOVED HERE */,
                    border: "1px solid #000000",
                    width: "65px",
                    padding: "4px",
                    verticalAlign: "middle",
                    textAlign: "center",
                  }}
                >
                  Max Pr
                </th>
                <th
                  style={{
                    backgroundColor: "#f3f4f6" /* MOVED HERE */,
                    border: "1px solid #000000",
                    width: "65px",
                    padding: "4px",
                    verticalAlign: "middle",
                    textAlign: "center",
                  }}
                >
                  Obtain Marks
                </th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((sub, i) => {
                const rowObtained =
                  Number(sub.theory_marks || 0) +
                  Number(sub.practical_marks || 0);
                return (
                  <tr key={i}>
                    <td
                      style={{
                        border: "1px solid #000000",
                        padding: "8px 8px",
                        textAlign: "left",
                        verticalAlign: "middle",
                      }}
                    >
                      {sub.subject_name}
                    </td>
                    <td
                      style={{
                        border: "1px solid #000000",
                        padding: "4px",
                        textAlign: "center",
                        fontFamily: "monospace",
                      }}
                    >
                      {sub.subject_code}
                    </td>
                    <td
                      style={{
                        border: "1px solid #000000",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      {sub.max_theory_marks}
                    </td>
                    <td
                      style={{
                        border: "1px solid #000000",
                        textAlign: "center",
                        backgroundColor: "#f9fafb",
                        verticalAlign: "middle",
                      }}
                    >
                      {sub.theory_marks}
                    </td>
                    <td
                      style={{
                        border: "1px solid #000000",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      {sub.max_practical_marks}
                    </td>
                    <td
                      style={{
                        border: "1px solid #000000",
                        textAlign: "center",
                        backgroundColor: "#f9fafb",
                        verticalAlign: "middle",
                      }}
                    >
                      {sub.practical_marks}
                    </td>
                    <td
                      style={{
                        border: "1px solid #000000",
                        textAlign: "center",
                        fontWeight: "700",
                        verticalAlign: "middle",
                      }}
                    >
                      {rowObtained}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot style={{ backgroundColor: "#f3f4f6", fontWeight: "900" }}>
              <tr>
                <td colSpan={2}
                  style={{
                    border: "1px solid #000000",
                    padding: "10px 8px",
                    textAlign: "right",
                    fontSize: "9px",
                    verticalAlign: "middle",
                  }}
                >
                  GRAND TOTAL
                </td>
                <td
                  style={{
                    border: "1px solid #000000",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {result.subjects.reduce(
                    (a, s) => a + Number(s.max_theory_marks || 0),
                    0,
                  )}
                </td>
                <td
                  style={{
                    border: "1px solid #000000",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {result.subjects.reduce(
                    (a, s) => a + Number(s.theory_marks || 0),
                    0,
                  )}
                </td>
                <td
                  style={{
                    border: "1px solid #000000",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {result.subjects.reduce(
                    (a, s) => a + Number(s.max_practical_marks || 0),
                    0,
                  )}
                </td>
                <td
                  style={{
                    border: "1px solid #000000",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {result.subjects.reduce(
                    (a, s) => a + Number(s.practical_marks || 0),
                    0,
                  )}
                </td>
                <td
                  style={{
                    border: "1px solid #000000",
                    textAlign: "center",
                    color: "#1e40af",
                    fontSize: "13px",
                    verticalAlign: "middle",
                  }}
                >
                  {result.subjects.reduce(
                    (a, s) =>
                      a +
                      Number(s.theory_marks || 0) +
                      Number(s.practical_marks || 0),
                    0,
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
});
