import React, { useState } from "react";
import { useStateValue } from '../Context/StateProvider';
export default function BankStatementUpload({
  level,
  amounts,
  selectedAmount,
  setSelectedAmount,
}) {
  const [file, setFile] = useState(null);
  const [{ balance }, dispatch] = useStateValue();
  const handleSubmit = () => {
    if (!selectedAmount) {
      alert("Please select an amount!");
      return;
    }
    if (!file) {
      alert("Please upload a transaction detail file!");
      return;
    }
    alert(
      `Submitted for ${level} with amount ${selectedAmount} birr and file: ${file.name}`
    );
      dispatch({
            type: 'balance',
            balance: selectedAmount,
          });
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg mb-6">
      <h2 className="font-bold mb-4 text-lg">Select Amount for {level}</h2>

      {/* Amount selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {amounts.map((amt) => (
          <button
            key={amt}
            onClick={() => setSelectedAmount(amt) 
                
            }
            className={`p-3 rounded-lg border font-semibold transition ${
              selectedAmount === amt
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {amt.toLocaleString()} birr
          </button>
        ))}
      </div>

      {/* File upload */}
      <h3 className="font-semibold mb-2">Upload Transaction Detail</h3>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 block w-full text-sm"
      />

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Submit
      </button>
    </div>
  );
}
