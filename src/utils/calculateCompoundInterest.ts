import { CalculatorParams, CalculatorResult, YearlyData } from '../types/calculator';

export function calculateCompoundInterest(params: CalculatorParams): CalculatorResult {
  const { initialAmount, monthlyContribution, annualInterestRate, years } = params;
  const monthlyRate = annualInterestRate / 100 / 12;

  const yearlyBreakdown: YearlyData[] = [];
  let currentValue = initialAmount;
  let totalContributions = initialAmount;

  for (let year = 1; year <= years; year++) {
    // Calculate monthly compound interest for this year
    for (let month = 1; month <= 12; month++) {
      currentValue = currentValue * (1 + monthlyRate) + monthlyContribution;
      totalContributions += monthlyContribution;
    }

    yearlyBreakdown.push({
      year,
      value: currentValue,
      contributions: totalContributions,
      interest: currentValue - totalContributions,
    });
  }

  const totalValue = currentValue;
  const totalInterest = totalValue - totalContributions;

  return {
    totalValue,
    totalContributions,
    totalInterest,
    yearlyBreakdown,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
