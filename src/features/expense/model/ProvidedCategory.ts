export const providedCategory = {
  food: '식비',
  home: '주거 · 통신',
  cafe: '카페 · 간식',
  drink: '술 · 유흥',
  convenience: '편의점 · 마트 · 잡화',
  shopping: '쇼핑',
  life: '생활',
  medical: '의료 · 건강 · 피트니스',
  traffic: '교통 · 자동차',
  beauty: '뷰티 · 미용',
  hobby: '취미 · 여가',
  insurance: '보험 · 세금 · 대출 · 기타금융',
  pet: '반려동물',
  donate: '기부 · 후원',
  trip: '여행 · 숙박',
  edu: '교육',
  transfer: '이체',
  pay: '급여',
  card: '카드대금',
  deffer: '후불결제대금',
  atm: 'ATM출금',
  etc: '기타 지출',
};

export type ProvidedCategoryValue =
  (typeof providedCategory)[keyof typeof providedCategory];

export type ProvidedCategoryKey = keyof typeof providedCategory;
