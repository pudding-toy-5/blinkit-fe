import { Link, useNavigate } from '@tanstack/react-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import { toast } from 'sonner';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import CategoryTag from '@/features/category/ui/CategoryTag';
import {
  useAddExpense,
  useNewExpense,
  useUpdateExpense,
} from '@/features/expense/api/useExpenseQuery';
import {
  EXPENSE_AMOUNT_MAX,
  EXPENSE_MEMO_MAX_LEN,
} from '@/features/expense/consts';
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

export interface ExpenseFormProps {
  uid?: string;
  expense: Omit<Expense, 'uid'>;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ uid, expense }) => {
  const navigate = useNavigate();
  const updateExpense = useUpdateExpense();
  const addExpense = useAddExpense();
  const {
    updateNewExpense,
    updateNewExpenseDate,
    updateNewExpenseMemo,
    updateNewExpenseAmount,
  } = useNewExpense();

  React.useEffect(() => {
    updateNewExpense(expense);
  }, [expense, updateNewExpense]);

  const form = useForm<Omit<Expense, 'uid'>>({
    defaultValues: { ...expense },
  });

  React.useEffect(() => {
    form.setValue('date', expense.date);
    form.setValue('memo', expense.memo);
    form.setValue('categories', expense.categories);
    form.setValue('amount', expense.amount);
  }, [form, expense]);

  const handleOnSubmit = (values: Omit<Expense, 'uid'>) => {
    if (uid) {
      updateExpense.mutate({ uid: uid, ...values });
    } else {
      addExpense.mutate({ ...values });
      updateNewExpense({
        date: new Date(),
        memo: '',
        amount: 0,
        categories: [],
      });
    }

    void navigate({ to: '/expenses' });
  };

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-6 h-screen pt-6 px-5'
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(handleOnSubmit)}
      >
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-row'>
              <FormLabel
                htmlFor='date'
                className='text-[15px] font-semibold text-[#222] p-0'
              >
                날짜
              </FormLabel>
              <div className='ml-auto items-center'>
                <FormControl>
                  <CalendarDrawer
                    id='date'
                    trigger={<CalendarDrawerTrigger date={field.value} />}
                    date={field.value}
                    setDate={(newDate) => {
                      if (newDate === undefined) {
                        return;
                      }

                      field.onChange(newDate);
                    }}
                    {...field}
                  />
                </FormControl>
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
                      if (!uid) {
                        updateNewExpenseMemo(e);
                      }
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
                <FormLabel
                  htmlFor='categories'
                  className='text-[15px] font-semibold text-[#222]'
                >
                  카테고리
                </FormLabel>
                <Button
                  id='categories'
                  aria-label='카테고리 설정 버튼'
                  className='rounded-full bg-[#efefef] hover:bg-accent h-auto text-[13px] text-[#555] ml-auto py-1 px-2'
                  asChild
                >
                  <Link
                    to={
                      uid
                        ? '/expenses/$uid/categories'
                        : '/expenses/new/categories'
                    }
                    params={{ uid }}
                  >
                    설정
                  </Link>
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
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-2'>
              <FormLabel>금액</FormLabel>
              <FormControl>
                <NumericFormat
                  inputMode='numeric'
                  value={field.value}
                  max={EXPENSE_AMOUNT_MAX - 1}
                  min={0}
                  onValueChange={(values: NumberFormatValues) => {
                    const value = values.floatValue;
                    if (value === undefined) {
                      return;
                    }
                    field.onChange(values.value);
                  }}
                  allowNegative={false}
                  thousandSeparator=','
                  suffix='원'
                  placeholder='금액을 입력해주세요.'
                  className='h-12 w-full p-4 rounded-md border border-black/10 text-[15px] text-[#222]'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='h-13 text-[15px] font-semibold mt-auto mb-5 rounded-full'
        >
          {uid ? '저장' : '추가'}
        </Button>
      </form>
    </Form>
  );
};

export default ExpenseForm;
