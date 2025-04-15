import { format } from 'date-fns';
import { useLayoutEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import CategoryTag from '@/features/category/ui/CategoryTag';
import { Expense } from '@/features/expense/model/types/Expense';
import ArrowLeft from '@/shared/ui/icons/ArrowLeft';
import { cn } from '@/shared/ui/styles/utils';

const ReviewExpenseCard: React.FC<{ expense: Expense }> = ({ expense }) => {
  const memoRef = useRef<HTMLSpanElement>(null);
  const [isMemoOverflowing, setIsMemoOverflowing] = useState<boolean>(false);
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    const element = memoRef.current;
    if (element) {
      setIsMemoOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [memoRef]);

  return (
    <div className='flex flex-col w-full p-4 rounded-[8px] bg-white'>
      <span aria-label='지출 날짜' className='text-[13px] text-[#999]'>
        {format(expense.date, 'yyyy. M. d.')}
      </span>
      <span aria-label='지출 금액' className='text-[17px] font-semibold mt-1.5'>
        {expense.amount.toLocaleString()}원
      </span>
      <div className='flex flex-col'>
        <span
          ref={memoRef}
          aria-label='메모'
          className={cn(
            'text-[15px] text-[#555] leading-[150%] mt-2',
            !isMemoOpen && 'line-clamp-1'
          )}
        >
          {expense.memo}
        </span>
        {isMemoOverflowing && (
          <Button
            variant='ghost'
            className='flex flex-row text-[13px] text-[#555] p-0 justify-start'
            onClick={() => {
              setIsMemoOpen(!isMemoOpen);
            }}
          >
            더보기
            <div
              className={cn(isMemoOpen ? 'rotate-[90deg]' : 'rotate-[-90deg]')}
            >
              <ArrowLeft size={16} color='#555' />
            </div>
          </Button>
        )}
      </div>
      <div className='flex flex-row flex-wrap gap-x-1 gap-y-1.5 mt-6 w-full'>
        {expense.categories.map((cat) => (
          <CategoryTag key={cat.uid} tagName={cat.name} />
        ))}
      </div>
    </div>
  );
};

export default ReviewExpenseCard;
