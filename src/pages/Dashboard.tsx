import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BudgetSummary from "../components/BudgetSummary";
import AddExpenseForm from "../components/AddExpenseForm";
import { useExpenses } from "../context/ExpenseContext";
import Estadisticas from "../components/stats/Estadisticas";

const categoryIcons: Record<string, string> = {
  General: "📦",
  Comida: "🍕",
  Transporte: "🚗",
  Salud: "💊",
  Entretenimiento: "🎮",
  Educación: "📚",
};

const Dashboard = () => {
  const [view, setView] = useState<"form" | "list" | "stats" | "none">("none");
  const { expenses, removeExpense } = useExpenses();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start px-4 py-10 space-y-10 relative overflow-hidden">
      {/* Fondo animado tipo partículas */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-900 via-black to-black opacity-30 animate-pulse" />

     <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-4 bg-gradient-to-r from-cyan-400 via-teal-300 to-green-300 text-transparent bg-clip-text drop-shadow-lg">
  WALLETX Dashboard
</h1>



      {/* Resumen del presupuesto */}
      <section className="relative z-10 w-full max-w-md">
        <BudgetSummary />
      </section>

      {/* BOTONERA */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4">
        {[
          { label: "➕ Agregar gasto", viewType: "form" },
          { label: "📋 Ver gastos", viewType: "list" },
          { label: "📈 Ver estadísticas", viewType: "stats" },
        ].map(({ label, viewType }) => (
          <button
            key={viewType}
            onClick={() => setView(viewType as typeof view)}
            className={`px-5 py-2.5 rounded-xl font-semibold border border-cyan-500/20 backdrop-blur-md text-white shadow-[inset_0_0_8px_rgba(0,255,255,0.05)] transition-all duration-300 hover:scale-105
              ${
                view === viewType
                  ? "bg-gradient-to-r from-cyan-600 to-green-500 text-black shadow-[0_0_20px_rgba(0,255,200,0.3)]"
                  : "bg-black/50 hover:bg-cyan-500/10"
              }`}
          >
            {label}
          </button>
        ))}

        <button
          onClick={() => navigate("/")}
          className="px-5 py-2.5 rounded-xl font-semibold text-black bg-gradient-to-r from-red-500 to-red-700 hover:to-red-600 border border-red-900 shadow-[0_0_12px_rgba(255,0,0,0.2)] transition-all duration-300 hover:scale-105"
        >
          ⛔ Salir
        </button>
      </div>

      {/* PANELES */}
      <section className="relative z-10 w-full max-w-2xl transition-all duration-500">
        {view === "form" && <AddExpenseForm />}

        {view === "list" && (
          <div className="space-y-4 mt-6">
            {expenses.length === 0 ? (
              <p className="text-center text-gray-400">No hay gastos registrados aún.</p>
            ) : (
              expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-[inset_4px_4px_6px_rgba(255,255,255,0.05),inset_-4px_-4px_6px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300"
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
              ))
            )}
          </div>
        )}

        {view === "stats" && <Estadisticas />}
      </section>
    </main>
  );
};

export default Dashboard;
