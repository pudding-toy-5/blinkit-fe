import IconProps from './types';

const ReviewFilled: React.FC<IconProps> = ({ size = 24, color = 'black' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M14.1345 4.43872L12.7778 5.79541L14.1345 7.15211L16.8479 9.86551L18.2046 11.2222L19.5613 9.86551C20.3612 9.0656 20.9114 8.07948 20.9904 6.97937C21.0712 5.85312 20.6379 4.83701 19.9005 4.09954C19.163 3.36208 18.1469 2.92881 17.0206 3.00964C15.9205 3.08859 14.9344 3.63881 14.1345 4.43872ZM3.28098 15.2923L3 15.5733L3 15.9706V20.0407L3 21.0001H3.95933H8.0294H8.42677L8.70775 20.7191L16.8479 12.5789L17.5263 11.9005L16.8479 11.2222L12.7778 7.15209L12.0995 6.47375L11.4211 7.15209L3.28098 15.2923Z'
        fill={color}
      />
    </svg>
  );
};

export default ReviewFilled;
