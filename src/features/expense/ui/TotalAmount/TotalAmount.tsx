import { useTotalAmount } from '@/features/expense/api/useExpenseQuery';

const TotalAmount: React.FC = () => {
  const { totalAmount } = useTotalAmount();

  return (
    <div className='flex flex-col'>
      <p>총 소비 내역</p>
      <div>
        <p>{totalAmount.toString()}원</p>
      </div>
    </div>
  );
};

export default TotalAmount;
