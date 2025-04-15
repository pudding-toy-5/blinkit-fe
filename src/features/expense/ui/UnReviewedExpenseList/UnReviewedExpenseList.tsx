import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@/shared/ui/styles/utils';

import { useUpdateExpense } from '../../api/useExpenseQuery';
import { ConsumptionKind } from '../../model/types/ConsumptionKind';
import { Expense } from '../../model/types/Expense';
import ClassifyExpenseDrawer from './ClassifyExpenseDrawer';
import UnReviewedExpenseListItem from './UnReviewedExpenseListItem';

interface Props {
  unReviewedExpenses: Expense[];
  totalExpenseLength: number;
  onMoveRetrospective: () => void;
}

const UnReviewedExpenseList: React.FC<Props> = ({
  unReviewedExpenses,
  totalExpenseLength,
  onMoveRetrospective,
}) => {
  const updateExpense = useUpdateExpense();

  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const measureRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    setSelectedExpense(
      unReviewedExpenses.find((expense) => expense.uid === selectedUid) ?? null
    );
  }, [unReviewedExpenses, selectedUid, setSelectedExpense]);

  useLayoutEffect(() => {
    if (measureRef.current) {
      setButtonWidth(measureRef.current.scrollWidth);
    }
  }, []);

  const setConsumptionKind = (consumptionKind: ConsumptionKind) => {
    updateExpense.mutate(
      { ...selectedExpense, consumptionKind },
      {
        onSuccess: () => {
          toast.success(`지출내역을 ${consumptionKind}로 분류했어요.`);
          setSelectedUid(null);
        },
        onError: () => {
          toast.error(`지출내역을 ${consumptionKind}로 분류하지 못했어요.`);
        },
      }
    );
  };

  const onDrawerOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedUid(null);
    }
  };

  return (
    <>
      <ClassifyExpenseDrawer
        isOpen={selectedUid !== null}
        onOpenChange={onDrawerOpenChange}
        setConsumptionKind={setConsumptionKind}
      />
      <div className='relative flex flex-col flex-1 bg-[#f5f3f0] px-5 pt-8'>
        {expenses.length === 0 ? (
          <span className='flex items-center justify-center m-auto text-[15px] text-[#555]'>
            지출 내역을 추가하면 리뷰할 수 있어요.
          </span>
        ) : (
          <>
            <div className='pb-4'>
              <h1 className='text-[19px] text-[#222] font-semibold'>
                리뷰하지 않은 지출 내역
              </h1>
              <span className='pt-1 text-[13px] text-[#555]'>
                지출 내역을 왼쪽으로 밀어서 소비를 분류해보세요.
              </span>
            </div>
            {unReviewedExpenses.length === 0 ? (
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
            ) : (
              <ul className='flex flex-col gap-2 pb-2'>
                {unReviewedExpenses.map((expense) => (
                  <UnReviewedExpenseListItem
                    key={expense.uid}
                    expense={expense}
                    buttonWidth={buttonWidth}
                    onSelectReview={() => {
                      setSelectedUid(expense.uid);
                    }}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UnReviewedExpenseList;
