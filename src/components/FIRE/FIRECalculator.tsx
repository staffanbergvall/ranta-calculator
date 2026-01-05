import { useState } from 'react';
import { formatCurrency } from '../../utils/calculateCompoundInterest';

export default function FIRECalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(30000);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlySavings, setMonthlySavings] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [withdrawalRate] = useState(4);

  // Calculate FI number
  const fiNumber = (monthlyExpenses * 12) / (withdrawalRate / 100);

  // Calculate years to FI
  const calculateYearsToFI = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const targetFI = fiNumber - currentSavings;

    if (monthlySavings <= 0) return Infinity;
    if (targetFI <= 0) return 0;

    if (monthlyRate === 0) {
      return targetFI / monthlySavings / 12;
    }

    const months = Math.log((targetFI * monthlyRate) / monthlySavings + 1) / Math.log(1 + monthlyRate);
    return months / 12;
  };

  const yearsToFI = calculateYearsToFI();
  const savingsRate = monthlySavings / (monthlyExpenses + monthlySavings) * 100;

  // Coast FI calculation
  const coastFIAge = 45; // Example retirement age
  const yearsUntilRetirement = coastFIAge - 34;
  const coastFINumber = fiNumber / Math.pow(1 + expectedReturn / 100, yearsUntilRetirement);
  const isCoastFI = currentSavings >= coastFINumber;

  return (
    <div className="space-y-6">
      <div className="card-enhanced noise-overlay p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">🔥</div>
          <h2 className="font-display text-3xl" style={{ color: 'var(--color-text-primary)' }}>
            FIRE Calculator
          </h2>
        </div>
        <p style={{ color: 'var(--color-text-secondary)' }} className="mb-6">
          Financial Independence, Retire Early - Beräkna när du kan sluta jobba
        </p>

        <div className="space-y-6">
          {/* Monthly Expenses */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Månatliga utgifter
            </label>
            <input
              type="range"
              min="10000"
              max="100000"
              step="1000"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="font-display text-2xl font-bold mt-2" style={{ color: 'var(--color-tax)' }}>
              {formatCurrency(monthlyExpenses)}/månad
            </div>
          </div>

          {/* Current Savings */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Nuvarande sparkapital
            </label>
            <input
              type="range"
              min="0"
              max="5000000"
              step="50000"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="font-display text-2xl font-bold mt-2" style={{ color: 'var(--color-growth)' }}>
              {formatCurrency(currentSavings)}
            </div>
          </div>

          {/* Monthly Savings */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Månatligt sparande
            </label>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={monthlySavings}
              onChange={(e) => setMonthlySavings(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="font-display text-2xl font-bold mt-2" style={{ color: 'var(--color-contribution)' }}>
              {formatCurrency(monthlySavings)}/månad
            </div>
          </div>

          {/* Expected Return */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Förväntad årlig avkastning
            </label>
            <input
              type="range"
              min="3"
              max="15"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="font-display text-2xl font-bold mt-2" style={{ color: 'var(--color-text-primary)' }}>
              {expectedReturn}%
            </div>
          </div>
        </div>
      </div>

      {/* FI Number */}
      <div className="card-enhanced p-8" style={{ borderColor: 'var(--color-growth)', borderWidth: '3px' }}>
        <h3 className="font-display text-2xl mb-4" style={{ color: 'var(--color-text-primary)' }}>
          Ditt FI-nummer
        </h3>
        <div className="font-display text-5xl font-bold mb-4" style={{ color: 'var(--color-growth)' }}>
          {formatCurrency(fiNumber)}
        </div>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Kapitalet du behöver för att leva på {formatCurrency(monthlyExpenses)}/månad med {withdrawalRate}% uttagsregel
        </p>
        <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-text-muted)' }}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>Redan sparat:</p>
              <p className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {formatCurrency(currentSavings)}
              </p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>Kvar att spara:</p>
              <p className="font-bold" style={{ color: 'var(--color-contribution)' }}>
                {formatCurrency(Math.max(0, fiNumber - currentSavings))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="card-enhanced noise-overlay p-8">
        <h3 className="font-display text-2xl mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Din FIRE-tidslinje
        </h3>

        {yearsToFI === Infinity ? (
          <div className="text-center py-8" style={{ color: 'var(--color-text-muted)' }}>
            Du måste spara något varje månad för att nå FIRE
          </div>
        ) : yearsToFI <= 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <div className="font-display text-3xl mb-2" style={{ color: 'var(--color-growth)' }}>
              Du har redan nått FIRE!
            </div>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Du kan sluta jobba när som helst
            </p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="metric-card">
                <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  År till FIRE
                </p>
                <p className="font-display text-4xl font-bold" style={{ color: 'var(--color-growth)' }}>
                  {yearsToFI.toFixed(1)}
                </p>
              </div>
              <div className="metric-card">
                <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  FIRE-år
                </p>
                <p className="font-display text-4xl font-bold" style={{ color: 'var(--color-contribution)' }}>
                  {(new Date().getFullYear() + yearsToFI).toFixed(0)}
                </p>
              </div>
              <div className="metric-card">
                <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  Spargrad
                </p>
                <p className="font-display text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  {savingsRate.toFixed(0)}%
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                  Framsteg mot FIRE
                </span>
                <span className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  {((currentSavings / fiNumber) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-8 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (currentSavings / fiNumber) * 100)}%`,
                    background: 'linear-gradient(90deg, var(--color-growth) 0%, var(--color-olive-light) 100%)',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Coast FI */}
      {isCoastFI && (
        <div className="card-enhanced p-6" style={{ borderLeft: '4px solid var(--color-contribution)' }}>
          <div className="flex items-start gap-3">
            <div className="text-3xl">🏖️</div>
            <div>
              <h4 className="font-display text-xl mb-2" style={{ color: 'var(--color-contribution)' }}>
                Du har nått Coast FI!
              </h4>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Du kan sluta spara nu och ditt kapital kommer växa till {formatCurrency(fiNumber)} vid {coastFIAge} års ålder.
                Du behöver bara täcka dina utgifter, inte spara mer!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="card-enhanced noise-overlay p-6">
        <h4 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          💡 FIRE-tips
        </h4>
        <div className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span>Öka spargraden - varje extra procent spargrad minskar tiden till FIRE avsevärt</span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span>Diversifiera - balansera risk och avkastning för långsiktig hållbarhet</span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span>Sänk utgifterna - minskar både FI-nummer och ger mer att spara</span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span>Överväg Barista FI eller Coast FI som mellansteg</span>
          </div>
        </div>
      </div>
    </div>
  );
}
