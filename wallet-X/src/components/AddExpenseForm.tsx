import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

const AddExpenseForm: React.FC = () => {
  const { addExpense } = useExpenses();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || isNaN(Number(amount))) return;

    addExpense({
      name,
      amount: parseFloat(amount),
      category,
    });

    setName("");
    setAmount("");
    setCategory("General");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4 shadow-[inset_4px_4px_10px_rgba(255,255,255,0.05),_inset_-4px_-4px_10px_rgba(0,0,0,0.2)]"
    >
      <h2 className="text-xl font-semibold text-white">Agregar gasto</h2>

      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-sm text-gray-300">
          Nombre del gasto
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-black/40 border border-white/10 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: Supermercado"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="amount" className="text-sm text-gray-300">
          Monto
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-black/40 border border-white/10 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: 2500"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="category" className="text-sm text-gray-300">
          Categoría
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-black/40 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="General">General</option>
          <option value="Comida">Comida</option>
          <option value="Transporte">Transporte</option>
          <option value="Salud">Salud</option>
          <option value="Entretenimiento">Entretenimiento</option>
          <option value="Educación">Educación</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all duration-300"
      >
        Guardar gasto
      </button>
    </form>
  );
};

export default AddExpenseForm;
