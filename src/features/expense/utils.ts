import { consumptionMap } from './consts';
import { ConsumptionKind } from './model/types/ConsumptionKind';

export function getConsumptionTitle(kind: ConsumptionKind): string {
  return consumptionMap[kind].consumptionTexts.title;
}
