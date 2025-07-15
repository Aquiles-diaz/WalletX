import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBudget } from "../context/BudgetContext";

const Home: React.FC = () => {
  const [budgetInput, setBudgetInput] = useState("");
  const [currency, setCurrency] = useState("ARS");
  const { setBudget, setCurrency: setGlobalCurrency } = useBudget();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(budgetInput);
    if (!isNaN(parsed) && parsed > 0) {
      setBudget(parsed);
      setGlobalCurrency(currency);
      navigate("/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Fondo animado de partículas */}
      <div className="absolute inset-0 animate-gradient-x bg-[linear-gradient(45deg,_#0ff,_#0f0,_#00f,_#0ff)] bg-[length:200%_200%] opacity-10 z-0"></div>

      {/* Branding WALLETX */}
      <h1 className="text-5xl md:text-6xl text-center mb-2 font-extrabold tracking-wider relative z-10 animate-pulse-text">
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-300 to-cyan-400 drop-shadow-[2px_2px_0px_rgba(0,255,255,0.3)]">
          WALLETX
        </span>
      </h1>

      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center relative z-10">
        Configura tu presupuesto
      </h2>

      <p className="text-sm text-gray-400 mb-8 text-center max-w-md relative z-10">
        "Controla tu dinero, domina tu futuro."
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900/80 border border-white/10 backdrop-blur-md rounded-xl p-8 w-full max-w-sm shadow-[0_0_20px_rgba(0,255,255,0.15)] space-y-6 relative z-10"
      >
        {/* Presupuesto */}
        <div>
          <label
            htmlFor="budget"
            className="block mb-2 text-gray-300 font-medium"
          >
            Presupuesto inicial
          </label>
          <input
            id="budget"
            type="number"
            className="w-full rounded-lg px-4 py-2 bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="0"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
          />
        </div>

        {/* Moneda */}
        <div>
          <label
            htmlFor="currency"
            className="block mb-2 text-gray-300 font-medium"
          >
            Moneda
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full rounded-lg px-4 py-2 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="ARS">ARS 🇦🇷</option>
            <option value="USD">USD 🇺🇸</option>
            <option value="EUR">EUR 🇪🇺</option>
            <option value="BRL">BRL 🇧🇷</option>
            <option value="CLP">CLP 🇨🇱</option>
          </select>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(0,255,255,0.3)]"
        >
          🚀 Comenzar
        </button>
      </form>
    </main>
  );
};

export default Home;