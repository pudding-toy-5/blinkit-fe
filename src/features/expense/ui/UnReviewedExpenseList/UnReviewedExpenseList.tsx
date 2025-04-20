import { Expense } from '@/features/expense/model/types/Expense';

import UnReviewedExpenseListItem from '../UnReviewedExpenseListItem';

export interface Props {
  expenses: Expense[];
  buttonWidth: number;
  onSelectExpense: (expense: Expense) => void;
}

const UnReviewedExpenseList: React.FC<Props> = ({
  expenses,
  buttonWidth,
  onSelectExpense,
}) => {
  return (
    <ul className='flex-1 flex flex-col gap-2 pb-2 pr-5'>
      {expenses.map((expense) => (
        <UnReviewedExpenseListItem
          key={expense.uid}
          expense={expense}
          buttonWidth={buttonWidth}
          onSelectReview={() => {
            onSelectExpense(expense);
          }}
        />
      ))}
    </ul>
  );
};

export default UnReviewedExpenseList;
