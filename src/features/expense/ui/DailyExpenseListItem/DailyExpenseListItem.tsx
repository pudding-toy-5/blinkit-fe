import { DailyExpense, Expense } from '@/features/expense/model/Expense';
import ExpenseCard from '@/features/expense/ui/ExpenseCard';

const DailyExpenseListItem: React.FC<DailyExpense> = ({ date, expenses }) => {
  if (expenses.length === 0) {
    return null;
  }

  const dateString = `${date.getDate().toString()}일 ${date.toLocaleDateString('ko-KR', { weekday: 'long' })}`;

  return (
    <li
      aria-labelledby={`daily-expense-list-item-${date.getDate().toString()}`}
    >
      <p
        aria-label={dateString}
        className='mb-4 text-[13px] font-normal text-[#555555]'
      >
        {dateString}
      </p>
      <ul className='flex flex-col gap-2'>
        {expenses.map(
          ({ uid, categories, amount, memo, consumptionKind }: Expense) => (
            <ExpenseCard
              key={uid}
              uid={uid}
              categories={categories}
              amount={amount}
              memo={memo}
              consumptionKind={consumptionKind}
            />
          )
        )}
      </ul>
    </li>
  );
};

export default DailyExpenseListItem;
