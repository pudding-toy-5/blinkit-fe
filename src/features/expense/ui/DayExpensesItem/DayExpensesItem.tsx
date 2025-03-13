import { DayExpenses, Expense } from '@/features/expense/model/types';

import ExpenseItem from '@/features/expense/ui/ExpenseItem';

const DayExpensesItem: React.FC<DayExpenses> = ({ day, expenses }) => {
  return (
    <div>
      <p>{day.toISOString()}일</p>
      <ul>
        {expenses.map(({ id, category, memo, amount }: Expense) => (
          <ExpenseItem
            key={id}
            id={id}
            category={category}
            amount={amount}
            memo={memo}
          />
        ))}
      </ul>
    </div>
  );
};

export default DayExpensesItem;
