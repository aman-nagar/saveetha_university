// src/pages/public/Contact.jsx
import React from "react";

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

      {/* Info Cards */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {/* Address */}
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-heading font-semibold text-primary mb-3">
              Address
            </h3>
            <p className="text-muted leading-relaxed">
              Vaishnavi Complex, Chennai - Kolkata Hwy,
              <br />
              Guru Nanak Colony,
              <br />
              Vijayawada, Andhra Pradesh 520008
            </p>
          </div>

          {/* Mobile */}
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-heading font-semibold text-primary mb-3">
              Mobile No.
            </h3>
            <p className="text-muted text-lg">08062182405</p>
          </div>

          {/* Email */}
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-heading font-semibold text-primary mb-3">
              Mail
            </h3>
            <p className="text-muted">info@saveethaamaravatiuniversity.ac.in</p>
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {/* Map */}
          <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
            <iframe
              title="University Location"
              src="https://www.google.com/maps?q=Saveetha%20Amaravati%20University&output=embed"
              className="w-full h-[400px] border-0"
              loading="lazy"
            />
          </div>

          {/* Enquiry Form */}
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-2xl font-heading font-bold text-primary mb-6">
              Enquiry Form
            </h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Enter Contact"
                  className="border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <textarea
                placeholder="Enter Query..."
                rows="4"
                className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary/90"
                >
                  Submit
                </button>

                <button
                  type="reset"
                  className="border border-border text-muted px-6 py-2 rounded-md hover:bg-bg"
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
