import Plus from '@/shared/ui/icons/Plus';

const AddExpenseButton: React.FC = () => {
  return (
    <div
      aria-label='지출 추가'
      // origin- bottom-8
      className='absolute right-[20px] bottom-20 w-14 h-14 p-4 rounded-[28px] bg-[#89f336] hover:ring'
      role='button'
    >
      <Plus size={24} />
    </div>
  );
};

export default AddExpenseButton;
