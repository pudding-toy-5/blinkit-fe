import { animated, type AnimatedProps, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { format } from 'date-fns';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import CategoryTag from '@/features/category/ui/CategoryTag';
import { Expense } from '@/features/expense/model/types/Expense';
import { cn } from '@/shared/ui/styles/utils';

const AnimatedDiv = animated.div as React.FC<
  AnimatedProps<React.HTMLAttributes<HTMLDivElement>> & {
    children?: React.ReactNode;
  }
>;

export const AnimatedButton = animated.button as React.FC<
  React.PropsWithChildren<
    AnimatedProps<React.ButtonHTMLAttributes<HTMLButtonElement>>
  >
>;

interface Props {
  expense: Expense;
  buttonWidth: number;
  onSelectReview: () => void;
}

const UnReviewedExpenseListItem: React.FC<Props> = ({
  expense,
  buttonWidth,
  onSelectReview,
}) => {
  const liRef = useRef<HTMLLIElement>(null);
  const [liWidth, setLiWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [{ deleteWidth }, api] = useSpring(() => ({
    deleteWidth: 0,
    config: { tension: 300, friction: 30 },
  }));

  useLayoutEffect(() => {
    if (liRef.current) {
      setLiWidth(liRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    void api.start({ deleteWidth: isOpen ? buttonWidth : 0 });
  }, [buttonWidth, isOpen, api]);

  const bind = useDrag(
    ({ movement: [mx], first, last }) => {
      if (!liWidth || !buttonWidth) {
        return;
      }

      if (first) {
        void api.start({ deleteWidth: deleteWidth.get(), immediate: true });
      }

      const raw = deleteWidth.get() - mx;
      const next = Math.max(0, Math.min(raw, buttonWidth));

      if (last) {
        const open = next > buttonWidth / 2;
        setIsOpen(open);
        void api.start({ deleteWidth: open ? buttonWidth : 0 });
      } else {
        void api.start({ deleteWidth: next, immediate: true });
      }
    },
    { axis: 'x', rubberband: true, filterTaps: true }
  );

  return (
    <li
      ref={liRef}
      className='flex w-full overflow-x-hidden touch-pan-y select-none'
    >
      <AnimatedDiv
        {...bind()}
        className='flex'
        style={{
          width: liWidth
            ? `calc(${liWidth.toString()}px + ${buttonWidth.toString()}px + 8px)`
            : undefined,
          transform: deleteWidth.to((w) => `translateX(-${w.toString()}px)`),
          willChange: 'transform',
        }}
      >
        <div style={{ width: `${liWidth.toString()}px`, flexShrink: 0 }}>
          <div className='flex flex-col w-full p-4 rounded-[8px] bg-white'>
            <span aria-label='지출 날짜' className='text-[13px] text-[#999]'>
              {format(expense.date, 'yyyy. M. d.')}
            </span>
            <span
              aria-label='지출 금액'
              className='text-[17px] font-semibold mt-1.5'
            >
              {expense.amount.toLocaleString()}원
            </span>
            <span
              aria-label='메모'
              className='text-[15px] text-[#555] leading-[150%] mt-2'
            >
              {expense.memo}
            </span>
            <div className='flex flex-row flex-wrap gap-x-1 gap-y-1.5 mt-6 w-full'>
              {expense.categories.map((cat) => (
                <CategoryTag key={cat.uid} tagName={cat.name} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: '8px', flexShrink: 0 }} />

        <div style={{ width: `${buttonWidth.toString()}px`, flexShrink: 0 }}>
          <AnimatedButton
            onClick={onSelectReview}
            style={{
              width: '100%',
              opacity: deleteWidth.to((w) => (w < 2 ? 0 : 1)),
              pointerEvents: deleteWidth.to((w) => (w < 2 ? 'none' : 'auto')),
            }}
            className={cn(
              'h-full flex items-center justify-center',
              'bg-white text-[#28A745] font-semibold text-[14px]',
              'rounded-[8px] cursor-pointer whitespace-nowrap overflow-hidden'
            )}
          >
            리뷰하기
          </AnimatedButton>
        </div>
      </AnimatedDiv>
    </li>
  );
};

export default UnReviewedExpenseListItem;
