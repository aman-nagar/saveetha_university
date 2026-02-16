import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with API call
    console.log("Login data:", form);

    /*
    Example backend response:
    {
      role: "admin"
    }
    or
    {
      role: "student"
    }

    Then redirect accordingly.
    */
    //    if (role === "admin") navigate("/admin");
    //     if (role === "student") navigate("/student/dashboard");
    //     if (role === "center") navigate("/center/dashboard");
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-xl shadow-sm p-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-heading font-bold text-primary">
            Login
          </h1>
          <p className="text-muted mt-2">Enter your credentials to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded-md font-semibold hover:bg-secondary/90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
