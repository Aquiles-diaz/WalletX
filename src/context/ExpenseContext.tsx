import React, { createContext, useContext, useState, useEffect } from "react";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id" | "date">) => void;
  removeExpense: (id: string) => void;
  totalSpent: number;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const stored = localStorage.getItem("wallet_expenses");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("wallet_expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (data: Omit<Expense, "id" | "date">) => {
    const newExpense: Expense = {
      ...data,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, removeExpense, totalSpent }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error("useExpenses must be used within ExpenseProvider");
  return ctx;
};
