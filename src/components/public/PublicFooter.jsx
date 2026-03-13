// components/PublicFooter.jsx - Data-Driven Footer
import {
  Footer,
  FooterCopyright,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";

/**
 * PublicFooter Component - Data-Driven
 * @param {Object} data - Footer configuration from API/mock
 */
export default function PublicFooter({ data }) {
  // Handle missing data gracefully
  const footerData = data || getDefaultFooterData();

  return (
    <Footer
      className="rounded-none"
      style={{ background: "var(--color-primary)" }}
    >
      <div className="w-full">
        {/* Links Grid */}
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-10 md:grid-cols-3">
          {/* Quick Links Column */}
          {footerData.quickLinks && (
            <div>
              <FooterTitle title="Quick Links" className="text-accent" />
              <FooterLinkGroup col>
                {footerData.quickLinks.map((link) => (
                  <FooterLink
                    key={link.label}
                    href={link.url}
                    className="text-white/80 hover:text-accent"
                  >
                    {link.label}
                  </FooterLink>
                ))}
              </FooterLinkGroup>
            </div>
          )}

          {/* Contact Info */}
          {footerData.contact && (
            <div>
              <FooterTitle title="Contact Us" className="text-accent" />
              <div className="text-white/80 text-sm space-y-1">
                <div>📞 {footerData.contact.phone}</div>
                <div>📧 {footerData.contact.email}</div>
                <div>📍 {footerData.contact.address}</div>
              </div>
            </div>
          )}

          {/* Social Links */}
          {footerData.social && (
            <div>
              <FooterTitle title="Follow Us" className="text-accent" />
              <div className="flex space-x-4 text-white/80">
                {footerData.social.map((social) => {
                  const iconMap = {
                    Facebook: BsFacebook,
                    Twitter: BsTwitter,
                    Instagram: BsInstagram,
                    LinkedIn: BsLinkedin,
                  };
                  const Icon = iconMap[social.platform] || BsFacebook;
                  return (
                    <FooterIcon
                      key={social.platform}
                      href={social.url}
                      icon={Icon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-accent hover:scale-110 transition"
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-white/20 px-6 py-4 sm:flex sm:items-center sm:justify-between">
          <FooterCopyright
            by={footerData.copyright}
            className="text-white/70"
          />
        </div>
      </div>
    </Footer>
  );
}

/**
 * Default footer data if none provided
 */
function getDefaultFooterData() {
  return {
    copyright: "© 2026 Saveetha Amravati University. All rights reserved.",
    quickLinks: [
      { label: "About", url: "/about" },
      { label: "Programs", url: "/programs" },
      { label: "Admissions", url: "/admission" },
    ],
  };
}
