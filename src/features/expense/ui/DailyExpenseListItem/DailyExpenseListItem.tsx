import { DailyExpense, Expense } from '@/features/expense/model/types/Expense';

import DailyExpenseRecord from '../DailyExpenseRecord/DailyExpenseRecord';

const DailyExpenseListItem: React.FC<DailyExpense> = ({ date, expenses }) => {
  if (expenses.length === 0) {
    return null;
  }

  return (
    <li
      aria-labelledby={`daily-expense-list-item-${date.getDate().toString()}`}
    >
      <p>{`${date.getDate().toString()}일`}</p>
      <ul>
        {expenses.map(
          ({ uid, category, providedCategory, memo, amount }: Expense) => (
            <DailyExpenseRecord
              key={uid}
              uid={uid}
              category={category}
              providedCategory={providedCategory}
              amount={amount}
              memo={memo}
            />
          )
        )}
      </ul>
    </li>
  );
};

export default DailyExpenseListItem;
