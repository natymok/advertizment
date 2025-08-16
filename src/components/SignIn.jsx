import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInPage({ onSignIn }) {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const Signin = () => {
      navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Sign In
        </h2>

        <form  className="space-y-4">
          {/* Phone Number */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone Number
            </label>
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
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
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

          {/* Submit Button */}
          <button
            onClick={Signin}
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-2 text-white text-lg font-medium transition hover:bg-blue-700 sm:py-3"
          >
            Sign In
          </button>
        </form>

        {/* Redirect to Sign Up */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="font-medium text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
