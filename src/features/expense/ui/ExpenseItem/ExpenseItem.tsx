import { Expense } from '@/features/expense/model/types';

const ExpenseItem: React.FC<Omit<Expense, 'date'>> = ({
  id,
  category,
  amount,
  memo,
}) => {
  return (
<li id={id}>
  <div className='flex flex-row p-4'>
    <div className='px-6px py-2'>{category}</div>
    <p>{amount}원</p>
  </div>
  <div>{memo}</div>
</li>
  );
};

export default ExpenseItem;
