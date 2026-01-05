import { TaxRules } from '../types/tax';

/**
 * Svenska skatteregler för investeringskonton 2025-2026
 *
 * Källor:
 * - Skatteverket: https://www.skatteverket.se/privat/skatter/vardepapper/investeringssparkontoisk.4.5fc8c94513259a4ba1d800037851.html
 * - SEB: https://seb.se/privat/livet/ekonominyheter/aktuellt/sankt-skatt-pa-sparande
 * - Morningstar: https://global.morningstar.com/sv/privatekonomi/s-blir-isk-skatten-2025
 */
export const TAX_RULES: TaxRules = {
  2025: {
    ISK: {
      threshold: 150000, // Skattefri grundnivå
      governmentBondRate: 1.96, // Statslåneränta 30 nov 2024
      standardRate: 2.96, // (1.96% + 1%)
      taxRate: 0.30, // 30% skatt på schablonintäkt
      effectiveRate: 0.00888, // 0.888% (2.96% × 30%)
    },
    Kapitalförsäkring: {
      threshold: 150000, // Skattefri grundnivå
      returnTax: 0.00888, // 0.888% avkastningsskatt
      taxRate: 0.30,
      effectiveRate: 0.00888,
    },
    AF: {
      threshold: 0,
      capitalGainsTax: 0.30, // 30% kapitalvinstskatt
      fundStandardIncome: 0.004, // 0.4% schablonskatt för fonder
      fundEffectiveTax: 0.0012, // 0.12% (0.4% × 30%)
      taxRate: 0.30,
      effectiveRate: 0.0012,
    },
  },
  2026: {
    ISK: {
      threshold: 300000, // Höjd skattefri grundnivå från 2026
      governmentBondRate: 2.16, // Uppskattat (kan ändras)
      standardRate: 3.16, // (2.16% + 1%)
      taxRate: 0.30,
      effectiveRate: 0.00948, // 0.948% (3.16% × 30%)
    },
    Kapitalförsäkring: {
      threshold: 300000, // Höjd skattefri grundnivå från 2026
      returnTax: 0.01065, // 1.065% avkastningsskatt
      taxRate: 0.30,
      effectiveRate: 0.01065,
    },
    AF: {
      threshold: 0,
      capitalGainsTax: 0.30,
      fundStandardIncome: 0.004,
      fundEffectiveTax: 0.0012,
      taxRate: 0.30,
      effectiveRate: 0.0012,
    },
  },
  // Framtida år använder 2026 års regler som standard
  2027: {
    ISK: {
      threshold: 300000,
      standardRate: 3.25, // Uppskattat
      taxRate: 0.30,
      effectiveRate: 0.00975,
    },
    Kapitalförsäkring: {
      threshold: 300000,
      returnTax: 0.01065,
      taxRate: 0.30,
      effectiveRate: 0.01065,
    },
    AF: {
      threshold: 0,
      capitalGainsTax: 0.30,
      fundStandardIncome: 0.004,
      fundEffectiveTax: 0.0012,
      taxRate: 0.30,
      effectiveRate: 0.0012,
    },
  },
};

/**
 * Hämta skatteregler för ett specifikt år och kontotyp
 * Faller tillbaka på 2027 års regler för framtida år
 */
export function getTaxRules(year: number, accountType: keyof TaxRules[number]) {
  if (TAX_RULES[year]?.[accountType]) {
    return TAX_RULES[year][accountType]!;
  }

  // Fallback till senaste kända år
  if (year >= 2027) {
    return TAX_RULES[2027]?.[accountType] || TAX_RULES[2026]?.[accountType];
  }

  if (year >= 2026) {
    return TAX_RULES[2026]?.[accountType];
  }

  return TAX_RULES[2025]?.[accountType];
}

/**
 * Beskrivningar för olika kontotyper
 */
export const ACCOUNT_TYPE_DESCRIPTIONS = {
  ISK: {
    name: 'Investeringssparkonto (ISK)',
    description: 'Schablonskatt baserad på kapitalunderlaget. Ingen skatt på vinster eller utdelningar.',
    taxInfo: '2025: Skattefritt upp till 150 000 kr. 2026: Skattefritt upp till 300 000 kr.',
  },
  Kapitalförsäkring: {
    name: 'Kapitalförsäkring',
    description: 'Årlig avkastningsskatt på det genomsnittliga värdet.',
    taxInfo: '2025: Skattefritt upp till 150 000 kr. 2026: Skattefritt upp till 300 000 kr.',
  },
  AF: {
    name: 'Aktie- och fondkonto (AF)',
    description: '30% kapitalvinstskatt på vinster vid försäljning. Schablonskatt för fonder.',
    taxInfo: '30% skatt på realiserade vinster. Fondskatt 0.12% årligen.',
  },
};
