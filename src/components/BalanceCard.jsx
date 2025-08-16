import React from "react";
import { useStateValue } from '../Context/StateProvider';
export default function BalanceCard() {
    const [{ balance }, dispatch] = useStateValue();
  return (
    <div className="  relative overflow-hidden  bg-white p-4  rounded-lg mb-6 text-center sm:text-left ">
      <h2 className="font-bold text-lg">Your Balance</h2>
      <p className="text-2xl font-semibold">{balance} birr</p>
    </div>
  );
}
