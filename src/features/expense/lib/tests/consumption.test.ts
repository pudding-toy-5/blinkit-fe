import { consumptionMap, consumptionTextsMap } from '@/features/expense/consts';
import {
  getConsumptionTexts,
  getConsumptionTitle,
} from '@/features/expense/lib/consumption';
import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';

describe('getConsumptionTitle', () => {
  it('returns correct title.', () => {
    const kind: ConsumptionKind = ConsumptionKind.conscious;
    const title = getConsumptionTitle(kind);

    expect(title).toBe(consumptionTextsMap[kind].title);
  });

  it('if kind is none, throws error.', () => {
    const kind: ConsumptionKind = ConsumptionKind.none;

    expect(() => getConsumptionTitle(kind)).toThrowError(
      `Invalid ConsumptionKind: ${kind}`
    );
  });
});

describe('getConsumptionTexts', () => {
  it('returns correct texts.', () => {
    const kind: ConsumptionKind = ConsumptionKind.conscious;
    const title = getConsumptionTexts(kind);

    expect(title).toStrictEqual(consumptionMap[kind].consumptionTexts);
  });

  it('if kind is none, throws error.', () => {
    const kind: ConsumptionKind = ConsumptionKind.none;

    expect(() => getConsumptionTexts(kind)).toThrowError(
      `Invalid ConsumptionKind: ${kind}`
    );
  });
});
