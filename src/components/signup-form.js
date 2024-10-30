"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getCookie } from "@/utils/auth";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

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
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("/api/auth/signup", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Signup successful");
      window.location.href = "/login";
    } catch (error) {
      console.error(error); // Log the error for debugging
      alert(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mt-10 gap-2">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="p-1"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="p-1"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
        className="p-1"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Signup
      </button>
      <p>
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </form>
  );
}
