import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // ✅ import hook
import axiosinstance from "./Axios/Axios";

export default function SignUpPage({ onSignUp }) {
  const { inviteCode } = useParams(); // ✅ get code from URL
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
    refcode: "",
    name: "",
  });

  // ✅ Populate refcode when URL param exists
  useEffect(() => {
    if (inviteCode) {
      setFormData((prev) => ({ ...prev, refcode: inviteCode }));
    }
  }, [inviteCode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosinstance.post("/Signup", formData);

      if (res.status === 200) {
        setMessage(res.data.message || "🎉 User registered successfully!");
        setError("");
        setTimeout(() => setMessage(""), 3000);
      } else {
        console.log(res,'the resss')
        setError(res.data.error || "Something went wrong");
        setMessage("");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Server error occurred");
      setMessage("");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-lg bg-gray-800">
        <h2 className="mb-6 text-center text-2xl font-bold text-white sm:text-3xl">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm text-white font-bold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm text-white font-bold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="e.g. +251912345678"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-bold text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-sm font-bold text-white">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Referral Code */}
          <div>
            <label className="mb-1 block text-sm text-white font-medium">Invitation Code</label>
            <input
              type="text"
              name="refcode"
              value={formData.refcode}
              onChange={handleChange}
              required
              placeholder="Please enter your invitation code"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-yellow-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-yellow-500 text-lg font-medium transition hover:bg-green-700 sm:py-3"
          >
            Sign Up
          </button>
        </form>

        {/* Success/Error Messages */}
        <div className="mt-4 flex flex-col gap-2">
          {message && (
            <div className="w-full text-center px-4 py-2 bg-green-500 text-white rounded-xl shadow-md animate-fade-in">
              {message}
            </div>
          )}
          {error && (
            <div className="w-full text-center px-4 py-2 bg-red-500 text-white rounded-xl shadow-md animate-fade-in">
              {error}
            </div>
          )}
        </div>

        {/* Redirect to Sign In */}
        <p className="mt-6 text-center text-sm text-white rounded-md">
          Already have an account?{" "}
          <a href="/signin" className="font-medium text-green-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
