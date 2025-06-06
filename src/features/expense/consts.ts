import {
  Consumption,
  ConsumptionKind,
  ConsumptionTexts,
} from '@/features/expense/model/ConsumptionKind';

export const EXPENSE_MEMO_MAX_LEN = 120;

export const EXPENSE_AMOUNT_MAX = 100000000000 - 1;

export const queryKeys = {
  expenses: ['expenses'],
};

export const consumptionEssentialTexts: ConsumptionTexts = {
  title: '필수 소비',
  description: '생존, 생활 유지에 반드시 필요한 소비',
  helperText: '예시로 월세, 공과금, 식비 등이 있어요.',
};

export const consumptionEmotionalTexts: ConsumptionTexts = {
  title: '감정적 소비',
  description: '필요 없거나 충동적으로 한 소비',
  helperText: '예시로 필요 없는 구독, 스트레스 해소용 쇼핑\n등이 있어요.',
};

export const consumptionConsciousTexts: ConsumptionTexts = {
  title: '의식적 소비',
  description: '내 가치관에 따라 선택한 소비',
  helperText: '예시로 자기계발, 친구와의 약속 등이 있어요.',
};

export const consumptionEssential: Consumption = {
  consumptionKind: ConsumptionKind.essential,
  consumptionTexts: consumptionEssentialTexts,
};

export const consumptionEmotional: Consumption = {
  consumptionKind: ConsumptionKind.emotional,
  consumptionTexts: consumptionEmotionalTexts,
};

export const consumptionConscious: Consumption = {
  consumptionKind: ConsumptionKind.conscious,
  consumptionTexts: consumptionConsciousTexts,
};

export const consumptionMap = new Map<ConsumptionKind, Consumption>([
  [ConsumptionKind.essential, consumptionEssential],
  [ConsumptionKind.emotional, consumptionEmotional],
  [ConsumptionKind.conscious, consumptionConscious],
]);

export const consumptionTextsMap = new Map<ConsumptionKind, ConsumptionTexts>([
  [ConsumptionKind.essential, consumptionEssentialTexts],
  [ConsumptionKind.emotional, consumptionEmotionalTexts],
  [ConsumptionKind.conscious, consumptionConsciousTexts],
]);
