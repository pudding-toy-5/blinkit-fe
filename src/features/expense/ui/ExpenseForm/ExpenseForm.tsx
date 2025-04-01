import React from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { EXPENSE_MEMO_MAX_LEN } from '@/features/expense/consts';
import { Expense } from '@/features/expense/model/types/Expense';
import ArrowRight from '@/shared/ui/icons/ArrowRight';
import LabeledTextarea from '@/shared/ui/LabeledTextarea';

const ExpenseForm: React.FC = () => {
  const [form, setForm] = React.useState<Omit<Expense, 'uid'>>({
    date: new Date(),
    categories: [],
    memo: '',
    amount: 0,
  });

  return (
    <form className='flex flex-col pt-6 px-4 h-screen'>
      <div className='flex flex-row items-center'>
        <Label id='date' className='text-[15px] font-semibold text-[#222] p-0'>
          날짜
        </Label>
        <div className='flex flex-row ml-auto items-center'>
          <p className='mr-1 text-[15px] text-[#28a745]'>
            {form.date.toLocaleDateString()}
          </p>
          <Button id='date' variant='ghost' className='w-6 h-4 p-0'>
            <ArrowRight size={16} color='#28a745' />
          </Button>
        </div>
      </div>
      <div className='flex flex-row mt-5'>
        <label>카테고리</label>
        <button className='flex flex-row ml-auto'>
          <p className='mr-1'>식비</p>
          <ArrowRight size={16} />
        </button>
      </div>
      <LabeledTextarea
        label='메모'
        id='memo'
        placeholder={`어디서, 무엇을 결제하셨나요?\r\n그때 기분은 어땠나요?`}
        value={form.memo}
        onChange={(e) => {
          if (e.target.value > EXPENSE_MEMO_MAX_LEN) {
            setForm({ ...form, memo: e.target.value });
          }
        }}
        state='default'
        maxLength={EXPENSE_MEMO_MAX_LEN}
      />
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
      <Button
        type='submit'
        className='h-13 text-[15px] font-semibold mt-auto mb-5 rounded-full'
      >
        저장
      </Button>
    </form>
  );
};

export default ExpenseForm;
