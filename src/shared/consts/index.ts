import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';

import apiUrl from './apiUrl';

export const CONSUMPTION_COLORS = {
  [ConsumptionKind.essential]: '#28a745',
  [ConsumptionKind.conscious]: '#e7b60f',
  [ConsumptionKind.emotional]: '#ff6b6b',
} as const;

export { apiUrl };
