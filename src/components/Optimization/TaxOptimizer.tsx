import { useState } from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import { formatCurrency } from '../../utils/calculateCompoundInterest';
import { ExtendedCalculatorParams, AccountType } from '../../types/calculator';

export default function TaxOptimizer() {
  const [baseParams, setBaseParams] = useState<ExtendedCalculatorParams>({
    initialAmount: 100000,
    monthlyContribution: 3000,
    annualInterestRate: 7,
    years: 20,
    accountType: 'ISK',
    contributionFrequency: 'monthly',
    managementFeePercent: 0.5,
    inflationRate: 2,
    startYear: 2026,
  });

  const accountTypes: AccountType[] = ['ISK', 'Kapitalförsäkring', 'AF'];

  const results = accountTypes.map((accountType) => ({
    accountType,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    result: useCalculator({ ...baseParams, accountType }),
  }));

  const bestAccount = results.reduce((best, current) =>
    current.result.totalValue > best.result.totalValue ? current : best
  );

  const worstAccount = results.reduce((worst, current) =>
    current.result.totalValue < worst.result.totalValue ? current : worst
  );

  const savings = bestAccount.result.totalValue - worstAccount.result.totalValue;

  return (
    <div className="space-y-6">
      <div className="card-enhanced noise-overlay p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">🎯</div>
          <h2 className="font-display text-3xl" style={{ color: 'var(--color-text-primary)' }}>
            Skatteoptimering
          </h2>
        </div>
        <p style={{ color: 'var(--color-text-secondary)' }} className="mb-6">
          Jämför olika kontotyper och hitta det skatteeffektivaste alternativet
        </p>

        {/* Input Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Startkapital
            </label>
            <input
              type="number"
              value={baseParams.initialAmount}
              onChange={(e) => setBaseParams({ ...baseParams, initialAmount: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded border-2"
              style={{
                borderColor: 'var(--color-accent)',
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Månadssparande
            </label>
            <input
              type="number"
              value={baseParams.monthlyContribution}
              onChange={(e) => setBaseParams({ ...baseParams, monthlyContribution: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded border-2"
              style={{
                borderColor: 'var(--color-accent)',
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Årlig avkastning (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={baseParams.annualInterestRate}
              onChange={(e) => setBaseParams({ ...baseParams, annualInterestRate: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded border-2"
              style={{
                borderColor: 'var(--color-accent)',
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Antal år
            </label>
            <input
              type="number"
              value={baseParams.years}
              onChange={(e) => setBaseParams({ ...baseParams, years: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded border-2"
              style={{
                borderColor: 'var(--color-accent)',
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Best Recommendation */}
      <div className="card-enhanced p-8" style={{ borderColor: 'var(--color-growth)', borderWidth: '3px' }}>
        <div className="flex items-start gap-4">
          <div className="text-4xl">🏆</div>
          <div>
            <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--color-growth)' }}>
              Bästa valet: {bestAccount.accountType}
            </h3>
            <p className="text-lg mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Med {bestAccount.accountType} får du {formatCurrency(bestAccount.result.totalValue)} efter {baseParams.years} år
            </p>
            <div className="inline-block px-4 py-2 rounded" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Du sparar </span>
              <span className="font-display text-xl font-bold" style={{ color: 'var(--color-growth)' }}>
                {formatCurrency(savings)}
              </span>
              <span style={{ color: 'var(--color-text-muted)' }}> jämfört med {worstAccount.accountType}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Comparison */}
      <div className="card-enhanced noise-overlay p-8">
        <h3 className="font-display text-2xl mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Detaljerad jämförelse
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-4 px-4 uppercase text-xs tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
                  Kontotyp
                </th>
                <th className="text-right py-4 px-4 uppercase text-xs tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
                  Slutvärde
                </th>
                <th className="text-right py-4 px-4 uppercase text-xs tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
                  Total skatt
                </th>
                <th className="text-right py-4 px-4 uppercase text-xs tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
                  Skattegrad
                </th>
                <th className="text-right py-4 px-4 uppercase text-xs tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
                  Ranking
                </th>
              </tr>
            </thead>
            <tbody>
              {results
                .sort((a, b) => b.result.totalValue - a.result.totalValue)
                .map(({ accountType, result }, idx) => (
                  <tr key={accountType} className={idx === 0 ? 'bg-[var(--color-bg-secondary)]' : ''}>
                    <td className="py-4 px-4">
                      <div className="font-semibold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                        {idx === 0 && <span>🥇</span>}
                        {idx === 1 && <span>🥈</span>}
                        {idx === 2 && <span>🥉</span>}
                        {accountType}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-bold font-display" style={{ color: idx === 0 ? 'var(--color-growth)' : 'var(--color-text-primary)' }}>
                      {formatCurrency(result.totalValue)}
                    </td>
                    <td className="py-4 px-4 text-right" style={{ color: 'var(--color-tax)' }}>
                      {formatCurrency(result.totalTaxPaid)}
                    </td>
                    <td className="py-4 px-4 text-right font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {((result.totalTaxPaid / result.totalValue) * 100).toFixed(1)}%
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="inline-block px-3 py-1 rounded text-xs font-bold" style={{
                        backgroundColor: idx === 0 ? 'var(--color-growth)' : 'var(--color-bg-secondary)',
                        color: idx === 0 ? 'white' : 'var(--color-text-primary)',
                      }}>
                        #{idx + 1}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {results.map(({ accountType, result }) => {
          const taxRate = (result.totalTaxPaid / result.totalValue) * 100;
          let recommendation = '';

          if (accountType === 'ISK') {
            recommendation = 'Bäst för aktiehandel med schablonbeskattning. Enkel och förutsägbar skatt.';
          } else if (accountType === 'Kapitalförsäkring') {
            recommendation = 'Skattefri utdelning och ingen deklaration. Bra för passiva placeringar.';
          } else {
            recommendation = 'Standard beskattning. Enbart intressant om du har förluster att kvitta.';
          }

          return (
            <div key={accountType} className="card-enhanced p-6">
              <h4 className="font-display text-lg mb-2" style={{ color: 'var(--color-text-primary)' }}>
                {accountType}
              </h4>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-text-muted)' }}>Slutvärde:</span>
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {formatCurrency(result.totalValue)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-text-muted)' }}>Skattegrad:</span>
                  <span className="font-semibold" style={{ color: 'var(--color-tax)' }}>
                    {taxRate.toFixed(1)}%
                  </span>
                </div>
              </div>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                {recommendation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
