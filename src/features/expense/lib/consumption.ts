import { consumptionMap, consumptionTextsMap } from '@/features/expense/consts';
import {
  ConsumptionKind,
  ConsumptionTexts,
} from '@/features/expense/model/ConsumptionKind';

export function getConsumptionTitle(kind: ConsumptionKind): string {
  const entry = consumptionTextsMap.get(kind);

  if (!entry) {
    throw new Error(`Invalid ConsumptionKind: ${kind}`);
  }

  return entry.title;
}

export function getConsumptionTexts(kind: ConsumptionKind): ConsumptionTexts {
  const entry = consumptionMap.get(kind);

  if (!entry) {
    throw new Error(`Invalid ConsumptionKind: ${kind}`);
  }

  return entry.consumptionTexts;
}
