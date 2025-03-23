import { Expense } from '@/features/expense/model/types/Expense';

const DailyExpenseRecord: React.FC<Omit<Expense, 'date'>> = ({
  uid,
  category,
  providedCategory,
  amount,
  memo,
}) => {
  return (
    <li id={uid} aria-labelledby={`expense-${uid}`}>
      <div className='flex flex-row p-4'>
        <div className='px-6px py-2' aria-label='지출 카테고리'>
          {category?.name}
          {!category && providedCategory}
        </div>
        <p aria-label='지출 금액'>{amount.toLocaleString()}원</p>
      </div>
      <div aria-label='메모'>{memo}</div>
    </li>
  );
};

export default DailyExpenseRecord;
