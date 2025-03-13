const ExpenseItem: React.FC = () => {
  return (
    <li>
      <div className='flex flex-row p-4'>
        <div className='px-6px py-2'>tag</div>
        <p>Amount</p>
      </div>
      <div>description</div>
    </li>
  );
};

export default ExpenseItem;
