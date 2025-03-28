import IconProps from './types';

const ArrowRight: React.FC<IconProps> = ({ size = 16 }) => {
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
        d='M5.60358 13.6567C5.80062 13.8757 6.13784 13.8934 6.35679 13.6964L11.6901 8.8966C11.8025 8.79546 11.8667 8.65137 11.8667 8.50018C11.8667 8.34899 11.8025 8.2049 11.6901 8.10376L6.35681 3.30343C6.13788 3.10638 5.80065 3.12412 5.6036 3.34305C5.40655 3.56198 5.42429 3.8992 5.64322 4.09625L10.5361 8.50015L5.64324 12.9035C5.4243 13.1006 5.40654 13.4378 5.60358 13.6567Z'
        fill='#33363D'
      />
    </svg>
  );
};

export default ArrowRight;
