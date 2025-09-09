import React, { useState } from "react";
import axiosinstance from "./Axios/Axios";
import { useNavigate } from "react-router-dom";

export default function BankAccountPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
  });

  const [message, setMessage] = useState(""); // success
  const [error, setError] = useState("");     // error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axiosinstance.post("/bank-account", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setMessage(res.data.message || "✅ Bank account added successfully!");
        setError("");
        setTimeout(() => {
          setMessage("");
          navigate("/dashboard"); // redirect
        }, 2000);
      } else {
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
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-lg bg-gray-800">
        <h2 className="mb-6 text-center text-2xl font-bold text-white sm:text-3xl">
          Add Bank Account
        </h2>

        <form className="space-y-4">
          {/* Bank Name */}
          <div>
            <label className="mb-1 block text-sm text-white font-bold">
              Bank Name
            </label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
              placeholder="Enter your bank name"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base text-yellow-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="mb-1 block text-sm text-white font-bold">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
              placeholder="Enter your account number"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base text-yellow-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-yellow-500 text-lg font-medium transition hover:bg-green-700 sm:py-3"
          >
            Save Bank Account
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

        {/* Back to Dashboard */}
        <p className="mt-6 text-center text-sm text-white rounded-md">
          Want to go back?{" "}
          <a href="/dashboard" className="font-medium text-green-600 hover:underline">
            Dashboard
          </a>
        </p>
      </div>
    </div>
  );
}
