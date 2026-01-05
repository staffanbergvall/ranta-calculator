import { create } from 'zustand';
import { ExtendedCalculatorParams, ExtendedCalculatorResult } from '../types/calculator';

interface CalculatorState {
  params: ExtendedCalculatorParams;
  result: ExtendedCalculatorResult | null;
  updateParam: <K extends keyof ExtendedCalculatorParams>(
    key: K,
    value: ExtendedCalculatorParams[K]
  ) => void;
  setParams: (params: Partial<ExtendedCalculatorParams>) => void;
  reset: () => void;
  setResult: (result: ExtendedCalculatorResult) => void;
}

const DEFAULT_PARAMS: ExtendedCalculatorParams = {
  initialAmount: 10000,
  monthlyContribution: 1000,
  annualInterestRate: 7,
  years: 10,
  accountType: 'ISK',
  contributionFrequency: 'monthly',
  managementFeePercent: 0,
  inflationRate: 0,
  startYear: 2026,
};

export const useCalculatorStore = create<CalculatorState>((set) => ({
  params: DEFAULT_PARAMS,
  result: null,

  updateParam: (key, value) =>
    set((state) => ({
      params: {
        ...state.params,
        [key]: value,
      },
    })),

  setParams: (params) =>
    set((state) => ({
      params: {
        ...state.params,
        ...params,
      },
    })),

  reset: () =>
    set({
      params: DEFAULT_PARAMS,
      result: null,
    }),

  setResult: (result) => set({ result }),
}));
