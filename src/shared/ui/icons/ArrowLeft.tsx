import IconProps from './types';

const ArrowLeft: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{ width: size, height: size }}
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.18104 7.54481L10.1259 2.59998L11 3.47411L6.49223 7.98187L11 12.4896L10.1259 13.3638L5.18104 8.41894C4.93965 8.17755 4.93965 7.78619 5.18104 7.54481Z'
        fill='black'
      />
    </svg>
  );
};

export default ArrowLeft;
