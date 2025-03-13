import { Expense } from '@/features/expense/model/types';

interface DayExpenseProps {
  day: Date;
  expenses: Expense;
}

const DayExpense: React.FC = () => {
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

export default ExpenseList;
