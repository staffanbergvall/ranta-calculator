import { AccountType } from '../../types/calculator';
import { getTaxRules } from '../../constants/taxRules';

/**
 * Beräkna årlig skatt för ISK-konto
 * Schablonintäkt baseras på kapitalunderlaget
 */
export function calculateISKTax(portfolioValue: number, year: number): number {
  const rules = getTaxRules(year, 'ISK');
  if (!rules) return 0;

  // Endast belopp över tröskelvärdet beskattas
  const taxableAmount = Math.max(0, portfolioValue - rules.threshold);

  // Effektiv skattesats på det beskattningsbara beloppet
  return taxableAmount * rules.effectiveRate;
}

/**
 * Beräkna årlig skatt för vanligt aktie-/fondkonto
 * För förenkling: använder schablonskatt för fonder + uppskattar kapitalvinstskatt
 */
export function calculateRegularAccountTax(
  portfolioValue: number,
  yearlyGain: number,
  year: number
): number {
  const rules = getTaxRules(year, 'AF');
  if (!rules) return 0;

  // Schablonskatt på fondvärde (årlig)
  const fundTax = portfolioValue * (rules.fundEffectiveTax || 0);

  // Kapitalvinstskatt på årets vinst (för förenkling)
  // I verkligheten betalas detta endast vid försäljning
  const capitalGainsTax = yearlyGain > 0 ? yearlyGain * (rules.capitalGainsTax || 0) : 0;

  return fundTax + capitalGainsTax;
}

/**
 * Beräkna årlig skatt för kapitalförsäkring
 * Avkastningsskatt baseras på genomsnittligt värde
 */
export function calculateKapitalförsäkringTax(portfolioValue: number, year: number): number {
  const rules = getTaxRules(year, 'Kapitalförsäkring');
  if (!rules) return 0;

  // Endast belopp över tröskelvärdet beskattas
  const taxableAmount = Math.max(0, portfolioValue - rules.threshold);

  // Avkastningsskatt på det beskattningsbara beloppet
  return taxableAmount * (rules.returnTax || rules.effectiveRate);
}

/**
 * Huvudfunktion för att beräkna skatt baserat på kontotyp
 */
export function calculateYearlyTax(
  accountType: AccountType,
  portfolioValue: number,
  yearlyGain: number,
  calendarYear: number
): number {
  switch (accountType) {
    case 'ISK':
      return calculateISKTax(portfolioValue, calendarYear);

    case 'Kapitalförsäkring':
      return calculateKapitalförsäkringTax(portfolioValue, calendarYear);

    case 'AF':
      return calculateRegularAccountTax(portfolioValue, yearlyGain, calendarYear);

    default:
      return 0;
  }
}

/**
 * Beräkna sammanlagd skatt över flera år
 */
export function calculateTotalTax(
  accountType: AccountType,
  yearlyData: Array<{
    year: number;
    value: number;
    gain: number;
    calendarYear: number;
  }>
): number {
  return yearlyData.reduce((total, data) => {
    return total + calculateYearlyTax(accountType, data.value, data.gain, data.calendarYear);
  }, 0);
}
