import React from "react";
import PieChartGastos from "./PieChartGastos";
import GaugeChartPresupuesto from "./GaugeChartPresupuesto";
import { useExpenses } from "../../context/ExpenseContext";
import { useBudget } from "../../context/BudgetContext";

const Estadisticas = () => {
  const { expenses } = useExpenses();
  const { budget } = useBudget();

  const totalGastado = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const percentage = budget > 0 ? (totalGastado / budget) * 100 : 0;

  return (
    <section className="w-full max-w-4xl mx-auto mt-12 space-y-10">
      <h2 className="text-3xl font-bold text-center text-white">Estadísticas</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <PieChartGastos />
        <GaugeChartPresupuesto percentage={percentage} />
      </div>
    </section>
  );
};

export default Estadisticas;
