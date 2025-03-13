import { useExpenseStore } from '@/features/expense/model/expenseStore';

const DayExpenseList = () => {
  const month = useExpenseStore((state) => state.month);
  const expenses = useExpenseStore((state) => state.expenses);

  // const expenseList = ;

  return (
    <div className='bg-gray-100'>
      {expenses.map(() => (
        <DayExpenseItem />
      ))}
    </div>
  );
};

export default DayExpenseList;
