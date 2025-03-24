import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AddExpenseButtonProps {
  onClick: () => void;
}

const AddExpenseButton: React.FC<AddExpenseButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant='outline'
      aria-label='지출 추가'
      className='absolute right-[20px] bottom-[32px] w-14 h-14 p-4 rounded-[28px] bg-[#89f336] hover:bg-[#89f336] hover:ring'
      asChild
      role='button'
    >
      <Plus color='#222222' size='24' />
    </Button>
  );
};

export default AddExpenseButton;
