import {
  consumptionConsciousTexts,
  consumptionEmotionalTexts,
  consumptionEssentialTexts,
  consumptionMap,
  consumptionTextsMap,
} from './consts';
import { ConsumptionKind } from './model/types/ConsumptionKind';

export function getConsumptionTitle(kind: ConsumptionKind): string {
  return consumptionMap[kind].consumptionTexts.title;
}

export const getConsumptionTexts = (kind: ConsumptionKind) =>
  consumptionTextsMap[kind];
