interface ExpenseAmountProps {
  amount: number;
}

const ExpenseAmount: React.FC<ExpenseAmountProps> = ({ amount }) => {
  return <p aria-label='지출 금액'>{amount.toLocaleString()}원</p>;
};

export default ExpenseAmount;
