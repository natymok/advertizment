import React, { useEffect, useState } from "react";
import axiosinstance from "./Axios/Axios";
import NavBar from './Navbar'
export default function DepositsTable() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosinstance.get("/all/deposit", {
          headers: { Authorization: `Bearer ${token}` },
        });
         console.log(res)
        setDeposits(res.data.deposits || []);
      } catch (err) {
        setError("Failed to load deposits");
      } finally {
        setLoading(false);
      }
    };

    fetchDeposits();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        My Deposits
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left text-sm uppercase">
                <th className="py-3 px-4 border-b">Amount</th>
                <th className="py-3 px-4 border-b">Level</th>
                <th className="py-3 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {deposits.length > 0 ? (
                deposits.map((deposit, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 transition-colors text-sm"
                  >
                    <td className="py-3 px-4 border-b font-medium text-gray-800">
                      ${deposit.amount}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {deposit.level || "-"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          deposit.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : deposit.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {deposit.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    No deposits found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <NavBar></NavBar>
    </div>
  );
}
