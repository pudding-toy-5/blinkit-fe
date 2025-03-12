import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useExpenseStore } from '@/features/expense/model/expenseStore';

const MonthSelector = () => {
  const month = useExpenseStore((state) => state.month);

  return (
    <div className='flex flex-row' aria-label='조회 월 선택'>
      <Button variant='ghost' size='icon' aria-label='이전 월로 이동'>
        <ChevronLeft />
      </Button>
      <Button variant='link'>{month}월</Button>
      <Button variant='ghost' size='icon' aria-label='다음 월로 이동'>
        <ChevronRight />
      </Button>
    </div>
  );
};

export default MonthSelector;
