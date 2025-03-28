import IconProps from './types';

const FilledSuccess: React.FC<IconProps> = ({ size = 16 }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{ width: size, height: size }}
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        d='M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z'
        fill='#66CDAA'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.71231 11.4853L14.5459 5.65165L15.6066 6.71231L9.24264 13.0763C8.94974 13.3692 8.47487 13.3692 8.18198 13.0763L5 9.89429L6.06066 8.83363L8.71231 11.4853Z'
        fill='white'
      />
    </svg>
  );
};

export default FilledSuccess;
