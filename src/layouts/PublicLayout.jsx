import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/public/Navbar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
