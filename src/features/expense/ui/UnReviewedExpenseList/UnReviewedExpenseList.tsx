import React, { useLayoutEffect, useRef, useState } from 'react';

import { Expense } from '../../model/types/Expense';
import ClassifyExpenseDrawer from './ClassifyExpenseDrawer';
import UnReviewedExpenseListItem from './UnReviewedExpenseListItem';

interface Props {
  expenses: Expense[];
}

const UnReviewedExpenseList: React.FC<Props> = ({ expenses }) => {
  const measureRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useLayoutEffect(() => {
    if (measureRef.current) {
      setButtonWidth(measureRef.current.scrollWidth);
    }
  }, []);

  const onClick = (uid: string) => {
    console.log(uid);
  };

  return (
    <>
      <ClassifyExpenseDrawer
        isOpen={selectedUid !== null}
        onReviewExpense={onReviewExpense}
        onOpenChange={onDrawerOpenChange}
      />
      <div className='flex flex-col flex-1 bg-[#f5f3f0] px-5 pt-8'>
        <div className='pb-4'>
          <h1 className='text-[19px] text-[#222] font-semibold'>
            리뷰하지 않은 지출 내역
          </h1>
          <span className='pt-1 text-[13px] text-[#555]'>
            지출 내역을 왼쪽으로 밀어서 소비를 분류해보세요.
          </span>
        </div>
        <ul className='flex flex-col gap-2'>
          {expenses.map((expense) => (
            <UnReviewedExpenseListItem
              key={expense.uid}
              expense={expense}
              buttonWidth={buttonWidth}
              onClickReview={() => {
                setSelectedUid(expense.uid);
              }}
            />
          ))}
        </ul>
        {/* 보이지 않는 측정용 버튼 */}
        <button
          ref={measureRef}
          className='absolute -z-10 invisible whitespace-nowrap px-6 font-semibold text-[14px]'
        >
          리뷰하기
        </button>
      </div>
    </>
  );
};

export default UnReviewedExpenseList;
