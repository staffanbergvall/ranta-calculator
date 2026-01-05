/**
 * Beräkna årliga förvaltningsavgifter
 * @param portfolioValue - Portföljens värde
 * @param feePercent - Årsavgift i procent (t.ex. 0.5 för 0.5%)
 * @returns Avgift för året
 */
export function calculateAnnualFees(portfolioValue: number, feePercent: number): number {
  if (feePercent === 0 || portfolioValue === 0) {
    return 0;
  }

  return (portfolioValue * feePercent) / 100;
}

/**
 * Beräkna månatlig avgift (för mer exakt beräkning)
 */
export function calculateMonthlyFees(portfolioValue: number, annualFeePercent: number): number {
  return calculateAnnualFees(portfolioValue, annualFeePercent) / 12;
}

/**
 * Beräkna total avgift över flera år
 */
export function calculateTotalFees(
  yearlyData: Array<{ value: number; feePercent: number }>
): number {
  return yearlyData.reduce((total, data) => {
    return total + calculateAnnualFees(data.value, data.feePercent);
  }, 0);
}

/**
 * Beräkna hur mycket avgifter påverkar slutvärdet
 * Jämför portfölj med och utan avgifter
 */
export function calculateFeeImpact(
  initialAmount: number,
  contribution: number,
  interestRate: number,
  feePercent: number,
  years: number
): { withoutFees: number; withFees: number; totalFeeImpact: number } {
  // Förenklad beräkning - i verkligheten används den fullständiga beräkningen
  const rateWithoutFees = interestRate / 100;
  const rateWithFees = (interestRate - feePercent) / 100;

  const withoutFees =
    initialAmount * Math.pow(1 + rateWithoutFees, years) +
    (contribution * (Math.pow(1 + rateWithoutFees, years) - 1)) / rateWithoutFees;

  const withFees =
    initialAmount * Math.pow(1 + rateWithFees, years) +
    (contribution * (Math.pow(1 + rateWithFees, years) - 1)) / rateWithFees;

  return {
    withoutFees,
    withFees,
    totalFeeImpact: withoutFees - withFees,
  };
}
