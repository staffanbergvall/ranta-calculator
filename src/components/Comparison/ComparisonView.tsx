import { useState } from 'react';
import { useScenariosStore } from '../../stores/scenariosStore';
import { useCalculator } from '../../hooks/useCalculator';
import { formatCurrency } from '../../utils/calculateCompoundInterest';

export default function ComparisonView() {
  const { scenarios } = useScenariosStore();
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);

  const toggleScenario = (id: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id].slice(0, 4)
    );
  };

  const compareData = scenarios
    .filter((s) => selectedScenarios.includes(s.id))
    .map((scenario) => ({
      scenario,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      result: useCalculator(scenario.params),
    }));

  const colors = [
    'var(--color-growth)',
    'var(--color-contribution)',
    'var(--color-tax)',
    'var(--color-fee)',
  ];

  return (
    <div className="space-y-6">
      <div className="card-enhanced noise-overlay p-8">
        <h2 className="font-display text-3xl mb-4" style={{ color: 'var(--color-text-primary)' }}>
          Jämför Scenarier
        </h2>
        <p style={{ color: 'var(--color-text-secondary)' }} className="mb-6">
          Välj upp till 4 scenarier att jämföra sida vid sida
        </p>

        {/* Scenario Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => toggleScenario(scenario.id)}
              className={`p-4 rounded border-2 transition-all ${
                selectedScenarios.includes(scenario.id)
                  ? 'border-[var(--color-accent)] bg-[var(--color-bg-secondary)]'
                  : 'border-[var(--color-text-muted)] hover:border-[var(--color-text-primary)]'
              }`}
              disabled={
                !selectedScenarios.includes(scenario.id) && selectedScenarios.length >= 4
              }
            >
              <div className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {scenario.name}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                {scenario.params.accountType}
              </div>
            </button>
          ))}
        </div>

        {scenarios.length === 0 && (
          <div className="text-center py-12" style={{ color: 'var(--color-text-muted)' }}>
            Inga scenarier att jämföra. Spara några scenarier först!
          </div>
        )}
      </div>

      {/* Comparison Grid */}
      {compareData.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {/* Summary Comparison */}
          <div className="card-enhanced noise-overlay p-8">
            <h3 className="font-display text-2xl mb-6" style={{ color: 'var(--color-text-primary)' }}>
              Sammanfattning
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 uppercase text-xs tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
                      Scenario
                    </th>
                    <th className="text-right py-4 px-4 uppercase text-xs tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
                      Totalt värde
                    </th>
                    <th className="text-right py-4 px-4 uppercase text-xs tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
                      Insatt
                    </th>
                    <th className="text-right py-4 px-4 uppercase text-xs tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
                      Ränta
                    </th>
                    <th className="text-right py-4 px-4 uppercase text-xs tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
                      Skatt
                    </th>
                    <th className="text-right py-4 px-4 uppercase text-xs tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
                      Multiplikator
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareData.map(({ scenario, result }, idx) => (
                    <tr key={scenario.id}>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colors[idx] }}
                          />
                          <div>
                            <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                              {scenario.name}
                            </div>
                            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                              {scenario.params.accountType} • {scenario.params.annualInterestRate}%
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-bold font-display text-xl" style={{ color: colors[idx] }}>
                        {formatCurrency(result.totalValue)}
                      </td>
                      <td className="py-4 px-4 text-right" style={{ color: 'var(--color-text-primary)' }}>
                        {formatCurrency(result.totalContributions)}
                      </td>
                      <td className="py-4 px-4 text-right" style={{ color: 'var(--color-growth)' }}>
                        {formatCurrency(result.totalInterest)}
                      </td>
                      <td className="py-4 px-4 text-right" style={{ color: 'var(--color-tax)' }}>
                        {formatCurrency(result.totalTaxPaid)}
                      </td>
                      <td className="py-4 px-4 text-right font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {(result.totalValue / result.totalContributions).toFixed(2)}x
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Winner Badge */}
          {compareData.length > 1 && (
            <div className="card-enhanced p-6" style={{ borderColor: 'var(--color-growth)', borderWidth: '3px' }}>
              <div className="flex items-center gap-4">
                <div className="text-4xl">🏆</div>
                <div>
                  <div className="font-display text-xl" style={{ color: 'var(--color-text-primary)' }}>
                    Bästa scenariot
                  </div>
                  <div className="text-lg font-semibold" style={{ color: 'var(--color-growth)' }}>
                    {compareData.reduce((best, current) =>
                      current.result.totalValue > best.result.totalValue ? current : best
                    ).scenario.name}
                  </div>
                  <div className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    Ger {formatCurrency(
                      Math.max(...compareData.map((d) => d.result.totalValue)) -
                        Math.min(...compareData.map((d) => d.result.totalValue))
                    )} mer än sämsta alternativet
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Metrics */}
          <div className="card-enhanced noise-overlay p-8">
            <h3 className="font-display text-2xl mb-6" style={{ color: 'var(--color-text-primary)' }}>
              Detaljerad Jämförelse
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {compareData.map(({ scenario, result }, idx) => (
                <div
                  key={scenario.id}
                  className="metric-card"
                  style={{
                    borderLeft: `4px solid ${colors[idx]}`,
                  }}
                >
                  <h4 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    {scenario.name}
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--color-text-muted)' }}>Avkastning:</span>
                      <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {((result.totalInterest / result.totalContributions) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--color-text-muted)' }}>Skatt/Total:</span>
                      <span className="font-semibold" style={{ color: 'var(--color-tax)' }}>
                        {((result.totalTaxPaid / result.totalValue) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--color-text-muted)' }}>Avgifter:</span>
                      <span className="font-semibold" style={{ color: 'var(--color-fee)' }}>
                        {formatCurrency(result.totalFeesPaid)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--color-text-muted)' }}>Genomsnitt/år:</span>
                      <span className="font-semibold" style={{ color: 'var(--color-growth)' }}>
                        {formatCurrency(result.totalInterest / scenario.params.years)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
