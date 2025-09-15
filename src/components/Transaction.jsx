import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axiosinstance from "./Axios/Axios"; // your pre-configured axios instance

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Decide badge color
  const getStatusClasses = (status) => {
    switch (status) {
      case "Processed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosinstance.get("/user/withdraw", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data || []);
        setError("");
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.error || "Failed to load transactions. Try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading transactions…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <Navbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Transaction History
        </h1>
      </div>

      {/* Desktop / Tablet Table */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 font-medium text-gray-600">
                Transaction ID
              </th>
              <th className="text-left px-4 py-2 font-medium text-gray-600">
                Date
              </th>
              <th className="text-left px-4 py-2 font-medium text-gray-600">
                Type
              </th>
              <th className="text-right px-4 py-2 font-medium text-gray-600">
                Amount (Birr)
              </th>
              <th className="text-left px-4 py-2 font-medium text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="border-b last:border-b-0">
                <td className="px-4 py-3">{txn.id}</td>
                <td className="px-4 py-3">
                  {new Date(txn.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">{txn.type}</td>
                <td className="px-4 py-3 text-right font-semibold">
                  {txn.amount?.toFixed(2)} Birr
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusClasses(
                      txn.status
                    )}`}
                  >
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="mt-6 space-y-4 sm:hidden">
        {transactions.map((txn) => (
          <div
            key={txn.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-gray-800">{txn.type}</p>
              <p className="text-sm text-gray-500">
                {new Date(txn.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">{txn.id}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                {txn.amount?.toFixed(2)} Birr
              </p>
              <span
                className={`inline-block mt-1 px-2 py-1 text-sm font-medium rounded-full ${getStatusClasses(
                  txn.status
                )}`}
              >
                {txn.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Navbar />
    </div>
  );
}
