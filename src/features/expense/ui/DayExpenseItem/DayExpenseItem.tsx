import { Expense } from '@/features/expense/model/types';

interface DayExpenseItemProps {
  day: Date;
  expenses: Expense;
}

const DayExpenseItem: React.FC = () => {
  return (
    <div>
      <p></p>
      <ul>
        {}
        <Expense />
      </ul>
    </div>
  );
};

export default DayExpenseItem;
