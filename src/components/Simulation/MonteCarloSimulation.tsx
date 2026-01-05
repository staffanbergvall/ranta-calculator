import { useState, useMemo } from 'react';
import { formatCurrency } from '../../utils/calculateCompoundInterest';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonteCarloSimulation() {
  const [initialAmount, setInitialAmount] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [meanReturn, setMeanReturn] = useState(7);
  const [volatility, setVolatility] = useState(15);
  const [years, setYears] = useState(20);
  const [simulations] = useState(1000);

  // Run Monte Carlo simulation
  const simulationResults = useMemo(() => {
    const results: number[][] = [];

    for (let sim = 0; sim < simulations; sim++) {
      const path: number[] = [initialAmount];
      let balance = initialAmount;

      for (let month = 1; month <= years * 12; month++) {
        // Generate random return using normal distribution approximation
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

        const monthlyReturn = (meanReturn / 100 / 12) + (volatility / 100 / Math.sqrt(12)) * z0;
        balance = balance * (1 + monthlyReturn) + monthlyContribution;

        if (month % 12 === 0) {
          path.push(Math.max(0, balance));
        }
      }
      results.push(path);
    }

    return results;
  }, [initialAmount, monthlyContribution, meanReturn, volatility, years, simulations]);

  // Calculate percentiles
  const percentileData = useMemo(() => {
    const data = [];

    for (let year = 0; year <= years; year++) {
      const values = simulationResults.map(path => path[year]).sort((a, b) => a - b);
      const p10 = values[Math.floor(values.length * 0.1)];
      const p25 = values[Math.floor(values.length * 0.25)];
      const p50 = values[Math.floor(values.length * 0.5)];
      const p75 = values[Math.floor(values.length * 0.75)];
      const p90 = values[Math.floor(values.length * 0.9)];

      data.push({ year, p10, p25, p50, p75, p90 });
    }

    return data;
  }, [simulationResults, years]);

  const finalValues = simulationResults.map(path => path[path.length - 1]);
  finalValues.sort((a, b) => a - b);

  const medianOutcome = finalValues[Math.floor(finalValues.length * 0.5)];
  const worstCase = finalValues[Math.floor(finalValues.length * 0.05)];
  const bestCase = finalValues[Math.floor(finalValues.length * 0.95)];

  // Probability of reaching certain goals
  const goals = [500000, 1000000, 2000000, 5000000];
  const probabilities = goals.map(goal => ({
    goal,
    probability: (finalValues.filter(v => v >= goal).length / finalValues.length) * 100,
  }));

  return (
    <div className="space-y-6">
      <div className="card-enhanced noise-overlay p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">🎲</div>
          <h2 className="font-display text-3xl" style={{ color: 'var(--color-text-primary)' }}>
            Monte Carlo Simulering
          </h2>
        </div>
        <p style={{ color: 'var(--color-text-secondary)' }} className="mb-6">
          Simulerar {simulations.toLocaleString()} scenarier för att visa sannolikhetsspridning
        </p>

        <div className="space-y-6">
          {/* Initial Amount */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Startkapital
            </label>
            <input
              type="range"
              min="10000"
              max="500000"
              step="10000"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="font-display text-2xl font-bold mt-2" style={{ color: 'var(--color-growth)' }}>
              {formatCurrency(initialAmount)}
            </div>
          </div>

          {/* Monthly Contribution */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Månadssparande
            </label>
            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="font-display text-2xl font-bold mt-2" style={{ color: 'var(--color-contribution)' }}>
              {formatCurrency(monthlyContribution)}/månad
            </div>
          </div>

          {/* Mean Return */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Genomsnittlig avkastning
            </label>
            <input
              type="range"
              min="3"
              max="15"
              step="0.5"
              value={meanReturn}
              onChange={(e) => setMeanReturn(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="font-display text-2xl font-bold mt-2" style={{ color: 'var(--color-text-primary)' }}>
              {meanReturn}%
            </div>
          </div>

          {/* Volatility */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Volatilitet (risk)
            </label>
            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={volatility}
              onChange={(e) => setVolatility(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="font-display text-2xl font-bold mt-2" style={{ color: 'var(--color-tax)' }}>
              {volatility}%
            </div>
          </div>

          {/* Years */}
          <div>
            <label className="block text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              Tidshorisont
            </label>
            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="slider w-full"
            />
            <div className="font-display text-2xl font-bold mt-2" style={{ color: 'var(--color-text-primary)' }}>
              {years} år
            </div>
          </div>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-enhanced p-6">
          <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
            Medianresultat (50%)
          </p>
          <p className="font-display text-3xl font-bold" style={{ color: 'var(--color-contribution)' }}>
            {formatCurrency(medianOutcome)}
          </p>
        </div>
        <div className="card-enhanced p-6">
          <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
            Sämsta 5%
          </p>
          <p className="font-display text-3xl font-bold" style={{ color: 'var(--color-tax)' }}>
            {formatCurrency(worstCase)}
          </p>
        </div>
        <div className="card-enhanced p-6">
          <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
            Bästa 5%
          </p>
          <p className="font-display text-3xl font-bold" style={{ color: 'var(--color-growth)' }}>
            {formatCurrency(bestCase)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="card-enhanced noise-overlay p-8">
        <h3 className="font-display text-2xl mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Sannolikhetsspridning
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={percentileData}>
            <defs>
              <linearGradient id="range90" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-growth)" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="var(--color-growth)" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="range50" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-contribution)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-contribution)" stopOpacity={0.1}/>
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
            <Area type="monotone" dataKey="p90" stroke="none" fill="url(#range90)" name="10-90 percentil" />
            <Area type="monotone" dataKey="p75" stroke="none" fill="url(#range50)" name="25-75 percentil" />
            <Area type="monotone" dataKey="p50" stroke="var(--color-contribution)" strokeWidth={3} fill="none" name="Median" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Goal Probabilities */}
      <div className="card-enhanced noise-overlay p-8">
        <h3 className="font-display text-2xl mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Sannolikhet att nå mål
        </h3>
        <div className="space-y-4">
          {probabilities.map(({ goal, probability }) => (
            <div key={goal}>
              <div className="flex justify-between mb-2">
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  {formatCurrency(goal)}
                </span>
                <span className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  {probability.toFixed(1)}%
                </span>
              </div>
              <div className="h-6 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                <div
                  className="h-full transition-all duration-500 flex items-center justify-end px-3"
                  style={{
                    width: `${probability}%`,
                    background: probability >= 80
                      ? 'linear-gradient(90deg, var(--color-growth) 0%, var(--color-olive-light) 100%)'
                      : probability >= 50
                      ? 'linear-gradient(90deg, var(--color-contribution) 0%, var(--color-olive) 100%)'
                      : 'linear-gradient(90deg, var(--color-tax) 0%, var(--color-terracotta) 100%)',
                  }}
                >
                  {probability > 10 && (
                    <span className="text-white text-xs font-bold">{probability.toFixed(0)}%</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="card-enhanced p-6">
        <h4 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          📊 Om Monte Carlo-simulering
        </h4>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Monte Carlo-simulering kör {simulations.toLocaleString()} slumpmässiga scenarier med varierande avkastning baserat på
          din genomsnittliga förväntning ({meanReturn}%) och volatilitet ({volatility}%). Detta ger en realistisk bild
          av möjliga utfall och hjälper dig förstå risken i din investeringsstrategi.
        </p>
      </div>
    </div>
  );
}
