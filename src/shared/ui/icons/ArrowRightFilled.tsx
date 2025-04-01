import IconProps from './types';

const ArrowRightFilled: React.FC<IconProps> = ({
  size = 16,
  color = 'black',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{ width: size, height: size }}
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        d='M6.10919 2.83907C5.68017 2.45296 4.99654 2.75742 4.99654 3.3346V12.3408C4.99654 12.918 5.68017 13.2224 6.10919 12.8363L11.1126 8.33322C11.4069 8.06839 11.4069 7.60699 11.1126 7.34216L6.10919 2.83907Z'
        fill={color}
      />
    </svg>
  );
};

export default ArrowRightFilled;
