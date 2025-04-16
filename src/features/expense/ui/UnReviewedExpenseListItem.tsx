import { animated, type AnimatedProps, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Expense } from '@/features/expense/model/types/Expense';
import ReviewExpenseCard from '@/features/expense/ui/ReviewExpenseCard';
import { cn } from '@/shared/ui/styles/utils';

const GAP = 8;

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
    void api.start({ deleteWidth: isOpen ? buttonWidth + GAP : 0 });
  }, [buttonWidth, isOpen, api]);

  const bind = useDrag(
    ({ movement: [mx], first, last }) => {
      if (!liWidth || !buttonWidth) {
        return;
      }

      const fullOpenWidth = buttonWidth + GAP;

      if (first) {
        void api.start({ deleteWidth: deleteWidth.get(), immediate: true });
      }

      const raw = deleteWidth.get() - mx;
      const next = Math.max(0, Math.min(raw, fullOpenWidth));

      if (last) {
        const open = next > fullOpenWidth / 2;
        setIsOpen(open);
        void api.start({ deleteWidth: open ? fullOpenWidth : 0 });
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
            ? `calc(${liWidth.toString()}px + ${buttonWidth.toString()}px + ${GAP.toString()}px)`
            : undefined,
          transform: deleteWidth.to((w) => `translateX(-${w.toString()}px)`),
          willChange: 'transform',
        }}
      >
        <div style={{ width: `${liWidth.toString()}px`, flexShrink: 0 }}>
          <ReviewExpenseCard expense={expense} />
        </div>

        <div style={{ width: `${GAP.toString()}px`, flexShrink: 0 }} />

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
