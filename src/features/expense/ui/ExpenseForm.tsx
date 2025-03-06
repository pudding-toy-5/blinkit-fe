import React, { ChangeEvent } from 'react';

import RightArrowIcon from '@/shared/ui/RightArrowIcon';

import { EXPENSE_MEMO_MAX_LEN } from '../config';

const ExpenseForm: React.FC = () => {
  const [memo, setMemo] = React.useState<string>('');

  const handleMemoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length > EXPENSE_MEMO_MAX_LEN) {
      return;
    }

    setMemo(value);
  };

  return (
    <form className='flex flex-col mx-4 mt-4 h-screen text-sm'>
      <div className='flex flex-row'>
        <label>날짜</label>
        <button className='flex flex-row ml-auto'>
          <p className='mr-1'>2025년 2월 28일</p>
          <RightArrowIcon />
        </button>
      </div>
      <div className='flex flex-row mt-5'>
        <label>카테고리</label>
        <button className='flex flex-row ml-auto'>
          <p className='mr-1'>식비</p>
          <RightArrowIcon />
        </button>
      </div>
      <div className='flex flex-col mt-5'>
        <label>메모</label>
        <textarea
          value={memo}
          onChange={handleMemoChange}
          className='my-2 h-38 bg-20 rounded-md border-1 border-black/10 text-left p-1 leading-normal resize-none'
        />
        <p className='ml-auto'>
          {memo.length}/{EXPENSE_MEMO_MAX_LEN}
        </p>
      </div>
      <div className='flex flex-col mt-5'>
        <label>금액</label>
        <input
          type='number'
          className='h-11 border-box p-3 rounded-md border-1 border-black/10'
        />
      </div>
      <button
        type='submit'
        className='mt-auto mb-5 px-3 py-2 bg-black text-white rounded-lg'
      >
        저장
      </button>
    </form>
  );
};

export default ExpenseForm;
