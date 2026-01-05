export type AccountType = 'ISK' | 'Kapitalförsäkring' | 'AF';
export type ContributionFrequency = 'monthly' | 'quarterly' | 'annually';

export interface CalculatorParams {
  initialAmount: number;
  monthlyContribution: number;
  annualInterestRate: number;
  years: number;
}

export interface ExtendedCalculatorParams extends CalculatorParams {
  accountType: AccountType;
  contributionFrequency: ContributionFrequency;
  managementFeePercent: number;
  inflationRate: number;
  startYear: number; // För att hantera olika skatteregler per år
}

export interface CalculatorResult {
  totalValue: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: YearlyData[];
}

export interface ExtendedCalculatorResult extends CalculatorResult {
  totalTaxPaid: number;
  totalFeesPaid: number;
  netValue: number; // Efter skatt och avgifter
  realValueAfterInflation?: number;
  yearlyBreakdown: ExtendedYearlyData[];
}

export interface YearlyData {
  year: number;
  value: number;
  contributions: number;
  interest: number;
}

export interface ExtendedYearlyData extends YearlyData {
  taxPaid: number;
  feesPaid: number;
  netValue: number;
  inflationAdjustedValue?: number;
}
