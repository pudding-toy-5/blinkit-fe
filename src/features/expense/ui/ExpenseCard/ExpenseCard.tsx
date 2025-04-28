import { useNavigate } from '@tanstack/react-router';

import CategoryTag from '@/features/category/ui/CategoryTag';
import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';
import { Expense } from '@/features/expense/model/Expense';
import { cn } from '@/shared/ui/styles/utils';

const ExpenseCard: React.FC<Omit<Expense, 'date'>> = ({
  uid,
  categories,
  amount,
  memo,
  consumptionKind,
}) => {
  const navigate = useNavigate();

  const onClick = () => {
    void navigate({ to: '/expenses/$uid', params: { uid } });
  };

  return (
    <li
      aria-labelledby={`expense-${uid}`}
      className='flex flex-col px-4 py-5 rounded-[8px] bg-white'
      onClick={onClick}
    >
      <div className='flex flex-row gap-1 items-center'>
        <span aria-label='지출 금액' className='text-[17px] font-semibold'>
          {amount.toLocaleString()}원
        </span>
        <span
          aria-label='리뷰 여부'
          className={cn(
            'text-[13px] text-[#555]',
            'px-[6px] py-[2px]',
            'rounded-[4px]',
            'bg-[#f5f3f0]'
          )}
        >
          {!consumptionKind || consumptionKind === ConsumptionKind.none
            ? '리뷰안함'
            : '리뷰완료'}
        </span>
      </div>
      <span
        aria-label='메모'
        className='text-[15px] leading-[150%] mt-1 break-words'
      >
        {memo}
      </span>
      <div className='flex flex-row flex-wrap gap-x-1 gap-y-1.5 mt-4 w-full'>
        {categories.map((category) => (
          <CategoryTag key={category.uid} tagName={category.name} />
        ))}
      </div>
    </li>
  );
};

export default ExpenseCard;
