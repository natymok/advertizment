import React from "react";
import Profile from './Profile'
const transactions = [
  {
    id: "TXN001",
    date: "2025-08-16",
    type: "Deposit",
    amount: 250.0,
    status: "Processed",
  },
  {
    id: "TXN002",
    date: "2025-08-15",
    type: "Withdraw",
    amount: 120.0,
    status: "In Progress",
  },
  {
    id: "TXN003",
    date: "2025-08-14",
    type: "Payment",
    amount: 50.0,
    status: "Failed",
  },
  {
    id: "TXN004",
    date: "2025-08-13",
    type: "Deposit",
    amount: 500.0,
    status: "Processed",
  },
  {
    id: "TXN005",
    date: "2025-08-12",
    type: "Withdraw",
    amount: 200.0,
    status: "Processed",
  },
];

export default function TransactionHistoryPage() {
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
    <div className="flex justify-between">
       <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Transaction History
      </h1>
      <Profile></Profile>

    </div>
     
      
      

      <div className="overflow-x-auto">
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
                Amount ($)
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
                <td className="px-4 py-3">{txn.date}</td>
                <td className="px-4 py-3">{txn.type}</td>
                <td className="px-4 py-3 text-right font-semibold">
                  ${txn.amount.toFixed(2)}
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
              <p className="text-sm text-gray-500">{txn.date}</p>
              <p className="text-sm text-gray-500">{txn.id}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-800">${txn.amount.toFixed(2)}</p>
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
    </div>
  );
}
