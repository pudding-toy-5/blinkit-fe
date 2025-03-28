import IconProps from './types';

const ArrowLeftFilled: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{ width: size, height: size }}
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        d='M9.89078 2.83907C10.3198 2.45296 11.0034 2.75742 11.0034 3.3346V12.3408C11.0034 12.918 10.3198 13.2224 9.89078 12.8363L4.88735 8.33322C4.59309 8.06839 4.59309 7.60699 4.88735 7.34216L9.89078 2.83907Z'
        fill='black'
      />
    </svg>
  );
};

export default ArrowLeftFilled;
