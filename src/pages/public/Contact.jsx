import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="bg-bg text-text">
      {/* Page Title */}
      <section className="bg-primary text-white py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            Contact <span className="text-accent">Us</span>
          </h1>
        </div>
      </section>

      {/* Info Cards - Added Theme-Colored Shadows */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {/* Address Card */}
          <div className="bg-surface border border-border rounded-2xl p-8 transition-all duration-300 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(11,31,75,0.2)]">
            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-4">
              <FaMapMarkerAlt size={20} />
            </div>
            <h3 className="text-xl font-heading font-bold text-primary mb-3">
              Address
            </h3>
            <p className="text-muted leading-relaxed text-sm">
              Vaishnavi Complex, Chennai - Kolkata Hwy,
              <br />
              Guru Nanak Colony,
              <br />
              Vijayawada, Andhra Pradesh 520008
            </p>
          </div>

          {/* Mobile Card */}
          <div className="bg-surface border border-border rounded-2xl p-8 transition-all duration-300 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(201,162,39,0.3)]">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-4">
              <FaPhoneAlt size={18} />
            </div>
            <h3 className="text-xl font-heading font-bold text-primary mb-3">
              Mobile No.
            </h3>
            <p className="text-muted text-lg font-semibold tracking-tight">
               08062182405
            </p>
          </div>

          {/* Email Card */}
          <div className="bg-surface border border-border rounded-2xl p-8 transition-all duration-300 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(158,47,47,0.2)]">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-4">
              <FaEnvelope size={18} />
            </div>
            <h3 className="text-xl font-heading font-bold text-primary mb-3">
              Mail
            </h3>
            <p className="text-muted break-all text-sm font-medium">
              info@saveethaamaravatiuniversity.ac.in
            </p>
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          {/* Map Card */}
          <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-[0_15px_35px_-15px_rgba(0,0,0,0.15)]">
            <iframe
              title="University Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.437158760447!2d80.648358!3d16.503348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDMwJzEyLjAiTiA4MMKwMzgnNTQuMSJF!5e0!3m2!1sen!2sin!4v1650000000000"
              className="w-full h-full min-h-[400px] border-0 grayscale hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
          </div>

          {/* Enquiry Form Card */}
          <div className="bg-surface border border-border rounded-2xl p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]">
            <h3 className="text-2xl font-heading font-black text-primary mb-6">
              Enquiry <span className="text-accent italic">Form</span>
            </h3>

            <form className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-full border border-border rounded-xl px-4 py-3 bg-bg/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">
                    Contact
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Contact"
                    className="w-full border border-border rounded-xl px-4 py-3 bg-bg/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full border border-border rounded-xl px-4 py-3 bg-bg/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">
                  Your Query
                </label>
                <textarea
                  placeholder="Enter Query..."
                  rows="4"
                  className="w-full border border-border rounded-xl px-4 py-3 bg-bg/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 transition-all"
                >
                  Submit Enquiry
                </button>

                <button
                  type="reset"
                  className="px-8 py-4 border border-border text-muted font-bold rounded-xl hover:bg-bg transition-all"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
