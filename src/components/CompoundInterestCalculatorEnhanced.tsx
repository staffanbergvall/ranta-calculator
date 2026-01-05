import { useCalculatorStore } from '../stores/calculatorStore';
import { useUIStore } from '../stores/uiStore';
import { useCalculator } from '../hooks/useCalculator';
import { formatCurrency } from '../utils/calculateCompoundInterest';
import DarkModeToggle from './UI/DarkModeToggle';
import SliderInput from './Calculator/inputs/SliderInput';
import AccountTypeSelector from './Calculator/inputs/AccountTypeSelector';
import ChartsPanel from './Calculator/ChartsPanel';
import ScenarioManager from './Scenarios/ScenarioManager';
import ComparisonView from './Comparison/ComparisonView';
import GoalPlanner from './Goals/GoalPlanner';
import WithdrawalPlanner from './Withdrawal/WithdrawalPlanner';
import TaxOptimizer from './Optimization/TaxOptimizer';
import FIRECalculator from './FIRE/FIRECalculator';
import MonteCarloSimulation from './Simulation/MonteCarloSimulation';
import WhatIfAnalysis from './Analysis/WhatIfAnalysis';
import AIInsights from './Insights/AIInsights';

export default function CompoundInterestCalculatorEnhanced() {
  const { params, updateParam, reset } = useCalculatorStore();
  const { activeTab, setActiveTab } = useUIStore();
  const result = useCalculator(params);

  const tabCategories = [
    {
      category: 'Grundläggande',
      tabs: [
        { id: 'results' as const, name: 'Resultat', icon: '📊', desc: 'Se dina beräkningar' },
        { id: 'charts' as const, name: 'Diagram', icon: '📈', desc: 'Visualisera tillväxt' },
      ]
    },
    {
      category: 'Planering',
      tabs: [
        { id: 'goal' as const, name: 'Mål', icon: '🎯', desc: 'Sätt sparmål' },
        { id: 'withdrawal' as const, name: 'Uttag', icon: '💰', desc: 'Planera pension' },
        { id: 'fire' as const, name: 'FIRE', icon: '🔥', desc: 'Financial independence' },
      ]
    },
    {
      category: 'Analys',
      tabs: [
        { id: 'comparison' as const, name: 'Jämför', icon: '⚖️', desc: 'Jämför scenarier' },
        { id: 'whatif' as const, name: 'What-If', icon: '🔮', desc: 'Testa ändringar' },
        { id: 'monte' as const, name: 'Monte Carlo', icon: '🎲', desc: 'Sannolikhet' },
      ]
    },
    {
      category: 'Optimering',
      tabs: [
        { id: 'tax' as const, name: 'Skatt', icon: '💎', desc: 'Optimera skatt' },
        { id: 'ai' as const, name: 'AI Tips', icon: '🤖', desc: 'Smarta insikter' },
        { id: 'scenarios' as const, name: 'Scenarier', icon: '💾', desc: 'Spara & ladda' },
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
            <div className="flex-1">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-3 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                Ränta-på-ränta-kalkylator
              </h1>
              <div className="decorative-line mb-4" style={{ width: '120px', margin: '0' }}></div>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-prose" style={{ color: 'var(--color-text-secondary)' }}>
                Beräkna ränta-på-ränta effekten med svenska skatteregler och förvaltningsavgifter
              </p>
            </div>
            <div className="flex gap-3 self-start sm:self-auto">
              <button
                onClick={reset}
                className="btn-secondary text-xs sm:text-sm"
              >
                Återställ
              </button>
              <DarkModeToggle />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Parameters Panel */}
          <div className="lg:col-span-1 animate-slide-in-right">
            <div className="card-enhanced noise-overlay p-8 sticky top-4">
              <h2 className="font-display text-3xl mb-8" style={{ color: 'var(--color-text-primary)' }}>
                Parametrar
              </h2>

              <div className="space-y-6">
                {/* Account Type */}
                <AccountTypeSelector
                  value={params.accountType}
                  onChange={(type) => updateParam('accountType', type)}
                />

                {/* Initial Amount */}
                <SliderInput
                  label="Startkapital"
                  value={params.initialAmount}
                  min={0}
                  max={500000}
                  step={1000}
                  unit="kr"
                  formatDisplay={(v) => formatCurrency(v)}
                  onChange={(v) => updateParam('initialAmount', v)}
                />

                {/* Monthly Contribution */}
                <SliderInput
                  label="Månadssparande"
                  value={params.monthlyContribution}
                  min={0}
                  max={10000}
                  step={100}
                  unit="kr"
                  formatDisplay={(v) => formatCurrency(v)}
                  onChange={(v) => updateParam('monthlyContribution', v)}
                />

                {/* Interest Rate */}
                <SliderInput
                  label="Årlig avkastning"
                  value={params.annualInterestRate}
                  min={0}
                  max={20}
                  step={0.1}
                  unit="%"
                  tooltip="Förväntad genomsnittlig årlig avkastning"
                  onChange={(v) => updateParam('annualInterestRate', v)}
                />

                {/* Years */}
                <SliderInput
                  label="Antal år"
                  value={params.years}
                  min={1}
                  max={40}
                  step={1}
                  unit="år"
                  onChange={(v) => updateParam('years', v)}
                />

                {/* Management Fee */}
                <SliderInput
                  label="Förvaltningsavgift"
                  value={params.managementFeePercent}
                  min={0}
                  max={3}
                  step={0.1}
                  unit="%"
                  tooltip="Årlig avgift för förvaltning av portföljen"
                  onChange={(v) => updateParam('managementFeePercent', v)}
                />

                {/* Inflation Rate */}
                <SliderInput
                  label="Inflation"
                  value={params.inflationRate}
                  min={0}
                  max={10}
                  step={0.1}
                  unit="%"
                  tooltip="Förväntad årlig inflation för att beräkna realt värde"
                  onChange={(v) => updateParam('inflationRate', v)}
                />
              </div>
            </div>
          </div>

          {/* Main Content Panel */}
          <div className="lg:col-span-2">
            {/* Tab Navigation - Grid Layout */}
            <div className="card-enhanced p-8 mb-0 animate-fade-in-up stagger-1" style={{ borderRadius: '4px 4px 0 0', borderBottom: 'none' }}>
              <h3 className="font-display text-xl mb-6" style={{ color: 'var(--color-text-primary)' }}>
                Välj Verktyg
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tabCategories.map((category) => (
                  <div key={category.category} className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-semibold px-2" style={{ color: 'var(--color-text-muted)' }}>
                      {category.category}
                    </h4>
                    {category.tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left p-3 rounded border-2 transition-all ${
                          activeTab === tab.id
                            ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-lg'
                            : 'border-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-secondary)]'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{tab.icon}</span>
                          <span className="font-semibold text-sm">{tab.name}</span>
                        </div>
                        <p className={`text-xs ${activeTab === tab.id ? 'text-white/80' : 'text-[var(--color-text-muted)]'}`}>
                          {tab.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="card-enhanced noise-overlay p-8 animate-fade-in-up stagger-2" style={{ borderRadius: '0 0 4px 4px' }}>
              {/* Results Tab */}
              {activeTab === 'results' && (
                <div>
                  <h2 className="font-display text-3xl mb-8" style={{ color: 'var(--color-text-primary)' }}>
                    Resultat
                  </h2>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="metric-card growth animate-scale-in stagger-1">
                  <p className="text-sm font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
                    Totalt värde
                  </p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-growth)', fontFamily: 'var(--font-display)' }}>
                    {formatCurrency(result.totalValue)}
                  </p>
                </div>

                <div className="metric-card contribution animate-scale-in stagger-2">
                  <p className="text-sm font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
                    Totalt insatt
                  </p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-contribution)', fontFamily: 'var(--font-display)' }}>
                    {formatCurrency(result.totalContributions)}
                  </p>
                </div>

                <div className="metric-card growth animate-scale-in stagger-3">
                  <p className="text-sm font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
                    Ränta
                  </p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-growth)', fontFamily: 'var(--font-display)' }}>
                    {formatCurrency(result.totalInterest)}
                  </p>
                </div>

                <div className="metric-card tax animate-scale-in stagger-4">
                  <p className="text-sm font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
                    Skatt betald
                  </p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-tax)', fontFamily: 'var(--font-display)' }}>
                    {formatCurrency(result.totalTaxPaid)}
                  </p>
                </div>

                {params.managementFeePercent > 0 && (
                  <div className="metric-card fee animate-scale-in stagger-5">
                    <p className="text-sm font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
                      Avgifter
                    </p>
                    <p className="text-2xl font-bold" style={{ color: 'var(--color-fee)', fontFamily: 'var(--font-display)' }}>
                      {formatCurrency(result.totalFeesPaid)}
                    </p>
                  </div>
                )}

                {result.realValueAfterInflation && (
                  <div className="metric-card growth animate-scale-in stagger-6">
                    <p className="text-sm font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
                      Realt värde
                    </p>
                    <p className="text-2xl font-bold" style={{ color: 'var(--color-growth)', fontFamily: 'var(--font-display)' }}>
                      {formatCurrency(result.realValueAfterInflation)}
                    </p>
                  </div>
                )}
              </div>

              <div className="decorative-line"></div>

              {/* Yearly Breakdown Table */}
              <div className="mt-10 animate-fade-in-up stagger-3">
                <h3 className="font-display text-2xl mb-6" style={{ color: 'var(--color-text-primary)' }}>
                  Utveckling per år
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="text-left py-4 px-4 font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                          År
                        </th>
                        <th className="text-right py-4 px-4 font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                          Värde
                        </th>
                        <th className="text-right py-4 px-4 font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                          Skatt
                        </th>
                        {params.managementFeePercent > 0 && (
                          <th className="text-right py-4 px-4 font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                            Avgift
                          </th>
                        )}
                        <th className="text-right py-4 px-4 font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                          Ränta
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyBreakdown.map((data) => (
                        <tr key={data.year}>
                          <td className="py-4 px-4 font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                            {data.year}
                          </td>
                          <td className="py-4 px-4 text-right font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            {formatCurrency(data.value)}
                          </td>
                          <td className="py-4 px-4 text-right font-medium" style={{ color: 'var(--color-tax)' }}>
                            {formatCurrency(data.taxPaid)}
                          </td>
                          {params.managementFeePercent > 0 && (
                            <td className="py-4 px-4 text-right font-medium" style={{ color: 'var(--color-fee)' }}>
                              {formatCurrency(data.feesPaid)}
                            </td>
                          )}
                          <td className="py-4 px-4 text-right font-medium" style={{ color: 'var(--color-growth)' }}>
                            {formatCurrency(data.interest)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
                </div>
              )}

              {/* Charts Tab */}
              {activeTab === 'charts' && (
                <ChartsPanel result={result} showInflation={params.inflationRate > 0} />
              )}

              {/* Goal Tab */}
              {activeTab === 'goal' && <GoalPlanner />}

              {/* Comparison Tab */}
              {activeTab === 'comparison' && <ComparisonView />}

              {/* Withdrawal Tab */}
              {activeTab === 'withdrawal' && <WithdrawalPlanner />}

              {/* Tax Optimization Tab */}
              {activeTab === 'tax' && <TaxOptimizer />}

              {/* FIRE Tab */}
              {activeTab === 'fire' && <FIRECalculator />}

              {/* Monte Carlo Tab */}
              {activeTab === 'monte' && <MonteCarloSimulation />}

              {/* What-If Tab */}
              {activeTab === 'whatif' && <WhatIfAnalysis />}

              {/* AI Insights Tab */}
              {activeTab === 'ai' && <AIInsights />}

              {/* Scenarios Tab */}
              {activeTab === 'scenarios' && <ScenarioManager />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
