import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from './Navbar';
import axiosinstance from "./Axios/Axios";

const WithdrawPage = () => {
  const amounts = [600, 1600, 5000, 18000, 30000, 800000, 1500000, 200000]; // amounts in Birr
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    if (!selectedAmount) {
      setError("Please select an amount");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axiosinstance.post(
        "/withdraw",
        { amount: parseInt(selectedAmount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(res.data); // log response
      setError(res.data.message); // clear previous errors

      // Redirect to transactions after success
      navigate("/transactions");

    } catch (err) {
      console.error(err);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex justify-between w-full max-w-md mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Withdraw Money</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md">
        {amounts.map((amount) => (
          <div
            key={amount}
            onClick={() => setSelectedAmount(amount)}
            className={`cursor-pointer rounded-lg p-6 text-center font-semibold text-lg border-2 transition-transform duration-200
              ${
                selectedAmount === amount
                  ? "border-indigo-500 bg-indigo-100 scale-105"
                  : "border-gray-300 hover:bg-gray-200"
              }`}
          >
            {amount} Birr
          </div>
        ))}
      </div>

      <button
        onClick={handleWithdraw}
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg"
        disabled={loading}
      >
        {loading ? "Processing..." : "Withdraw"}
      </button>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      <NavBar />
    </div>
  );
};

export default WithdrawPage;
