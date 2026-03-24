import {
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import worldMap from "../../assets/images/wmap.jpg";
import { usePublicContent } from "../../hooks/usePublicContent";

export default function PublicFooter() {
  const { content } = usePublicContent();
  const footerData = content?.footer;

  if (!footerData) return null;

  return (
    <footer
      className="relative w-full overflow-hidden bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${worldMap})` }}
    >
      {/* Dark Navy Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#0b1f4b]/90 z-0" />

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            {/* Dynamic Columns (Quick Links, Facilities, Policy) */}
            {footerData.columns?.map((col, idx) => (
              <div key={idx}>
                <FooterTitle
                  title={col.title}
                  className="text-accent border-b border-accent/20 pb-2 mb-4 !opacity-100"
                />
                <FooterLinkGroup col className="space-y-2">
                  {col.links.map((link) => (
                    <FooterLink
                      key={link.label}
                      href={link.url}
                      className="text-white/70 hover:text-accent transition-colors text-xs font-medium uppercase tracking-wider"
                    >
                      {link.label}
                    </FooterLink>
                  ))}
                </FooterLinkGroup>
              </div>
            ))}

            {/* Contact Us Column (Matches Screenshot structure) */}
            <div>
              <FooterTitle
                title="Contact Us"
                className="text-accent border-b border-accent/20 pb-2 mb-4 !opacity-100"
              />
              <div className="flex flex-col gap-5 text-white/80">
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <MdPhone className="text-accent shrink-0 mt-1" size={18} />
                  <span className="text-xs leading-relaxed">
                    {footerData.contact.phone}
                  </span>
                </div>

                {/* Multi-Emails */}
                <div className="space-y-3">
                  {footerData.contact.emails.map((email, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <MdEmail
                        className="text-accent shrink-0 mt-1"
                        size={18}
                      />
                      <span className="text-xs break-all">{email.value}</span>
                    </div>
                  ))}
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <MdLocationOn
                    className="text-accent shrink-0 mt-1"
                    size={18}
                  />
                  <span className="text-xs leading-relaxed italic">
                    {footerData.contact.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-white/10 px-6 py-6 text-center">
          <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">
            © {new Date().getFullYear()} {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
