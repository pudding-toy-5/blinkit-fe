import { consumptionMap, consumptionTextsMap } from '@/features/expense/consts';
import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';

import { getConsumptionTexts, getConsumptionTitle } from '../consumption';

describe('getConsumptionTitle', () => {
  it('returns correct title for conscious consumption.', () => {
    const kind: ConsumptionKind = ConsumptionKind.conscious;
    const title = getConsumptionTitle(kind);

    expect(title).toBe(consumptionTextsMap[kind].title);
  });

  it('returns correct title for emotional consumption.', () => {
    const kind: ConsumptionKind = ConsumptionKind.emotional;
    const title = getConsumptionTitle(kind);

    expect(title).toBe(consumptionTextsMap[kind].title);
  });

  it('returns correct title for essential consumption.', () => {
    const kind: ConsumptionKind = ConsumptionKind.essential;
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
  it('returns correct texts for conscious consumption.', () => {
    const kind: ConsumptionKind = ConsumptionKind.conscious;
    const texts = getConsumptionTexts(kind);
    expect(texts).toStrictEqual(consumptionMap[kind].consumptionTexts);
  });
  it('returns correct texts for essential consumption.', () => {
    const kind: ConsumptionKind = ConsumptionKind.essential;
    const texts = getConsumptionTexts(kind);
    expect(texts).toStrictEqual(consumptionMap[kind].consumptionTexts);
  });
  it('returns correct texts for emotional consumption.', () => {
    const kind: ConsumptionKind = ConsumptionKind.emotional;
    const texts = getConsumptionTexts(kind);
    expect(texts).toStrictEqual(consumptionMap[kind].consumptionTexts);
  });

  it('if kind is none, throws error.', () => {
    const kind: ConsumptionKind = ConsumptionKind.none;

    expect(() => getConsumptionTexts(kind)).toThrowError(
      `Invalid ConsumptionKind: ${kind}`
    );
  });
});
