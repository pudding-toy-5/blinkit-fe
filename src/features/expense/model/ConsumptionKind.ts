export const ConsumptionKind = {
  none: 'none',
  essential: '필수 소비',
  conscious: '의식적 소비',
  emotional: '감정적 소비',
};

export type ConsumptionKind =
  (typeof ConsumptionKind)[keyof typeof ConsumptionKind];

export interface ConsumptionTexts {
  title: string;
  description: string;
  helperText: string;
}

export interface Consumption {
  consumptionKind: ConsumptionKind;
  consumptionTexts: ConsumptionTexts;
}
