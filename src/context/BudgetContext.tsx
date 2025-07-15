import React, { createContext, useContext, useState } from "react";

interface BudgetContextType {
  budget: number;
  currency: string;
  setBudget: (value: number) => void;
  setCurrency: (currency: string) => void;
  isSetupComplete: boolean;
  resetApp: () => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado: presupuesto
  const [budgetState, setBudgetState] = useState<number>(() => {
    const stored = localStorage.getItem("wallet_budget");
    return stored ? parseFloat(stored) : 0;
  });

  // Estado: moneda
  const [currencyState, setCurrencyState] = useState<string>(() => {
    return localStorage.getItem("wallet_currency") || "ARS";
  });

  // Estado: app configurada
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(() => {
    return localStorage.getItem("wallet_setup_complete") === "true";
  });

  // Función: establecer presupuesto
  const setBudget = (value: number) => {
    setBudgetState(value);
    localStorage.setItem("wallet_budget", value.toString());
    localStorage.setItem("wallet_setup_complete", "true");
    setIsSetupComplete(true);
  };

  // Función: establecer moneda
  const setCurrency = (currency: string) => {
    setCurrencyState(currency);
    localStorage.setItem("wallet_currency", currency);
  };

  // Función: reiniciar app
  const resetApp = () => {
    localStorage.removeItem("wallet_budget");
    localStorage.removeItem("wallet_currency");
    localStorage.removeItem("wallet_expenses");
    localStorage.removeItem("wallet_setup_complete");
    setBudgetState(0);
    setCurrencyState("ARS");
    setIsSetupComplete(false);
  };

  // Alias para exponer estado real
  const budget = budgetState;
  const currency = currencyState;

  return (
    <BudgetContext.Provider
      value={{
        budget,
        setBudget,
        currency,
        setCurrency,
        isSetupComplete,
        resetApp,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget debe usarse dentro de un BudgetProvider");
  }
  return context;
};
