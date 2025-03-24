import { Plus } from 'lucide-react';

interface AddExpenseButtonProps {
  onClick: () => void;
}

const AddExpenseButton: React.FC<AddExpenseButtonProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      aria-label='지출 추가'
      className='absolute right-[20px] bottom-[32px] w-14 h-14 p-4 rounded-[28px] bg-[#89f336] hover:ring'
      role='button'
    >
      <Plus color='#222222' size='24' />
    </div>
  );
};

export default AddExpenseButton;
