interface Props {
  title: string;
  description: string;
  totalAmount: number;
}

const RetrospectiveDetailHeader: React.FC<Props> = ({
  title,
  description,
  totalAmount,
}) => {
  return (
    <div className='flex flex-col px-5 pb-4'>
      <h1 className='text-[19px] text-[#222] font-semibold'>{title}</h1>
      <span className='text-[13px] text-[#555] mt-1'>{description}</span>
      <span className='text-[22px] text-[#222] font-semibold mt-3'>
        {totalAmount.toLocaleString()}원
      </span>
    </div>
  );
};

export default RetrospectiveDetailHeader;
