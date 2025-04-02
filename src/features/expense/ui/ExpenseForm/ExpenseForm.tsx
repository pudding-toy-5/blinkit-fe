import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CategoryTag from '@/features/category/ui/CategoryTag';
import { EXPENSE_MEMO_MAX_LEN } from '@/features/expense/consts';
import { Expense } from '@/features/expense/model/types/Expense';
import CalendarDrawer from '@/features/expense/ui/CalendarDrawer';
import ArrowRight from '@/shared/ui/icons/ArrowRight';
import LabeledTextarea from '@/shared/ui/LabeledTextarea';
import { cn } from '@/shared/ui/styles/utils';

const CalendarDrawerTrigger = ({ date }: { date: Date }) => {
  return (
    <div
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'has-[>svg]:p-0',
        'flex flex-row items-center h-auto w-auto ml-auto p-0'
      )}
    >
      <p className='mr-1 text-[15px] font-normal text-[#28a745]'>
        {date.toLocaleDateString()}
      </p>
      <ArrowRight size={16} color='#28a745' />
    </div>
  );
};

const ExpenseForm: React.FC = () => {
  const form = useForm<Omit<Expense, 'uid'>>({
    defaultValues: {
      date: new Date(),
      categories: [
        { uid: '1', name: '세글자' },
        { uid: '2', name: '열글자열글자열글자열' },
        { uid: '3', name: '스무글자스무글자스무글자스무글자' },
      ],
      memo: '',
      amount: 0,
    },
  });

  return (
    <Form {...form}>
      <form className='flex flex-col gap-6 h-screen pt-6 px-5'>
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center'>
              <Label
                id='date'
                className='text-[15px] font-semibold text-[#222] p-0'
              >
                날짜
              </Label>
              <div className='ml-auto'>
                <CalendarDrawer
                  trigger={<CalendarDrawerTrigger date={field.value} />}
                  date={field.value}
                  setDate={(newDate) => {
                    field.onChange(newDate);
                  }}
                />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='memo'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <LabeledTextarea
                  label='메모'
                  id='memo'
                  placeholder={`어디서, 무엇을 결제하셨나요?\r\n그때 기분은 어땠나요?`}
                  value={field.value}
                  onChange={(e) => {
                    if (e.length <= EXPENSE_MEMO_MAX_LEN) {
                      field.onChange(e);
                    }
                  }}
                  state='default'
                  maxLength={EXPENSE_MEMO_MAX_LEN}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='categories'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-row items-center'>
                <FormLabel className='text-[15px] font-semibold text-[#222]'>
                  카테고리
                </FormLabel>
                <Button
                  variant='ghost'
                  className='h-auto text-[13px] ml-auto py-1 px-2'
                >
                  설정
                </Button>
              </div>
              <div className='flex flex-row gap-2 flex-wrap'>
                {field.value.map((category) => (
                  <CategoryTag key={category.uid} tagName={category.name} />
                ))}
              </div>
            </FormItem>
          )}
        />
        <div className='flex flex-col gap-2'>
          <label>금액</label>
          <div className='relative'>
            <Input
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
    </Form>
  );
};

export default ExpenseForm;
