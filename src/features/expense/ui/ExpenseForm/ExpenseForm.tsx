import React, { ChangeEvent } from 'react';

import ArrowRight from '@/shared/ui/icons/ArrowRight';

import { EXPENSE_MEMO_MAX_LEN } from '../../consts';

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
          <ArrowRight size={16} />
        </button>
      </div>
      <div className='flex flex-row mt-5'>
        <label>카테고리</label>
        <button className='flex flex-row ml-auto'>
          <p className='mr-1'>식비</p>
          <ArrowRight size={16} />
        </button>
      </div>
      <div className='flex flex-col mt-5'>
        <label>메모</label>
        <textarea
          value={memo}
          onChange={handleMemoChange}
          className='my-2 h-38 bg-20 rounded-md border border-black/10 text-left p-1 leading-normal resize-none'
        />
        <p className='ml-auto'>
          {memo.length}/{EXPENSE_MEMO_MAX_LEN}
        </p>
      </div>
      <div className='flex flex-col mt-5'>
        <label>금액</label>
        <div className='relative mt-2'>
          <input
            type='number'
            className='w-full h-11 auto border-box px-3 pl-2 pr-12 rounded-md border-1 border-black/10 text-right'
          />
          <span className='absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-700'>
            원
          </span>
        </div>
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
