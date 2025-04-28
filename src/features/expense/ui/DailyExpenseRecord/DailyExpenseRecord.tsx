import { useNavigate } from '@tanstack/react-router';

import CategoryTag from '@/features/category/ui/CategoryTag';
import { Expense } from '@/features/expense/model/Expense';

const DailyExpenseRecord: React.FC<Omit<Expense, 'date'>> = ({
  uid,
  categories,
  amount,
  memo,
}) => {
  const navigate = useNavigate();

  const onClick = () => {
    void navigate({ to: '/expenses/$uid', params: { uid } });
  };
  return (
    <li
      aria-labelledby={`expense-${uid}`}
      className='flex flex-col p-4 rounded-[8px] bg-white'
      onClick={onClick}
    >
      <p aria-label='지출 금액' className='text-[15px] font-semibold'>
        {amount.toLocaleString()}원
      </p>
      <p
        aria-label='메모'
        className='text-[15px] leading-[150%] mt-2 break-words'
      >
        {memo}
      </p>
      <div className='flex flex-row flex-wrap gap-x-1 gap-y-1.5 mt-6 w-full'>
        {categories.map((category) => (
          <CategoryTag key={category.uid} tagName={category.name} />
        ))}
      </div>
    </li>
  );
};

export default DailyExpenseRecord;
