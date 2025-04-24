import { Expense } from '@/features/expense/model/Expense';
import ReviewExpenseCard from '@/features/expense/ui/ReviewExpenseCard';

const RetrospectiveCardList: React.FC<{ expenses: Expense[] }> = ({
  expenses,
}) => {
  return (
    <div className='pl-5 pr-4 mt-4 pb-8 overflow-y-auto scroll'>
      <ul className='flex flex-col gap-2'>
        {expenses.map((expense) => (
          <ReviewExpenseCard key={expense.uid} expense={expense} />
        ))}
      </ul>
    </div>
  );
};

export default RetrospectiveCardList;
