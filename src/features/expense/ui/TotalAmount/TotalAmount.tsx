import { useExpenseStore } from '@/features/expense/model/expenseStore';

const TotalAmount: React.FC = () => {
  const totalAmount = useExpenseStore((state) => state.totalAmount);

  return (
    <div className='flex flex-col'>
      <p>총 소비 내역</p>
      <div>
        <p>{totalAmount}원</p>
      </div>
    </div>
  );
};

export default TotalAmount;
