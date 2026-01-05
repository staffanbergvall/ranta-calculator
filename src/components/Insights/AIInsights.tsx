import { useState } from 'react';
import { useCalculatorStore } from '../../stores/calculatorStore';
import { useCalculator } from '../../hooks/useCalculator';
import { formatCurrency } from '../../utils/calculateCompoundInterest';

export default function AIInsights() {
  const { params } = useCalculatorStore();
  const result = useCalculator(params);
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    setLoading(true);

    // AI-powered insights based on parameters
    const generatedInsights: string[] = [];

    // Savings rate analysis
    const savingsRate = (params.monthlyContribution / (params.monthlyContribution + 30000)) * 100; // Assume 30k expenses
    if (savingsRate < 10) {
      generatedInsights.push(`💡 Din spargrad (${savingsRate.toFixed(0)}%) är låg. Försök öka till minst 15% för bättre långsiktig tillväxt.`);
    } else if (savingsRate > 30) {
      generatedInsights.push(`🎯 Utmärkt spargrad (${savingsRate.toFixed(0)}%)! Du är på rätt väg mot finansiell frihet.`);
    }

    // Fee impact
    if (params.managementFeePercent > 1) {
      const feeImpact = (result.totalFeesPaid / result.totalValue) * 100;
      generatedInsights.push(`⚠️ Höga avgifter (${params.managementFeePercent}%) äter upp ${feeImpact.toFixed(1)}% av ditt slutvärde. Överväg billigare indexfonder.`);
    }

    // Time horizon
    if (params.years < 10) {
      generatedInsights.push(`⏰ Med endast ${params.years} år är det svårt för ränta-på-ränta att få full effekt. Längre horisont = större tillväxt.`);
    }

    // Account type optimization
    const taxRate = (result.totalTaxPaid / result.totalValue) * 100;
    if (params.accountType === 'AF' && taxRate > 15) {
      generatedInsights.push(`💰 ${taxRate.toFixed(1)}% av ditt värde går till skatt med Aktie- och fondkonto. ISK eller Kapitalförsäkring kan vara skatteeffektivare.`);
    }

    // Return expectations
    if (params.annualInterestRate > 10) {
      generatedInsights.push(`⚡ ${params.annualInterestRate}% avkastning är optimistiskt. Historiskt har börsen gett ~7-8% långsiktigt. Var försiktig med för höga förväntningar.`);
    }

    // Inflation consideration
    if (params.inflationRate === 0) {
      generatedInsights.push(`📊 Du har inte räknat med inflation. Med 2% inflation är ditt reala värde betydligt lägre än nominellt värde.`);
    }

    // Compound interest power
    const compoundEffect = ((result.totalInterest / result.totalContributions) * 100);
    if (compoundEffect > 50) {
      generatedInsights.push(`🚀 Ränta-på-ränta ger dig ${compoundEffect.toFixed(0)}% extra på dina insättningar! Tiden är din bästa vän.`);
    }

    // Monthly contribution vs initial
    const monthlyTotal = params.monthlyContribution * params.years * 12;
    if (params.initialAmount > monthlyTotal) {
      generatedInsights.push(`💎 Du har mer i startkapital (${formatCurrency(params.initialAmount)}) än du planerar spara (${formatCurrency(monthlyTotal)}). Överväg att öka månadssparandet.`);
    }

    // Goal-oriented insight
    const fiNumber = 30000 * 12 * 25; // Assume 30k/month expenses, 4% rule
    if (result.totalValue >= fiNumber) {
      generatedInsights.push(`🏖️ Med ${formatCurrency(result.totalValue)} efter ${params.years} år kan du potentiellt uppnå finansiell frihet (FIRE)!`);
    }

    // Risk insight based on account type
    if (params.accountType === 'ISK') {
      generatedInsights.push(`📈 ISK är perfekt för aktiehandel men kom ihåg: schablonbeskattningen gäller oavsett vinst. Bra i goda år, mindre bra vid förluster.`);
    }

    setTimeout(() => {
      setInsights(generatedInsights);
      setLoading(false);
    }, 1500); // Simulate AI processing
  };

  return (
    <div className="space-y-6">
      <div className="card-enhanced noise-overlay p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">🤖</div>
          <h2 className="font-display text-3xl" style={{ color: 'var(--color-text-primary)' }}>
            AI-drivna Insights
          </h2>
        </div>
        <p style={{ color: 'var(--color-text-secondary)' }} className="mb-6">
          Få personliga rekommendationer baserat på dina parametrar
        </p>

        {insights.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🧠</div>
            <button
              onClick={generateInsights}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Analyserar...' : 'Generera AI-rekommendationer'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, idx) => (
              <div
                key={idx}
                className="card-enhanced p-6 animate-scale-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <p style={{ color: 'var(--color-text-primary)' }} className="text-sm leading-relaxed">
                  {insight}
                </p>
              </div>
            ))}

            <button
              onClick={generateInsights}
              disabled={loading}
              className="btn-secondary w-full mt-4"
            >
              Generera nya insikter
            </button>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {insights.length > 0 && (
        <div className="card-enhanced noise-overlay p-8">
          <h3 className="font-display text-2xl mb-6" style={{ color: 'var(--color-text-primary)' }}>
            Snabbstatistik
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="metric-card">
              <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-muted)' }}>
                Avkastning
              </p>
              <p className="font-display text-2xl font-bold" style={{ color: 'var(--color-growth)' }}>
                {((result.totalInterest / result.totalContributions) * 100).toFixed(0)}%
              </p>
            </div>
            <div className="metric-card">
              <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-muted)' }}>
                Årlig tillväxt
              </p>
              <p className="font-display text-2xl font-bold" style={{ color: 'var(--color-contribution)' }}>
                {formatCurrency(result.totalInterest / params.years)}
              </p>
            </div>
            <div className="metric-card">
              <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-muted)' }}>
                Multiplikator
              </p>
              <p className="font-display text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {(result.totalValue / result.totalContributions).toFixed(2)}x
              </p>
            </div>
            <div className="metric-card">
              <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-muted)' }}>
                Total kostnad
              </p>
              <p className="font-display text-2xl font-bold" style={{ color: 'var(--color-tax)' }}>
                {formatCurrency(result.totalTaxPaid + result.totalFeesPaid)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
