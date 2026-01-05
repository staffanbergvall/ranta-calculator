import { useState } from 'react';
import { useCalculatorStore } from '../../stores/calculatorStore';
import { formatCurrency } from '../../utils/calculateCompoundInterest';

export default function GoalPlanner() {
  const { params, updateParam } = useCalculatorStore();
  const [targetAmount, setTargetAmount] = useState(1000000);
  const [targetYears, setTargetYears] = useState(20);
  const [calculationMode, setCalculationMode] = useState<'monthly' | 'initial'>('monthly');

  // Calculate required monthly contribution
  const calculateRequiredMonthly = () => {
    const r = params.annualInterestRate / 100 / 12;
    const n = targetYears * 12;
    const FV = targetAmount;
    const PV = params.initialAmount;

    if (r === 0) {
      return (FV - PV) / n;
    }

    const required = (FV - PV * Math.pow(1 + r, n)) / (((Math.pow(1 + r, n) - 1) / r));
    return Math.max(0, required);
  };

  // Calculate required initial amount
  const calculateRequiredInitial = () => {
    const r = params.annualInterestRate / 100 / 12;
    const n = targetYears * 12;
    const FV = targetAmount;
    const PMT = params.monthlyContribution;

    if (r === 0) {
      return FV - PMT * n;
    }

    const required = (FV - PMT * ((Math.pow(1 + r, n) - 1) / r)) / Math.pow(1 + r, n);
    return Math.max(0, required);
  };

  const requiredMonthly = calculateRequiredMonthly();
  const requiredInitial = calculateRequiredInitial();

  // Calculate current trajectory
  const currentFutureValue = () => {
    const r = params.annualInterestRate / 100 / 12;
    const n = targetYears * 12;
    const PV = params.initialAmount;
    const PMT = params.monthlyContribution;

    if (r === 0) {
      return PV + PMT * n;
    }

    return PV * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
  };

  const currentProjection = currentFutureValue();
  const progressPercent = Math.min(100, (currentProjection / targetAmount) * 100);
  const shortfall = Math.max(0, targetAmount - currentProjection);

  const applyRecommendation = () => {
    if (calculationMode === 'monthly') {
      updateParam('monthlyContribution', Math.ceil(requiredMonthly));
    } else {
      updateParam('initialAmount', Math.ceil(requiredInitial));
    }
    updateParam('years', targetYears);
  };

  return (
    <div className="space-y-6">
      {/* Goal Settings */}
      <div className="card-enhanced noise-overlay p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">🎯</div>
          <h2 className="font-display text-3xl" style={{ color: 'var(--color-text-primary)' }}>
            Målbaserad Planering
          </h2>
        </div>
        <p style={{ color: 'var(--color-text-secondary)' }} className="mb-6">
          Sätt ett sparmål så räknar vi ut vad som krävs för att nå det
        </p>

        <div className="space-y-6">
          {/* Target Amount */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Målbelopp
            </label>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="50000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="flex justify-between mt-2">
              <span className="font-display text-2xl font-bold" style={{ color: 'var(--color-growth)' }}>
                {formatCurrency(targetAmount)}
              </span>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="text-right px-3 py-1 border-2 rounded"
                style={{
                  borderColor: 'var(--color-accent)',
                  color: 'var(--color-text-primary)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  width: '140px',
                }}
              />
            </div>
          </div>

          {/* Target Years */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Tidshorisont (år)
            </label>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={targetYears}
              onChange={(e) => setTargetYears(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="flex justify-between mt-2">
              <span className="font-display text-2xl font-bold" style={{ color: 'var(--color-contribution)' }}>
                {targetYears} år
              </span>
            </div>
          </div>

          {/* Calculation Mode */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Vad vill du optimera?
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setCalculationMode('monthly')}
                className={`flex-1 tab-button ${calculationMode === 'monthly' ? 'active' : ''}`}
              >
                Månadssparande
              </button>
              <button
                onClick={() => setCalculationMode('initial')}
                className={`flex-1 tab-button ${calculationMode === 'initial' ? 'active' : ''}`}
              >
                Startkapital
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Recommendation */}
      <div className="card-enhanced p-8">
        <h3 className="font-display text-2xl mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Din Framstegsprognos
        </h3>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span style={{ color: 'var(--color-text-secondary)' }} className="text-sm font-semibold">
              Nuvarande väg
            </span>
            <span style={{ color: 'var(--color-text-primary)' }} className="font-bold">
              {progressPercent.toFixed(0)}%
            </span>
          </div>
          <div className="h-6 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
            <div
              className="h-full transition-all duration-500 flex items-center justify-end px-3"
              style={{
                width: `${progressPercent}%`,
                background: progressPercent >= 100
                  ? 'linear-gradient(90deg, var(--color-growth) 0%, var(--color-olive-light) 100%)'
                  : 'linear-gradient(90deg, var(--color-tax) 0%, var(--color-terracotta) 100%)',
              }}
            >
              {progressPercent > 15 && (
                <span className="text-white text-xs font-bold">
                  {formatCurrency(currentProjection)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Status Message */}
        {progressPercent >= 100 ? (
          <div className="metric-card growth mb-6 p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">✅</div>
              <div>
                <div className="font-display text-xl mb-2" style={{ color: 'var(--color-growth)' }}>
                  Du är på rätt väg!
                </div>
                <div style={{ color: 'var(--color-text-secondary)' }}>
                  Med nuvarande sparande når du {formatCurrency(currentProjection)} om {targetYears} år.
                  Det är {formatCurrency(currentProjection - targetAmount)} mer än ditt mål!
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="metric-card tax mb-6 p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <div className="font-display text-xl mb-2" style={{ color: 'var(--color-tax)' }}>
                  Du saknar {formatCurrency(shortfall)}
                </div>
                <div style={{ color: 'var(--color-text-secondary)' }}>
                  Med nuvarande sparande når du endast {formatCurrency(currentProjection)} om {targetYears} år.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendation */}
        {progressPercent < 100 && (
          <div className="metric-card contribution p-6">
            <h4 className="font-display text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>
              💡 Rekommendation
            </h4>
            {calculationMode === 'monthly' ? (
              <div className="space-y-3">
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  För att nå ditt mål behöver du spara:
                </p>
                <div className="font-display text-3xl font-bold" style={{ color: 'var(--color-contribution)' }}>
                  {formatCurrency(requiredMonthly)}/månad
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Det är {formatCurrency(requiredMonthly - params.monthlyContribution)} mer än nuvarande {formatCurrency(params.monthlyContribution)}/månad
                </p>
                <button onClick={applyRecommendation} className="btn-primary w-full mt-4">
                  Applicera Rekommendation
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  För att nå ditt mål behöver du starta med:
                </p>
                <div className="font-display text-3xl font-bold" style={{ color: 'var(--color-contribution)' }}>
                  {formatCurrency(requiredInitial)}
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Det är {formatCurrency(requiredInitial - params.initialAmount)} mer än nuvarande {formatCurrency(params.initialAmount)}
                </p>
                <button onClick={applyRecommendation} className="btn-primary w-full mt-4">
                  Applicera Rekommendation
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Milestones */}
      <div className="card-enhanced noise-overlay p-8">
        <h3 className="font-display text-2xl mb-6" style={{ color: 'var(--color-text-primary)' }}>
          🏁 Milstolpar
        </h3>
        <div className="space-y-3">
          {[0.25, 0.5, 0.75, 1].map((fraction) => {
            const milestone = targetAmount * fraction;
            const yearToReach = Math.log(
              (milestone * (params.annualInterestRate / 100 / 12)) /
                params.monthlyContribution +
                1
            ) / Math.log(1 + params.annualInterestRate / 100 / 12) / 12;

            const reached = currentProjection >= milestone && targetYears >= yearToReach;

            return (
              <div
                key={fraction}
                className="flex items-center justify-between p-4 rounded border-2"
                style={{
                  borderColor: reached ? 'var(--color-growth)' : 'var(--color-text-muted)',
                  backgroundColor: reached ? 'var(--color-bg-secondary)' : 'transparent',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{reached ? '✅' : '⭕'}</div>
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {formatCurrency(milestone)} ({(fraction * 100).toFixed(0)}%)
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {isFinite(yearToReach) && yearToReach > 0 && yearToReach <= targetYears
                        ? `År ${Math.ceil(yearToReach)}`
                        : 'Ej nåbar med nuvarande parametrar'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
