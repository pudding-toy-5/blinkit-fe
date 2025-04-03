import IconProps from './types';

const Ellipsis: React.FC<IconProps> = ({ size = 24, color = 'black' }) => {
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
        d='M6 12C6 12.8284 5.32843 13.5 4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12ZM21 12C21 12.8284 20.3284 13.5 19.5 13.5C18.6716 13.5 18 12.8284 18 12C18 11.1716 18.6716 10.5 19.5 10.5C20.3284 10.5 21 11.1716 21 12ZM12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z'
        fill={color}
      />
    </svg>
  );
};

export default Ellipsis;
