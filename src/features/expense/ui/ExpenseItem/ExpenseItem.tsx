import { Expense } from '@/features/expense/model/types';

const ExpenseItem: React.FC<Omit<Expense, 'date'>> = ({
  id,
  category,
  amount,
  memo,
}) => {
  return (
    <li id={id} aria-labelledby={`expense-${id}`}>
      <div className='flex flex-row p-4'>
        <div className='px-6px py-2' aria-label='지출 카테고리'>
          {category}
        </div>
        <p aria-label='지출 금액'>{amount.toLocaleString()}원</p>
      </div>
      <div aria-label='메모'>{memo}</div>
    </li>
  );
};

export default ExpenseItem;
