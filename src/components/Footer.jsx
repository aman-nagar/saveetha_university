// components/Footer.jsx
import React from "react";

const Footer = ({
  footerData = {},
  quickLinks = [],
  facilities = [],
  policies = [],
  contactInfo = {},
}) => {
  // Default data structure for when API isn't ready
  const defaultQuickLinks = [
    { id: 1, title: "Career", url: "/career", icon: "💼" },
    { id: 2, title: "Journals", url: "/journals", icon: "📚" },
    { id: 3, title: "Alumni", url: "/alumni", icon: "🎓" },
    {
      id: 4,
      title: "International Students",
      url: "/international",
      icon: "🌍",
    },
    { id: 5, title: "Academic Calendar", url: "/calendar", icon: "📅" },
    { id: 6, title: "Training & Placement", url: "/placement", icon: "💪" },
    { id: 7, title: "Grievance Redressal Cell", url: "/grievance", icon: "⚖️" },
    { id: 8, title: "FAQs", url: "/faq", icon: "❓" },
    { id: 9, title: "Student Verification", url: "/verification", icon: "✅" },
  ];

  const defaultFacilities = [
    { id: 1, title: "Library", url: "/library", icon: "📖" },
    { id: 2, title: "Transport", url: "/transport", icon: "🚌" },
    { id: 3, title: "Computer Lab", url: "/computer-lab", icon: "💻" },
    { id: 4, title: "Auditorium", url: "/auditorium", icon: "🎭" },
    { id: 5, title: "Health Care", url: "/healthcare", icon: "🏥" },
    { id: 6, title: "Sports", url: "/sports", icon: "⚽" },
    { id: 7, title: "Security", url: "/security", icon: "🛡️" },
  ];

  const defaultPolicies = [
    { id: 1, title: "Privacy Policy", url: "/privacy", icon: "🔒" },
    { id: 2, title: "Terms and Conditions", url: "/terms", icon: "📜" },
    { id: 3, title: "Refund Policy", url: "/refund", icon: "💰" },
    { id: 4, title: "Anti-Ragging Policy", url: "/anti-ragging", icon: "🚫" },
    {
      id: 5,
      title: "Caste Based Discrimination",
      url: "/anti-discrimination",
      icon: "⚖️",
    },
    { id: 6, title: "Public Self Disclosure", url: "/disclosure", icon: "📢" },
    {
      id: 7,
      title: "Basics of Cyber Hygiene",
      url: "/cyber-hygiene.pdf",
      icon: "🛡️",
      isExternal: true,
    },
  ];

  const defaultContact = {
    email: "info@aiuniversity.edu.in",
    vcEmail: "vc@aiuniversity.edu.in",
    registrarEmail: "registrar@aiuniversity.edu.in",
    phones: [
      "+91-9355822001",
      "+91-9355822002",
      "+91-9355822003",
      "+91-9355822004",
      "+91-9355822005",
    ],
    address: "Tilthai, Dharmanagar, North Tripura, Tripura, India, 799260",
    mapUrl: "https://maps.google.com/?q=Tilthai+Dharmanagar+Tripura",
  };

  const links = quickLinks.length > 0 ? quickLinks : defaultQuickLinks;
  const facilityItems = facilities.length > 0 ? facilities : defaultFacilities;
  const policyItems = policies.length > 0 ? policies : defaultPolicies;
  const contact = { ...defaultContact, ...contactInfo };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer - Mobile first grid */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white text-base md:text-lg font-semibold mb-3 md:mb-4 border-b border-gray-800 pb-2">
              QUICK LINKS
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    className="flex items-center text-sm hover:text-white transition-colors group"
                    {...(link.isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <span className="mr-2 text-gray-400 group-hover:text-blue-400 transition-colors">
                      {link.icon || "•"}
                    </span>
                    <span className="flex-1">{link.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Facilities */}
          <div className="space-y-3">
            <h3 className="text-white text-base md:text-lg font-semibold mb-3 md:mb-4 border-b border-gray-800 pb-2">
              FACILITIES
            </h3>
            <ul className="space-y-2">
              {facilityItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.url}
                    className="flex items-center text-sm hover:text-white transition-colors group"
                  >
                    <span className="mr-2 text-gray-400 group-hover:text-blue-400 transition-colors">
                      {item.icon || "•"}
                    </span>
                    <span className="flex-1">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-3">
            <h3 className="text-white text-base md:text-lg font-semibold mb-3 md:mb-4 border-b border-gray-800 pb-2">
              POLICIES
            </h3>
            <ul className="space-y-2">
              {policyItems.map((policy) => (
                <li key={policy.id}>
                  <a
                    href={policy.url}
                    className="flex items-center text-sm hover:text-white transition-colors group"
                    {...(policy.isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <span className="mr-2 text-gray-400 group-hover:text-blue-400 transition-colors">
                      {policy.icon || "•"}
                    </span>
                    <span className="flex-1">{policy.title}</span>
                    {policy.isExternal && (
                      <svg
                        className="w-3 h-3 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-3">
            <h3 className="text-white text-base md:text-lg font-semibold mb-3 md:mb-4 border-b border-gray-800 pb-2">
              CONTACT US
            </h3>
            <div className="space-y-3 text-sm">
              {/* Emails */}
              <div className="space-y-2">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center hover:text-white transition-colors group"
                >
                  <span className="mr-2 text-gray-400 group-hover:text-blue-400">
                    📧
                  </span>
                  <span className="break-all">{contact.email}</span>
                </a>
                <a
                  href={`mailto:${contact.vcEmail}`}
                  className="flex items-center hover:text-white transition-colors group"
                >
                  <span className="mr-2 text-gray-400 group-hover:text-blue-400">
                    👥
                  </span>
                  <span className="break-all">{contact.vcEmail}</span>
                </a>
                <a
                  href={`mailto:${contact.registrarEmail}`}
                  className="flex items-center hover:text-white transition-colors group"
                >
                  <span className="mr-2 text-gray-400 group-hover:text-blue-400">
                    📧
                  </span>
                  <span className="break-all">{contact.registrarEmail}</span>
                </a>
              </div>

              {/* Phones */}
              <div className="space-y-1">
                {contact.phones.map((phone, index) => (
                  <a
                    key={index}
                    href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center hover:text-white transition-colors group"
                  >
                    <span className="mr-2 text-gray-400 group-hover:text-blue-400">
                      📞
                    </span>
                    <span>{phone}</span>
                  </a>
                ))}
              </div>

              {/* Address */}
              <div className="pt-2">
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start hover:text-white transition-colors group"
                >
                  <span className="mr-2 text-gray-400 group-hover:text-blue-400 mt-1">
                    📍
                  </span>
                  <span className="flex-1">{contact.address}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <p className="text-xs md:text-sm text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()}{" "}
              {footerData.universityName || "Aryavart International University"}
              . All rights reserved.
            </p>

            {/* Social Links - Placeholder for future API data */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  📘
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  🐦
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  🔗
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  📺
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
