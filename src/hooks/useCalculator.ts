import { useMemo } from 'react';
import {
  ExtendedCalculatorParams,
  ExtendedCalculatorResult,
  ExtendedYearlyData,
} from '../types/calculator';
import { calculateYearlyTax } from '../utils/calculations/taxCalculations';
import { calculateAnnualFees } from '../utils/calculations/feesCalculation';
import { adjustForInflation } from '../utils/calculations/inflationAdjustment';

export function useCalculator(params: ExtendedCalculatorParams): ExtendedCalculatorResult {
  return useMemo(() => {
    const {
      initialAmount,
      monthlyContribution,
      annualInterestRate,
      years,
      accountType,
      contributionFrequency,
      managementFeePercent,
      inflationRate,
      startYear,
    } = params;

    // Beräkna hur ofta insättningar görs
    const contributionsPerYear =
      contributionFrequency === 'monthly' ? 12 : contributionFrequency === 'quarterly' ? 4 : 1;

    const contributionAmount =
      contributionFrequency === 'monthly'
        ? monthlyContribution
        : monthlyContribution * (12 / contributionsPerYear);

    const monthlyRate = annualInterestRate / 100 / 12;
    const yearlyBreakdown: ExtendedYearlyData[] = [];

    let currentValue = initialAmount;
    let totalContributions = initialAmount;
    let totalTaxPaid = 0;
    let totalFeesPaid = 0;

    for (let year = 1; year <= years; year++) {
      const calendarYear = startYear + year - 1;
      const startValue = currentValue;
      const startContributions = totalContributions;

      // Månadsberäkning med ränta
      for (let month = 1; month <= 12; month++) {
        // Lägg till insättning baserat på frekvens
        const shouldContribute =
          contributionFrequency === 'monthly' ||
          (contributionFrequency === 'quarterly' && month % 3 === 1) ||
          (contributionFrequency === 'annually' && month === 1);

        if (shouldContribute) {
          currentValue += contributionAmount;
          totalContributions += contributionAmount;
        }

        // Applicera månadsränta
        currentValue = currentValue * (1 + monthlyRate);
      }

      // Årliga avgifter (tas efter årets tillväxt)
      const yearlyFees = calculateAnnualFees(currentValue, managementFeePercent);
      currentValue -= yearlyFees;
      totalFeesPaid += yearlyFees;

      // Årlig skatt (beräknas på värdet efter avgifter)
      const yearlyGain = currentValue - startValue - (totalContributions - startContributions);
      const yearlyTax = calculateYearlyTax(accountType, currentValue, yearlyGain, calendarYear);
      currentValue -= yearlyTax;
      totalTaxPaid += yearlyTax;

      // Beräkna nettvärde och inflationsjusterat värde
      const netValue = currentValue;
      const inflationAdjustedValue =
        inflationRate > 0 ? adjustForInflation(netValue, year, inflationRate) : undefined;

      // Spara årsdata
      yearlyBreakdown.push({
        year,
        value: currentValue,
        contributions: totalContributions,
        interest: currentValue + totalFeesPaid + totalTaxPaid - totalContributions,
        taxPaid: yearlyTax,
        feesPaid: yearlyFees,
        netValue,
        inflationAdjustedValue,
      });
    }

    const totalValue = currentValue;
    const totalInterest = totalValue + totalFeesPaid + totalTaxPaid - totalContributions;
    const netValue = totalValue;
    const realValueAfterInflation =
      inflationRate > 0 ? adjustForInflation(netValue, years, inflationRate) : undefined;

    return {
      totalValue,
      totalContributions,
      totalInterest,
      totalTaxPaid,
      totalFeesPaid,
      netValue,
      realValueAfterInflation,
      yearlyBreakdown,
    };
  }, [params]);
}
