const Navigation = {
  record: '기록',
  review: '리뷰',
  settings: '설정',
};

type Navigation = (typeof Navigation)[keyof typeof Navigation];

export default Navigation;
