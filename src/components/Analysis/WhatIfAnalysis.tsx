import { useState } from 'react';
import { useCalculatorStore } from '../../stores/calculatorStore';
import { useCalculator } from '../../hooks/useCalculator';
import { formatCurrency } from '../../utils/calculateCompoundInterest';

export default function WhatIfAnalysis() {
  const { params } = useCalculatorStore();
  const baseResult = useCalculator(params);

  const [testScenarios] = useState([
    { label: 'Dubbla månadssparandet', change: { monthlyContribution: params.monthlyContribution * 2 } },
    { label: '+1% högre avkastning', change: { annualInterestRate: params.annualInterestRate + 1 } },
    { label: '+5 år längre horisont', change: { years: params.years + 5 } },
    { label: 'Halvera avgiften', change: { managementFeePercent: params.managementFeePercent / 2 } },
    { label: '+50% startkapital', change: { initialAmount: params.initialAmount * 1.5 } },
  ]);

  const scenarios = testScenarios.map(scenario => ({
    ...scenario,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    result: useCalculator({ ...params, ...scenario.change }),
  }));

  return (
    <div className="space-y-6">
      <div className="card-enhanced noise-overlay p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">🔮</div>
          <h2 className="font-display text-3xl" style={{ color: 'var(--color-text-primary)' }}>
            What-If Analys
          </h2>
        </div>
        <p style={{ color: 'var(--color-text-secondary)' }} className="mb-6">
          Se hur små förändringar påverkar slutresultatet
        </p>

        {/* Current Baseline */}
        <div className="card-enhanced p-6 mb-6" style={{ borderColor: 'var(--color-contribution)', borderWidth: '3px' }}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            🎯 Nuvarande scenario (baslinje)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Slutvärde</p>
              <p className="font-display text-xl font-bold" style={{ color: 'var(--color-growth)' }}>
                {formatCurrency(baseResult.totalValue)}
              </p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Insatt</p>
              <p className="font-display text-xl font-bold" style={{ color: 'var(--color-contribution)' }}>
                {formatCurrency(baseResult.totalContributions)}
              </p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Ränta</p>
              <p className="font-display text-xl font-bold" style={{ color: 'var(--color-growth)' }}>
                {formatCurrency(baseResult.totalInterest)}
              </p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Skatt</p>
              <p className="font-display text-xl font-bold" style={{ color: 'var(--color-tax)' }}>
                {formatCurrency(baseResult.totalTaxPaid)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Comparisons */}
      <div className="card-enhanced noise-overlay p-8">
        <h3 className="font-display text-2xl mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Testa ändringar
        </h3>

        <div className="space-y-4">
          {scenarios.map(({ label, result }, idx) => {
            const diff = result.totalValue - baseResult.totalValue;
            const percentChange = (diff / baseResult.totalValue) * 100;
            const isPositive = diff > 0;

            return (
              <div
                key={idx}
                className="card-enhanced p-6 hover:scale-[1.02] transition-transform"
                style={{
                  borderLeft: `4px solid ${isPositive ? 'var(--color-growth)' : 'var(--color-tax)'}`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {label}
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      Ny slutvärde: {formatCurrency(result.totalValue)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`font-display text-2xl font-bold ${isPositive ? 'text-[var(--color-growth)]' : 'text-[var(--color-tax)]'}`}>
                      {isPositive ? '+' : ''}{formatCurrency(diff)}
                    </div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                      {isPositive ? '+' : ''}{percentChange.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Impact Bar */}
                <div className="mt-4">
                  <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.abs(percentChange) * 2)}%`,
                        background: isPositive
                          ? 'linear-gradient(90deg, var(--color-growth) 0%, var(--color-olive-light) 100%)'
                          : 'linear-gradient(90deg, var(--color-tax) 0%, var(--color-terracotta) 100%)',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Best Impact */}
      <div className="card-enhanced p-6" style={{ borderColor: 'var(--color-growth)', borderWidth: '3px' }}>
        <div className="flex items-start gap-4">
          <div className="text-3xl">🏆</div>
          <div>
            <h3 className="font-display text-xl mb-2" style={{ color: 'var(--color-growth)' }}>
              Största positiva påverkan
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              {scenarios.reduce((best, current) =>
                (current.result.totalValue - baseResult.totalValue) > (best.result.totalValue - baseResult.totalValue)
                  ? current
                  : best
              ).label} ger {formatCurrency(Math.max(...scenarios.map(s => s.result.totalValue - baseResult.totalValue)))} mer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
