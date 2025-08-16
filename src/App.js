import React, { useState } from "react";
import AdSlider from "./components/AdSlider";
import LevelSelector from "./components/LevelSelector";
import BankStatementUpload from "./components/BankStatementUpload";
import VideoReward from "./components/VideoReward";
import BalanceCard from "./components/BalanceCard";
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import  SignUP from './components/SignUp'
import SignIn from "./components/SignIn";
import Transaction from "./components/Transaction"
import WithdrawPage from "./components/Withdraw";
function App() {
   const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [balance, setBalance] = useState(0);

  const levelAmounts = {
    M1: [3000, 9000, 20000],
    M2: [22000, 35000, 60000],
    M3: [65000, 80000, 100000],
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setSelectedAmount(null); // reset amount when switching level
  };

  const handleRewardClaim = (amount) => {
    setBalance((prev) => prev + amount);
  };

  return (
<div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-indigo-500">DIX Advertising</h1>
        <AnimatePresence>
          <Routes>

            <Route path="/" element={<SignUP />} />
            <Route path="/transactions" element={<Transaction/>} />
            <Route path="/signup" element={<SignUP />} />
            <Route path="/signin" element={<SignIn/>}></Route>
            <Route path="/withdraw" element={<WithdrawPage/>} />

            <Route path="/dashboard" element={
              <>
              
              <AdSlider />
             

         <BalanceCard balance={balance} />

      <LevelSelector onSelect={handleLevelSelect} />

      {selectedLevel && (
        <BankStatementUpload
          level={selectedLevel}
          amounts={levelAmounts[selectedLevel]}
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
        />
      )}

      <VideoReward onReward={handleRewardClaim} />

              
              
              
              
              </>
            }></Route>
            
          </Routes>
        

        </AnimatePresence>
      
    </div>
  );
}

export default App;
