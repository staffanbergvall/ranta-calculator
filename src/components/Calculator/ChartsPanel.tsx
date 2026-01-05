import { ExtendedCalculatorResult } from '../../types/calculator';
import GrowthChart from './results/GrowthChart';
import ProportionChart from './results/ProportionChart';

interface ChartsPanelProps {
  result: ExtendedCalculatorResult;
  showInflation: boolean;
}

export default function ChartsPanel({ result, showInflation }: ChartsPanelProps) {
  return (
    <div className="space-y-8">
      {/* Growth Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Tillväxt över tid
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Visar hur portföljen växer över tid. Det gröna området visar totalt värde, det olivgröna
          området visar dina insättningar.
        </p>
        <GrowthChart data={result.yearlyBreakdown} showInflation={showInflation} />
      </div>

      {/* Proportion Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Fördelning per period
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Visar fördelningen mellan insättningar, ränta, skatt och avgifter för varje period.
        </p>
        <ProportionChart data={result.yearlyBreakdown} />
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-br from-cream/30 to-cream/10 dark:from-gray-800/50 dark:to-gray-700/30 rounded-xl p-6 border border-olive/10 dark:border-olive/20">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
          Nyckelstatistik
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avkastning</p>
            <p className="text-xl font-bold" style={{ color: '#4a7c59' }}>
              {((result.totalInterest / result.totalContributions) * 100).toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Skatt/Total</p>
            <p className="text-xl font-bold" style={{ color: '#c86b4a' }}>
              {((result.totalTaxPaid / result.totalValue) * 100).toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avgifter/Total</p>
            <p className="text-xl font-bold" style={{ color: '#d4834f' }}>
              {((result.totalFeesPaid / result.totalValue) * 100).toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Slutvärde/Insättningar</p>
            <p className="text-xl font-bold" style={{ color: '#4a7c59' }}>
              {(result.totalValue / result.totalContributions).toFixed(2)}x
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
