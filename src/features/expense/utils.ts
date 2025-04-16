import { consumptionMap, consumptionTextsMap } from './consts';
import { ConsumptionKind } from './model/types/ConsumptionKind';

export function getConsumptionTitle(kind: ConsumptionKind): string {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!consumptionMap[kind]) {
    throw new Error('getConsumptionTitle error: ' + kind);
  }
  return consumptionMap[kind].consumptionTexts.title;
}

export const getConsumptionTexts = (kind: ConsumptionKind) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!consumptionTextsMap[kind]) {
    throw new Error('getConsumptionTexts error: ' + kind);
  }
  return consumptionTextsMap[kind];
};
