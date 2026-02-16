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
    <Navbar fluid className="bg-white border-b border-border shadow-sm">
      <NavbarBrand as={Link} to="/">
        <img src={logo} className="mr-3 h-16" alt="University Logo" />
      </NavbarBrand>

      <NavbarToggle />

      <NavbarCollapse>
        <NavbarLink as={Link} to="/">
          Home
        </NavbarLink>
        <NavbarLink as={Link} to="/about">
          About
        </NavbarLink>
        <NavbarLink as={Link} to="/centers">
          Centers
        </NavbarLink>
        <NavbarLink as={Link} to="/contact">
          Contact
        </NavbarLink>
        <NavbarLink as={Link} to="/student/login">
          Student Login
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
