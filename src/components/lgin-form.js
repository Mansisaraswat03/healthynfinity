"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getCookie } from "@/utils/auth";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      window.location.href = "/";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", formData);
      document.cookie = `token=${response.data.token}; path=/;`;
      alert("Login successful");
      window.location.href = "/logs";
    } catch (error) {
      alert(error.response.data.error || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center mt-10 gap-2"
    >
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="p-1 outline-none"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="p-1 outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login
      </button>
      <p>
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-500">
          Signup
        </Link>
      </p>
    </form>
  );
}
