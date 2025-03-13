import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const AddExpenseButton: React.FC = () => {
  return (
    <Button>
      <Plus></Plus>
    </Button>
  );
};

export default AddExpenseButton;
