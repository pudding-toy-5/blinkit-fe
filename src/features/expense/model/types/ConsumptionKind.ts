export const ConsumptionKind = {
  none: 'none',
  essential: 'essential',
  conscious: 'conscious',
  emotional: 'emotional',
};

export type ConsumptionKind =
  (typeof ConsumptionKind)[keyof typeof ConsumptionKind];

export interface ConsumptionTexts {
  title: string;
  description: string;
  tooltipText: string;
}

export interface Consumption {
  consumptionKind: ConsumptionKind;
  consumptionTexts: ConsumptionTexts;
}
