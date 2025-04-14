export const consumptionKindValues = {
  none: 'none',
  essential: 'essential',
  conscious: 'conscious',
  emotional: 'emotional',
};

export type ConsumptionKindType =
  (typeof consumptionKindValues)[keyof typeof consumptionKindValues];
