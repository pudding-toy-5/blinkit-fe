import { DailyExpense } from '@/features/expense/model/types/Expense';
import DailyExpenseItem from '@/features/expense/ui/DailyExpenseListItem';
import { cn } from '@/shared/ui/styles/utils';

export interface DailyExpenseListProps {
  dailyExpenses: DailyExpense[];
  onScroll: (e: React.UIEvent<HTMLUListElement>) => void;
}

const DailyExpenseList: React.FC<DailyExpenseListProps> = ({
  dailyExpenses,
  onScroll,
}) => {
  return (
    <ul
      className={cn(
        'flex flex-1 flex-col gap-6 scroll list-none overflow-y-auto justify-start py-6 pl-5 pr-4 bg-[#F5F3F0]'
      )}
      onScroll={onScroll}
      aria-label='daily-expense-list'
    >
      {dailyExpenses.length === 0 ? (
        <p className='mx-auto my-auto'>지출 내역을 추가해주세요.</p>
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
