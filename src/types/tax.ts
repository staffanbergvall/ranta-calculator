import { AccountType } from './calculator';

export interface TaxConfig {
  threshold: number;
  governmentBondRate?: number;
  standardRate?: number;
  taxRate: number;
  effectiveRate: number;
  capitalGainsTax?: number;
  fundStandardIncome?: number;
  fundEffectiveTax?: number;
  returnTax?: number;
}

export interface TaxRules {
  [year: number]: {
    [key in AccountType]?: TaxConfig;
  };
}

export interface TaxCalculation {
  year: number;
  accountType: AccountType;
  portfolioValue: number;
  taxableAmount: number;
  taxOwed: number;
}
