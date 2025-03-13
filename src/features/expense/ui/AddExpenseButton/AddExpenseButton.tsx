import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddExpenseButtonProps {
  onClick: () => void;
}

const AddExpenseButton: React.FC<AddExpenseButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} aria-label='지출 추가'>
      <Plus />
    </Button>
  );
};

export default AddExpenseButton;
