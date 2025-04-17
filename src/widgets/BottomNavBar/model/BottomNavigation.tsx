export const BottomNavigation = {
  record: '기록',
  review: '리뷰',
  settings: '설정',
};

export type BottomNavigationType =
  (typeof BottomNavigation)[keyof typeof BottomNavigation];
