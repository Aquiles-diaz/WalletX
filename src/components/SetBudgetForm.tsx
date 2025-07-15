import React, { useState } from "react";
import { useBudget } from "../context/BudgetContext";

const SetBudgetForm: React.FC = () => {
  const { setBudget, setCurrency, currency } = useBudget();
  const [input, setInput] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(currency);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(input);
    if (isNaN(value) || value <= 0) {
      setError("Ingresá un número mayor a 0");
      return;
    }
    setBudget(value);
    setCurrency(selectedCurrency);
    setInput("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-neutral-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl mx-auto space-y-5"
    >
      <div>
        <label className="block mb-1 text-sm text-gray-300">
          Presupuesto inicial
        </label>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ej: 10000"
          className="w-full bg-neutral-800 text-white border border-gray-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-300">Divisa</label>
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="w-full bg-neutral-800 text-white border border-gray-700 px-4 py-2 rounded"
        >
          <option value="ARS">🇦🇷 Pesos Argentinos</option>
          <option value="MXN">🇲🇽 Pesos Mexicanos</option>
          <option value="USD">🇺🇸 Dólares</option>
          <option value="EUR">🇪🇺 Euros</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition-all"
      >
        Guardar presupuesto
      </button>
    </form>
  );
};

export default SetBudgetForm;
