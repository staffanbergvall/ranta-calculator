/**
 * Justera ett värde för inflation
 * @param nominalValue - Nominellt värde (inte inflationsjusterat)
 * @param years - Antal år sedan start
 * @param annualInflationRate - Årlig inflationstakt i procent (t.ex. 2 för 2%)
 * @returns Realt värde justerat för inflation
 */
export function adjustForInflation(
  nominalValue: number,
  years: number,
  annualInflationRate: number
): number {
  if (annualInflationRate === 0 || years === 0) {
    return nominalValue;
  }

  // Beräkna inflationsfaktor: (1 + inflation)^years
  const inflationFactor = Math.pow(1 + annualInflationRate / 100, years);

  // Realt värde = Nominellt värde / inflationsfaktor
  return nominalValue / inflationFactor;
}

/**
 * Beräkna köpkraftsvärdet för ett framtida belopp i dagens penningvärde
 */
export function presentValue(
  futureValue: number,
  years: number,
  inflationRate: number
): number {
  return adjustForInflation(futureValue, years, inflationRate);
}

/**
 * Beräkna hur mycket köpkraft som förlorats på grund av inflation
 */
export function calculateInflationLoss(
  nominalValue: number,
  years: number,
  inflationRate: number
): number {
  const realValue = adjustForInflation(nominalValue, years, inflationRate);
  return nominalValue - realValue;
}
