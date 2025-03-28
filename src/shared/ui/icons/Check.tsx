import IconProps from './types';

const Check: React.FC<IconProps> = ({ size = 16 }) => {
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
        d='M14 4.85733L6.9546 11.582C6.83217 11.6989 6.66488 11.7647 6.49027 11.7647C6.31567 11.7647 6.14837 11.6989 6.02594 11.582L2 7.73934L2.92866 6.88202L6.49027 10.2815L13.0713 4L14 4.85733Z'
        fill='black'
      />
    </svg>
  );
};

export default Check;
