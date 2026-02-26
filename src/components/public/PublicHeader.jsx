// src/components/public/PublicHeader.jsx
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function PublicHeader() {
  return (
    <Navbar
      fluid
      className="bg-surface border-b border-border shadow-sm px-4 sm:px-6 lg:px-20"
    >
      <NavbarBrand as={Link} to="/" className="gap-2">
        <img
          src={logo}
          className="h-10 sm:h-12 lg:h-16 w-auto"
          alt="University Logo"
        />
      </NavbarBrand>

      <NavbarToggle className="text-text hover:text-secondary focus:ring-accent" />

      <NavbarCollapse className="md:order-1 gap-2">
        <NavbarLink
          as={Link}
          to="/"
          className="text-text hover:text-secondary text-sm sm:text-base"
        >
          Home
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/about"
          className="text-text hover:text-secondary text-sm sm:text-base"
        >
          About
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/centers"
          className="text-text hover:text-secondary text-sm sm:text-base"
        >
          Centers
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/news"
          className="text-text hover:text-secondary text-sm sm:text-base"
        >
          News
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/contact"
          className="text-text hover:text-secondary text-sm sm:text-base"
        >
          Contact
        </NavbarLink>

        {/* Student login button style */}
        <NavbarLink as={Link} to="/login" className="mt-2 md:mt-0">
          <span className="bg-secondary text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-secondary/90 text-sm sm:text-base whitespace-nowrap inline-block">
            Login
          </span>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
