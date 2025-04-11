import React from 'react';
import { useForm } from 'react-hook-form';
import { NumberFormatValues, NumericFormat } from 'react-number-format';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import CategoriesPopover from '@/features/category/ui/CategoriesPopover';
import CategoryTag from '@/features/category/ui/CategoryTag';
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
  expense: Omit<Expense, 'uid'>;
  onSubmit: (expense: Omit<Expense, 'uid'>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onSubmit }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const form = useForm<Omit<Expense, 'uid'>>({
    defaultValues: {
      date: expense.date,
      memo: expense.memo,
      categories: expense.categories,
      amount: expense.amount === 0 ? undefined : expense.amount,
    },
    mode: 'onChange',
  });

  const { handleSubmit, watch } = form;

  const memo = watch('memo');
  const categories = watch('categories');
  const amount = watch('amount');

  const disabled = React.useMemo(() => {
    if (memo.length === 0 || memo.length > 120) {
      return true;
    }

    if (categories.length === 0 || categories.length > 3) {
      return true;
    }

    if (amount === 0 || !amount) {
      return true;
    }

    return false;
  }, [memo, categories, amount]);

  return (
    <Form {...form}>
      {open && (
        <CategoriesPopover
          selectedCategories={categories}
          setSelectedCategories={(values) => {
            form.setValue('categories', values);
          }}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
      <form
        className='flex flex-col gap-6 h-screen pt-6 px-5 pb-20'
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
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
                  type='button'
                  id='categories'
                  aria-label='카테고리 설정 버튼'
                  className='rounded-full bg-[#efefef] hover:bg-accent h-auto text-[13px] text-[#555] ml-auto py-1 px-2'
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  설정
                </Button>
              </div>
              <div className='flex flex-row gap-2 flex-wrap'>
                {field.value.map((category) => (
                  <CategoryTag
                    key={category.uid}
                    size='medium'
                    tagName={category.name}
                  />
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
              <FormLabel className='text-[15px] font-semibold'>금액</FormLabel>
              <FormControl>
                <NumericFormat
                  inputMode='numeric'
                  value={field.value}
                  max={EXPENSE_AMOUNT_MAX}
                  min={1}
                  isAllowed={(values: NumberFormatValues) => {
                    const value = values.floatValue ?? 0;
                    return value > 0 && value <= EXPENSE_AMOUNT_MAX;
                  }}
                  onValueChange={(values: NumberFormatValues) => {
                    const value = values.floatValue ?? 1;
                    field.onChange(value);
                  }}
                  allowNegative={false}
                  thousandSeparator=','
                  suffix='원'
                  placeholder='금액을 입력해주세요.'
                  className={cn(
                    'h-12 w-full p-4 rounded-md border border-[#ccc] text-[15px] text-[#222]',
                    'placeholder:text-[15px] placeholder:text-[#999]',
                    'focus-visible:border-[#555555]'
                  )}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          // origin: mt-auto
          className='h-13 text-[15px] font-semibold mt-auto rounded-full'
          disabled={disabled}
        >
          저장
        </Button>
      </form>
    </Form>
  );
};

export default ExpenseForm;
