import { useState } from 'react';
import { formatCurrency } from '../../utils/calculateCompoundInterest';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function WithdrawalPlanner() {
  const [initialCapital, setInitialCapital] = useState(2000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(20000);
  const [annualReturn, setAnnualReturn] = useState(5);
  const [withdrawalYears, setWithdrawalYears] = useState(25);

  // Calculate withdrawal sustainability
  const calculateWithdrawalPath = () => {
    const monthlyRate = annualReturn / 100 / 12;
    const months = withdrawalYears * 12;
    let balance = initialCapital;
    const path = [];

    for (let month = 0; month <= months; month++) {
      if (month % 12 === 0) {
        path.push({
          year: month / 12,
          balance: Math.max(0, balance),
          withdrawn: month * monthlyWithdrawal,
        });
      }

      if (balance > 0) {
        balance = balance * (1 + monthlyRate) - monthlyWithdrawal;
      }
    }

    return path;
  };

  const withdrawalPath = calculateWithdrawalPath();
  const finalBalance = withdrawalPath[withdrawalPath.length - 1].balance;
  const totalWithdrawn = monthlyWithdrawal * withdrawalYears * 12;
  const sustainable = finalBalance > 0;

  // Calculate safe withdrawal rate (4% rule)
  const safeWithdrawalRate = (monthlyWithdrawal * 12) / initialCapital * 100;
  const recommendedMax = initialCapital * 0.04 / 12;

  // Find depletion year
  const depletionYear = withdrawalPath.findIndex(p => p.balance <= 0);

  return (
    <div className="space-y-6">
      {/* Settings */}
      <div className="card-enhanced noise-overlay p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">💰</div>
          <h2 className="font-display text-3xl" style={{ color: 'var(--color-text-primary)' }}>
            Uttags-planering
          </h2>
        </div>
        <p style={{ color: 'var(--color-text-secondary)' }} className="mb-6">
          Planera regelbundna uttag från din pension eller sparportfölj
        </p>

        <div className="space-y-6">
          {/* Initial Capital */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Startkapital
            </label>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="100000"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="font-display text-2xl font-bold mt-2" style={{ color: 'var(--color-growth)' }}>
              {formatCurrency(initialCapital)}
            </div>
          </div>

          {/* Monthly Withdrawal */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Månatligt uttag
            </label>
            <input
              type="range"
              min="5000"
              max="100000"
              step="1000"
              value={monthlyWithdrawal}
              onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="font-display text-2xl font-bold mt-2" style={{ color: 'var(--color-tax)' }}>
              {formatCurrency(monthlyWithdrawal)}/månad
            </div>
          </div>

          {/* Annual Return */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Förväntad årlig avkastning
            </label>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="font-display text-2xl font-bold mt-2" style={{ color: 'var(--color-contribution)' }}>
              {annualReturn}%
            </div>
          </div>

          {/* Withdrawal Period */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Uttagsperiod (år)
            </label>
            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={withdrawalYears}
              onChange={(e) => setWithdrawalYears(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="font-display text-2xl font-bold mt-2" style={{ color: 'var(--color-text-primary)' }}>
              {withdrawalYears} år
            </div>
          </div>
        </div>
      </div>

      {/* Sustainability Analysis */}
      <div className={`card-enhanced p-8 ${sustainable ? 'border-[var(--color-growth)]' : 'border-[var(--color-tax)]'}`} style={{ borderWidth: '3px' }}>
        <div className="flex items-start gap-4 mb-6">
          <div className="text-4xl">{sustainable ? '✅' : '⚠️'}</div>
          <div>
            <h3 className="font-display text-2xl mb-2" style={{ color: sustainable ? 'var(--color-growth)' : 'var(--color-tax)' }}>
              {sustainable ? 'Hållbar strategi!' : 'Ohållbar strategi!'}
            </h3>
            {sustainable ? (
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Ditt kapital räcker i {withdrawalYears} år och du har {formatCurrency(finalBalance)} kvar.
              </p>
            ) : (
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Kapitalet tar slut år {depletionYear}. Minska uttagen eller öka avkastningen.
              </p>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="metric-card">
            <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-muted)' }}>
              Uttagsgrad
            </p>
            <p className="text-xl font-bold font-display" style={{ color: safeWithdrawalRate <= 4 ? 'var(--color-growth)' : 'var(--color-tax)' }}>
              {safeWithdrawalRate.toFixed(2)}%
            </p>
          </div>
          <div className="metric-card">
            <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-muted)' }}>
              Totalt uttag
            </p>
            <p className="text-xl font-bold font-display" style={{ color: 'var(--color-tax)' }}>
              {formatCurrency(totalWithdrawn)}
            </p>
          </div>
          <div className="metric-card">
            <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-muted)' }}>
              Slutsaldo
            </p>
            <p className="text-xl font-bold font-display" style={{ color: 'var(--color-growth)' }}>
              {formatCurrency(finalBalance)}
            </p>
          </div>
          <div className="metric-card">
            <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-muted)' }}>
              4% regel
            </p>
            <p className="text-xl font-bold font-display" style={{ color: 'var(--color-contribution)' }}>
              {formatCurrency(recommendedMax)}/mån
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card-enhanced noise-overlay p-8">
        <h3 className="font-display text-2xl mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Kapitalutveckling
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={withdrawalPath}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-growth)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-growth)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-text-muted)" opacity={0.2} />
            <XAxis
              dataKey="year"
              stroke="var(--color-text-secondary)"
              label={{ value: 'År', position: 'insideBottom', offset: -5, fill: 'var(--color-text-secondary)' }}
            />
            <YAxis
              stroke="var(--color-text-secondary)"
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              label={{ value: 'Saldo (Mkr)', angle: -90, position: 'insideLeft', fill: 'var(--color-text-secondary)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-bg-tertiary)',
                border: '2px solid var(--color-charcoal)',
                borderRadius: '4px',
                color: 'var(--color-text-primary)',
              }}
              formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="var(--color-growth)"
              strokeWidth={3}
              fill="url(#balanceGradient)"
              name="Kvarvarande kapital"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recommendations */}
      {!sustainable && (
        <div className="card-enhanced p-8" style={{ borderLeft: '4px solid var(--color-terracotta)' }}>
          <h3 className="font-display text-xl mb-4" style={{ color: 'var(--color-text-primary)' }}>
            💡 Rekommendationer
          </h3>
          <div className="space-y-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Minska månatligt uttag till max {formatCurrency(recommendedMax)} (4% regel)</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Öka förväntad avkastning genom omallokering till tillväxttillgångar</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Korta ner uttagsperioden till {depletionYear > 0 ? depletionYear : 'N/A'} år</span>
            </div>
          </div>
        </div>
      )}

      {/* 4% Rule Explanation */}
      <div className="card-enhanced noise-overlay p-6">
        <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          📚 Om 4%-regeln
        </h4>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          4%-regeln säger att du kan ta ut 4% av ditt startkapital årligen (justerat för inflation)
          under 30 år med minimal risk att pengarna tar slut. Din nuvarande uttagsgrad är{' '}
          <span className="font-bold" style={{ color: safeWithdrawalRate <= 4 ? 'var(--color-growth)' : 'var(--color-tax)' }}>
            {safeWithdrawalRate.toFixed(2)}%
          </span>
          {safeWithdrawalRate <= 4 ? ' vilket är inom säker nivå.' : ' vilket kan vara riskabelt.'}
        </p>
      </div>
    </div>
  );
}
