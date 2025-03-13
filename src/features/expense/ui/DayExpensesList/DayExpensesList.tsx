import { useExpenseStore } from '@/features/expense/model/expenseStore';
import { DayExpenses } from '@/features/expense/model/types';

import DayExpensesItem from '@/features/expense/ui/DayExpensesItem';

const DayExpensesList = () => {
  const dayExpenses: DayExpenses[] = useExpenseStore(
    (state) => state.dayExpenses
  );

  return (
    <div className='bg-gray-100 mb-auto'>
      {dayExpenses.map(({ day, expenses }) => (
        <DayExpensesItem
          key={day.toISOString()}
          day={day}
          expenses={expenses}
        />
      ))}
    </div>
  );
};

export default DayExpensesList;
