import React, { useLayoutEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import {
  useExpenseCountByRange,
  useExpensesByRange,
  useUpdateExpense,
} from '@/features/expense/api/useExpenseQuery';
import { getConsumptionTitle } from '@/features/expense/lib/consumption';
import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';
import { Expense } from '@/features/expense/model/Expense';
import ConsumptionKindDrawer from '@/features/expense/ui/ConsumptionKindDrawer';
import UnReviewedExpenseList from '@/features/expense/ui/UnReviewedExpenseList';
import useDateRange from '@/shared/lib/useDateRange';
import { cn } from '@/shared/ui/styles/utils';

const TotalExpenseEmptyPlaceholder: React.FC = () => {
  return (
    <span className='flex-1 flex items-center justify-center m-auto text-[15px] text-[#555]'>
      지출 내역을 추가하면 리뷰할 수 있어요.
    </span>
  );
};

const UnReviewedExpenseHeader: React.FC = () => {
  return (
    <div className='pb-4 px-5'>
      <h1 className='text-[19px] text-[#222] font-semibold'>
        리뷰하지 않은 지출 내역
      </h1>
      <span className='pt-1 text-[13px] text-[#555] font-medium'>
        지출 내역을 왼쪽으로 밀어서 소비를 분류해보세요.
      </span>
    </div>
  );
};

const UnReviewedExpenseEmptyPlaceholder: React.FC<{
  onMoveRetrospective: () => void;
}> = ({ onMoveRetrospective }) => {
  return (
    <div className='flex-1 flex flex-col items-center justify-center text-center'>
      <span className='text-[15px] text-[#555] leading-[150%]'>
        리뷰할 지출 내역이 없어요.
        <br />
        회고 탭으로 이동해 결과를 확인해주세요.
      </span>
      <button
        className={cn(
          'bg-white',
          'border-[1px] border-[#ccc] rounded-full',
          'px-3 py-2 mt-4',
          'text-[13px] text-[#555]'
        )}
        onClick={onMoveRetrospective}
      >
        회고 탭으로 이동하기
      </button>
    </div>
  );
};

export interface Props {
  onMoveRetrospective: () => void;
}

const UnReviewedExpenseView: React.FC<Props> = ({ onMoveRetrospective }) => {
  const updateExpense = useUpdateExpense();

  const {
    dateRange: { start, end },
  } = useDateRange();

  const { data: totalExpenseCount = 0 } = useExpenseCountByRange({
    start,
    end,
  });

  const { data: unReviewedExpenses = [] } = useExpensesByRange({
    start,
    end,
    consumptionKind: ConsumptionKind.none,
  });

  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const measureRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useLayoutEffect(() => {
    if (measureRef.current) {
      setButtonWidth(measureRef.current.scrollWidth);
    }
  }, []);

  const handleSelectExpense = (expense: Expense) => {
    setSelectedExpense(expense);
  };

  const setConsumptionKind = (consumptionKind: ConsumptionKind) => {
    if (!selectedExpense || consumptionKind === ConsumptionKind.none) {
      return;
    }

    const title = getConsumptionTitle(consumptionKind);

    updateExpense.mutate(
      { ...selectedExpense, consumptionKind },
      {
        onSuccess: () => {
          toast.success(`${title}로 분류가 완료되었어요.`);
          setSelectedExpense(null);
        },
        onError: () => {
          toast.error(`${title}로 분류하지 못했어요.`);
        },
      }
    );
  };

  return (
    <>
      <ConsumptionKindDrawer
        isOpen={selectedExpense !== null}
        onClose={() => {
          setSelectedExpense(null);
        }}
        setConsumptionKind={setConsumptionKind}
      />
      <div className='flex flex-col flex-1 bg-[#f5f3f0] pt-8 overflow-y-auto scroll'>
        {totalExpenseCount === 0 ? (
          <TotalExpenseEmptyPlaceholder />
        ) : (
          <>
            <UnReviewedExpenseHeader />
            {unReviewedExpenses.length === 0 ? (
              <UnReviewedExpenseEmptyPlaceholder
                onMoveRetrospective={onMoveRetrospective}
              />
            ) : (
              <UnReviewedExpenseList
                expenses={unReviewedExpenses}
                buttonWidth={buttonWidth}
                onSelectExpense={handleSelectExpense}
              />
            )}
          </>
        )}
        {/* 보이지 않는 스와이프 버튼 가로길이 측정용 버튼 */}
        <button
          ref={measureRef}
          className={cn(
            'absolute -z-10 invisible',
            'flex items-center justify-center px-6',
            'bg-white text-[#28A745] font-semibold text-[14px]',
            'rounded-[8px] whitespace-nowrap'
          )}
        >
          리뷰하기
        </button>
      </div>
    </>
  );
};

export default UnReviewedExpenseView;
