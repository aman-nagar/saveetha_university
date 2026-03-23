// components/PublicFooter.jsx - Data-Driven Footer
import {
  FooterCopyright,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import worldMap from "../../assets/images/wmap.jpg";
import { usePublicContent } from "../../hooks/usePublicContent";

export default function PublicFooter({ data }) {
  const footerData = data || getDefaultFooterData();
  const { siteDetails } = usePublicContent();

  return (
    <footer
      className="relative w-full overflow-hidden bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${worldMap})` }}
    >
      <div className="absolute inset-0 bg-primary/70 z-0" />

      {/* 2. CONTENT CONTAINER (Must be relative z-10 to stay above overlay) */}
      <div className="relative z-10 w-full">
        {/* Links Grid */}
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-10 md:grid-cols-3 max-w-7xl mx-auto">
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
                <div>📞 {siteDetails?.phone || footerData.contact.phone}</div>
                <div>📧 {siteDetails?.email || footerData.contact.email}</div>
                <div>
                  📍 {siteDetails?.address || footerData.contact.address}
                </div>
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
        <div className="w-full border-t border-white/20 px-6 py-4 sm:flex sm:items-center sm:justify-between max-w-7xl mx-auto">
          <FooterCopyright
            by={footerData.copyright}
            className="text-white/70"
          />
        </div>
      </div>
    </footer>
  );
}

function getDefaultFooterData() {
  return {
    copyright: "2026 Saveetha Amravati University. All rights reserved.",
    quickLinks: [
      { label: "About", url: "/about" },
      { label: "Programs", url: "/programs" },
      { label: "Admissions", url: "/admission" },
    ],
  };
}
