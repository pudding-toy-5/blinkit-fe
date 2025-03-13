import { DayExpenses, Expense } from '@/features/expense/model/types';

import ExpenseItem from '@/features/expense/ui/ExpenseItem';

const DayExpensesItem: React.FC<DayExpenses> = ({ id, day, expenses }) => {
  return (
    <div id={id}>
      <p>{day.toISOString()}일</p>
      <ul>
        {expenses.map(({ id, category, memo, amount }: Expense) => (
          <ExpenseItem
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
