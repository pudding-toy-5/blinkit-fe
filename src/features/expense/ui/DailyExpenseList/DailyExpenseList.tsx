import { DailyExpense } from '@/features/expense/model/Expense';
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
        'flex flex-1 flex-col gap-6 scroll list-none overflow-y-auto justify-start py-6 px-5 bg-[#F5F3F0]'
      )}
      onScroll={onScroll}
      aria-label='daily-expense-list'
    >
      {dailyExpenses.length === 0 ? (
        <span className='mx-auto my-auto text-[15px] text-[#555555]'>
          지출 내역을 추가해주세요.
        </span>
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
