import { Expense } from '@/features/expense/model/types';

import ExpenseItem from '@/features/expense/ui/ExpenseItem';

interface DayExpensesItemProps {
  id: string;
  day: Date;
  expenses: Expense;
}

const DayExpensesItem: React.FC<DayExpensesItemProps> = ({
  id,
  day,
  expenses,
}) => {
  return (
    <div id={id}>
      <p>{}일</p>
      <ul>
        {}
        <ExpenseItem />
      </ul>
    </div>
  );
};

export default DayExpensesItem;
