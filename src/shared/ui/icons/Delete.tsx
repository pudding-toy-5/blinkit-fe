import IconProps from './types';

const Delete: React.FC<IconProps> = ({ size, color = 'black' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{ width: size, height: size }}
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        d='M14.6666 8.00004C14.6666 11.6819 11.6819 14.6667 7.99998 14.6667C4.31808 14.6667 1.33331 11.6819 1.33331 8.00004C1.33331 4.31814 4.31808 1.33337 7.99998 1.33337C11.6819 1.33337 14.6666 4.31814 14.6666 8.00004Z'
        fill={color}
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M8.00001 8.94286L10.1953 11.1381L11.1381 10.1953L8.94282 8.00004L11.1381 5.80476L10.1953 4.86194L8.00001 7.05722L5.80475 4.86194L4.86194 5.80476L7.0572 8.00004L4.86194 10.1953L5.80475 11.1381L8.00001 8.94286Z'
        fill='white'
      />
    </svg>
  );
};

export default Delete;
