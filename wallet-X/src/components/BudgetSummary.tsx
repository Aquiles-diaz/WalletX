import { useBudget } from "../context/BudgetContext";
import { useExpenses } from "../context/ExpenseContext";

const BudgetSummary: React.FC = () => {
  const { budget, currency } = useBudget();
  const { totalSpent } = useExpenses();

  const remaining = budget - totalSpent;

  return (
    <section className="bg-dark-900 text-white rounded-xl p-6 w-full max-w-md border border-gray-700 shadow-md space-y-3 animate-fade-in">
      <div className="flex justify-between">
        <span className="text-gray-400">Presupuesto total:</span>
        <span>{currency} {budget.toLocaleString()}</span>
      </div>

      <div className="flex justify-between text-red-400">
        <span>Total gastado:</span>
        <span>- {currency} {totalSpent.toLocaleString()}</span>
      </div>

      <div className="flex justify-between text-green-400 font-bold">
        <span>Presupuesto restante:</span>
        <span>{currency} {remaining.toLocaleString()}</span>
      </div>
    </section>
  );
};

export default BudgetSummary;
