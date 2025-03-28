import IconProps from './types';

const X: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{
        width: size,
        height: size,
      }}
      viewBox='0 0 12 12'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.6556 6.00002L10.5 2.1556L9.8444 1.5L6 5.34442L2.1556 1.5L1.5 2.1556L5.3444 6.00002L1.5 9.84444L2.1556 10.5L6 6.65562L9.8444 10.5L10.5 9.84444L6.6556 6.00002Z'
        fill='black'
      />
    </svg>
  );
};

export default X;
