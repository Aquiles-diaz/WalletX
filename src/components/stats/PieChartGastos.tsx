import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useExpenses } from "../../context/ExpenseContext";

const COLORS = ["#00C2FF", "#00E396", "#FF4560", "#FEB019", "#775DD0", "#FF66C3"];

const PieChartGastos = () => {
  const { expenses } = useExpenses();

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-white/5 backdrop-blur p-4 rounded-xl border border-white/10 shadow-inner">
      <h3 className="text-white font-semibold mb-4 text-center">Gastos por categoría</h3>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          dataKey="value"
          label={({ name }) => name}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartGastos;
