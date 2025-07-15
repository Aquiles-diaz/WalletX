// src/App.tsx

import React from "react";
import { Routes, Route } from "react-router-dom"; // 👈 Solo esto, no uses BrowserRouter acá
import { BudgetProvider } from "./context/BudgetContext";
import { ExpenseProvider } from "./context/ExpenseContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <BudgetProvider>
      <ExpenseProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ExpenseProvider>
    </BudgetProvider>
  );
};

export default App;
