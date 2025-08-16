import React, { useState } from "react";
import Profile from './Profile'
import { useNavigate } from "react-router-dom";
const WithdrawPage = () => {
  const amounts = [100, 500, 1000, 2000, 5000]; // amounts in Birr
  const [selectedAmount, setSelectedAmount] = useState(null);
    const navigate = useNavigate();
  const handleWithdraw = () => {
    /*if (selectedAmount) {
      alert(`You withdrew ${selectedAmount} Birr`);
      setSelectedAmount(null);
    } else {
      alert("Please select an amount to withdraw");
    }*/

      navigate("/transactions");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
     <dic className=' flex justify-between'>
         <h1 className="text-3xl font-bold mb-6 text-indigo-600">Withdraw Money</h1>
         <Profile></Profile>
     </dic>

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
      >
        Withdraw
      </button>
    </div>
  );
};

export default WithdrawPage;
