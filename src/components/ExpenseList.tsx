import React from "react";
import { useExpenses } from "../context/ExpenseContext";

const categoryIcons: Record<string, string> = {
  General: "📦",
  Comida: "🍕",
  Transporte: "🚗",
  Salud: "💊",
  Entretenimiento: "🎮",
  Educación: "📚",
};

const ExpenseList = () => {
  const { expenses, removeExpense } = useExpenses();

  if (expenses.length === 0) {
    return (
      <p className="text-center text-gray-400">
        No hay gastos registrados aún.
      </p>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between bg-black/30 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-[inset_6px_6px_10px_rgba(255,255,255,0.05),inset_-6px_-6px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {categoryIcons[expense.category] || "💸"}
            </span>
            <div>
              <p className="font-semibold text-white">{expense.name}</p>
              <p className="text-sm text-gray-400">
                {expense.category} – USD {expense.amount.toFixed(2)}
              </p>
            </div>
          </div>
          <button
            onClick={() => removeExpense(expense.id)}
            className="text-red-500 hover:text-red-700 text-lg transition-all duration-300"
          >
            ✖️
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
