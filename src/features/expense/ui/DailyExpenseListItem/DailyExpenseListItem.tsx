import { DailyExpense, Expense } from '@/features/expense/model/types';

import DailyExpenseRecord from '../DailyExpenseRecord/DailyExpenseRecord';

const DailyExpenseListItem: React.FC<DailyExpense> = ({ date, expenses }) => {
  if (expenses.length === 0) {
    return;
  }

  return (
    <li aria-labelledby={`daily-expense-list-item-${date.getDate.toString()}`}>
      <p aria-label=''>{`${date.getDate().toString()}일`}</p>
      <ul>
        {expenses.map(({ id, category, memo, amount }: Expense) => (
          <DailyExpenseRecord
            key={id}
            id={id}
            category={category}
            amount={amount}
            memo={memo}
          />
        ))}
      </ul>
    </li>
  );
};

export default DailyExpenseListItem;
