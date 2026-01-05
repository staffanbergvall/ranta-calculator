import { PresetProfile } from '../types/scenarios';

export const PRESET_PROFILES: PresetProfile[] = [
  {
    name: 'Konservativ',
    description: 'Låg risk med stabil avkastning. Passar för kortsiktigt sparande.',
    params: {
      annualInterestRate: 3,
      accountType: 'ISK',
      managementFeePercent: 0.2,
    },
    color: '#10B981', // green
  },
  {
    name: 'Måttlig',
    description: 'Balanserad risk och avkastning. Passar för långsiktigt sparande.',
    params: {
      annualInterestRate: 7,
      accountType: 'ISK',
      managementFeePercent: 0.5,
    },
    color: '#3B82F6', // blue
  },
  {
    name: 'Aggressiv',
    description: 'Hög risk med potential för hög avkastning. Passar för mycket långsiktigt sparande.',
    params: {
      annualInterestRate: 10,
      accountType: 'ISK',
      managementFeePercent: 0.8,
    },
    color: '#EF4444', // red
  },
];
