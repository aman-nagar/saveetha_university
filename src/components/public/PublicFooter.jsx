// components/Footer.jsx
import {
  Footer,
  FooterCopyright,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function PublicFooter() {
  return (
    <Footer className="bg-primary text-white rounded-none">
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">
          <div>
            <FooterTitle title="University" className="text-accent" />
            <FooterLinkGroup col>
              <FooterLink href="#" className="text-white/80 hover:text-accent">
                About
              </FooterLink>
              <FooterLink href="#" className="text-white/80 hover:text-accent">
                Centers
              </FooterLink>
              <FooterLink href="#" className="text-white/80 hover:text-accent">
                Admissions
              </FooterLink>
              <FooterLink href="#" className="text-white/80 hover:text-accent">
                Contact
              </FooterLink>
            </FooterLinkGroup>
          </div>

          <div>
            <FooterTitle title="Students" className="text-accent" />
            <FooterLinkGroup col>
              <FooterLink href="#" className="text-white/80 hover:text-accent">
                Student Portal
              </FooterLink>
              <FooterLink href="#" className="text-white/80 hover:text-accent">
                Results
              </FooterLink>
              <FooterLink href="#" className="text-white/80 hover:text-accent">
                Academic Calendar
              </FooterLink>
            </FooterLinkGroup>
          </div>

          <div>
            <FooterTitle title="Legal" className="text-accent" />
            <FooterLinkGroup col>
              <FooterLink href="#" className="text-white/80 hover:text-accent">
                Privacy Policy
              </FooterLink>
              <FooterLink href="#" className="text-white/80 hover:text-accent">
                Terms & Conditions
              </FooterLink>
            </FooterLinkGroup>
          </div>

          <div>
            <FooterTitle title="Contact" className="text-accent" />
            <p className="text-white/80 text-sm">
              aryavrat International University
              <br />
              Uttar Pradesh, India
              <br />
              info@university.edu
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full border-t border-white/20 px-6 py-4 sm:flex sm:items-center sm:justify-between">
          <FooterCopyright
            href="#"
            by="Copyright 2018–2026 aryavrat International University"
            className="text-white/70"
          />

          <div className="mt-4 flex space-x-6 sm:mt-0">
            <FooterIcon
              href="#"
              icon={BsFacebook}
              className="text-white/70 hover:text-accent"
            />
            <FooterIcon
              href="#"
              icon={BsInstagram}
              className="text-white/70 hover:text-accent"
            />
            <FooterIcon
              href="#"
              icon={BsTwitter}
              className="text-white/70 hover:text-accent"
            />
          </div>

          <div className="text-white/70 text-sm mt-4 sm:mt-0">
            Designed by <Link to="#">NSpro-webtech</Link>
          </div>
        </div>
      </div>
    </Footer>
  );
}
