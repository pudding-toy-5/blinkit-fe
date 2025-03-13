import { useExpenseStore } from '@/features/expense/model/expenseStore';

import DayExpensesItem from '@/features/expense/ui/DayExpensesList';
import { DayExpenses } from '@/features/expense/model/types';

const DayExpensesList = () => {
  // const month = useExpenseStore((state) => state.month);
  const dayExpenses: DayExpenses[] = useExpenseStore(
    (state) => state.dayExpenses
  );

  // const expenseList = ;

  return (
    <div className='bg-gray-100'>
      {dayExpenses.map(({ id, day, expenses }: DayExpenses) => (
        <DayExpensesItem id={id} day={day} expenses={expenses} />
      ))}
    </div>
  );
};

export default DayExpensesList;
