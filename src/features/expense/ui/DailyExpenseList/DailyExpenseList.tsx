import { DailyExpense } from '@/features/expense/model/types/Expense';

import DailyExpenseItem from '@/features/expense/ui/DailyExpenseListItem';

export interface DailyExpenseListProps {
  dailyExpenses: DailyExpense[];
}

const DailyExpenseList: React.FC<DailyExpenseListProps> = ({
  dailyExpenses,
}) => {
  return (
    <ul
      className='flex flex-1 flex-col h-full list-none overflow-y-auto scroll justify-start pr-4 pl-5 py-6 mr-[2px]'
      aria-label='daily-expense-list'
    >
      {dailyExpenses.length === 0 ? (
        <p>지출 내역을 추가해주세요.</p>
      ) : (
        dailyExpenses.map(({ date, expenses }) => (
          <DailyExpenseItem
            key={date.toISOString()}
            date={date}
            expenses={expenses}
          />
        ))
      )}
    </ul>
  );
};

export default DailyExpenseList;
