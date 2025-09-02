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
import Navabar from "./components/Navbar"
import Me from "./components/Profiles"
import Task from "./components/Tasks"
import Menu from "./components/Menu"
function App() {
   const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [balance, setBalance] = useState(0);

  const levelAmounts = {
    L1: ["3000"],
    L2: ["8000"],
    L3: ["25,500"],
    L4: ["58,000"],
    L5: ["135,000"],
    L6: ["210,000"],
    L7: ["550,000"],
    L8: ["950000"],
    L9: ["1,350,000"]
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
             <Route path="/profile" element={<Me/>} />
             <Route path="/tasks" element={<Task/>} />

            <Route path="/dashboard" element={
              <>
              
              <AdSlider />
             

        {/* <BalanceCard balance={balance} />*/} 
        <Menu></Menu>
        <br></br>
      <LevelSelector onSelect={handleLevelSelect} />

      {selectedLevel && (
        <BankStatementUpload
          level={selectedLevel}
          amounts={levelAmounts[selectedLevel]}
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
        />
      )}


        <Navabar></Navabar>      
              
              
              
              </>
            }></Route>
            
          </Routes>
        

        </AnimatePresence>
      
    </div>
  );
}

export default App;
