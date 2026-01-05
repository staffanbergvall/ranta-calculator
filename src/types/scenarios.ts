import { ExtendedCalculatorParams } from './calculator';

export interface Scenario {
  id: string;
  name: string;
  params: ExtendedCalculatorParams;
  createdAt: Date;
  color?: string;
}

export interface PresetProfile {
  name: string;
  description: string;
  params: Partial<ExtendedCalculatorParams>;
  color: string;
}
