import IconProps from './types';

const Plus: React.FC<IconProps> = ({ size = 24, color = '#222222' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{
        width: size,
        height: size,
      }}
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13 11V3H11L11 11H3V13H11L11 21H13V13H21V11H13Z'
        fill={color}
      />
    </svg>
  );
};

export default Plus;
