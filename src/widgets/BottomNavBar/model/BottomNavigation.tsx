export const BottomNavigation = {
  record: '기록',
  retrospective: '회고',
  settings: '설정',
};

export type BottomNavigationType =
  (typeof BottomNavigation)[keyof typeof BottomNavigation];
