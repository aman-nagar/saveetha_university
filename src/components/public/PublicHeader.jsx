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
    <Navbar fluid className="bg-surface border-b border-border shadow-sm">
      <NavbarBrand as={Link} to="/">
        <img src={logo} className="mr-3 h-16" alt="University Logo" />
      </NavbarBrand>

      <NavbarToggle />

      <NavbarCollapse>
        <NavbarLink as={Link} to="/" className="text-text hover:text-secondary">
          Home
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/about"
          className="text-text hover:text-secondary"
        >
          About
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/centers"
          className="text-text hover:text-secondary"
        >
          Centers
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/contact"
          className="text-text hover:text-secondary"
        >
          Contact
        </NavbarLink>

        {/* Student login button style */}
        <NavbarLink as={Link} to="/student/login">
          <span className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90">
            Student Login
          </span>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
