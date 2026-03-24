// src/components/public/sections/ExaminationCommittee.jsx
import React from "react";
import { motion } from "framer-motion";
import { usePublicContent } from "@/hooks/usePublicContent";

export default function ExaminationCommittee() {
  const { academics } = usePublicContent();

  // Point to 'examinationCommittee'
  const data = academics?.examinationCommittee;
  // console.log("Academics from Hook:", academics);
  // console.log("Final data for UI:", data);

  if (!data) return null;

  return (
    <section className="w-full py-20 bg-bg text-primary">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="mb-16 border-l-8 border-accent pl-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter"
          >
            {data.title}
          </motion.h2>
          <p className="text-accent font-bold tracking-[0.2em] uppercase text-sm mt-2">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT COLUMN: OVERVIEW & OBJECTIVES */}
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-1 bg-accent rounded-full"></span>
                Overview
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                {data.overview}
              </p>
            </div>

            <div className="bg-primary p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 text-9xl font-black opacity-5 pointer-events-none">
                OBJ
              </div>
              <h3 className="text-xl font-bold mb-4 text-accent">Objective</h3>
              <p className="text-white/80 leading-relaxed italic">
                {data.objective}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="w-8 h-1 bg-accent rounded-full"></span>
                Roles & Responsibilities
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.responsibilities.map((resp, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-3 text-sm text-gray-600 bg-white p-4 rounded-xl border-l-4 border-accent/20 hover:border-accent transition-colors"
                  >
                    <span className="text-accent font-bold">•</span>
                    {resp}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: COMMITTEE MEMBERS TABLE */}
          {/* <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-primary p-6 text-center">
                  <h3 className="text-white font-bold uppercase tracking-widest">
                    Committee Members
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                          Sr.
                        </th>
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                          Name
                        </th>
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                          Designation
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.members.map((member, idx) => (
                        <tr
                          key={member.id}
                          className="border-b border-gray-50 hover:bg-accent/5 transition-colors group"
                        >
                          <td className="p-4 text-sm font-medium text-gray-400">
                            {idx + 1}
                          </td>
                          <td className="p-4 text-sm font-bold text-primary group-hover:text-accent transition-colors">
                            {member.name}
                          </td>
                          <td className="p-4">
                            <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 px-3 py-1 rounded-full group-hover:bg-primary group-hover:text-white transition-all whitespace-nowrap">
                              {member.designation}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
