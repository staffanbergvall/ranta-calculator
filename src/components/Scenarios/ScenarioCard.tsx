import { Scenario } from '../../types/scenarios';
import { formatCurrency } from '../../utils/calculateCompoundInterest';
import { useCalculator } from '../../hooks/useCalculator';
import { useScenariosStore } from '../../stores/scenariosStore';
import { useCalculatorStore } from '../../stores/calculatorStore';

interface ScenarioCardProps {
  scenario: Scenario;
}

export default function ScenarioCard({ scenario }: ScenarioCardProps) {
  const { deleteScenario } = useScenariosStore();
  const { setParams } = useCalculatorStore();
  const result = useCalculator(scenario.params);

  const handleLoad = () => {
    setParams(scenario.params);
  };

  const handleDelete = () => {
    if (confirm(`Vill du ta bort scenariot "${scenario.name}"?`)) {
      deleteScenario(scenario.id);
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl p-6 border-l-4 hover:shadow-lg transition-shadow"
      style={{ borderLeftColor: scenario.color }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {scenario.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(scenario.createdAt).toLocaleDateString('sv-SE')}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleLoad}
            className="px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
          >
            Ladda
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
          >
            Ta bort
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Kontotyp</p>
          <p className="font-medium text-gray-800 dark:text-white">{scenario.params.accountType}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Ränta</p>
          <p className="font-medium text-gray-800 dark:text-white">
            {scenario.params.annualInterestRate}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Startkapital</p>
          <p className="font-medium text-gray-800 dark:text-white">
            {formatCurrency(scenario.params.initialAmount)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Månadssparande</p>
          <p className="font-medium text-gray-800 dark:text-white">
            {formatCurrency(scenario.params.monthlyContribution)}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Efter {scenario.params.years} år:
          </span>
          <span className="text-lg font-bold text-green-600 dark:text-green-400">
            {formatCurrency(result.netValue)}
          </span>
        </div>
      </div>
    </div>
  );
}
