import { useExpenseStore } from '@/features/expense/model/expenseStore';
import { DayExpenses } from '@/features/expense/model/types';

import DayExpensesItem from '@/features/expense/ui/DayExpensesList'

const DayExpensesList = () => {
  // const month = useExpenseStore((state) => state.month);
  const expenses = useExpenseStore((state) => state.expenses);

  // const expenseList = ;

  return (
    <div className='bg-gray-100'>
      {
      expenses.map(({ id, day, expenses }: DayExpenses) => return (
        <DayExpensesItem id={id} day={day} expenses={expenses}/>
      ))
    }
    </div>
  );
};

export default DayExpensesList;
