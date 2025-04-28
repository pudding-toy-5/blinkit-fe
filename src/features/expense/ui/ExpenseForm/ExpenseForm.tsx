import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NumberFormatValues, NumericFormat } from 'react-number-format';

import CategoriesPopoverPage from '@/features/category/ui/CategoriesPopoverPage';
import CategoryTag from '@/features/category/ui/CategoryTag';
import {
  EXPENSE_AMOUNT_MAX,
  EXPENSE_MEMO_MAX_LEN,
} from '@/features/expense/consts';
import { getConsumptionTitle } from '@/features/expense/lib/consumption';
import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';
import { Expense } from '@/features/expense/model/Expense';
import CalendarDrawer from '@/features/expense/ui/CalendarDrawer';
import ConsumptionKindDrawer from '@/features/expense/ui/ConsumptionKindDrawer';
import { Button } from '@/shared/ui/atoms/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/atoms/form';
import ArrowRight from '@/shared/ui/icons/ArrowRight';
import LabeledTextarea from '@/shared/ui/LabeledTextarea';
import { cn } from '@/shared/ui/styles/utils';

const CalendarDrawerTrigger = ({ date }: { date: Date }) => {
  return (
    <div className='flex flex-row items-center gap-1 ml-auto'>
      <span className='text-[15px] text-[#28a745]'>
        {`${date.getFullYear().toString()}년 ${(date.getMonth() + 1).toString()}월 ${date.getDate().toString()}일`}
      </span>
      <ArrowRight size={16} color='#28a745' />
    </div>
  );
};

export interface ExpenseFormProps {
  expense: Omit<Expense, 'uid'>;
  onSubmit: (expense: Omit<Expense, 'uid'>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onSubmit }) => {
  const [consumptionKindOpen, setConsumptionKindOpen] =
    useState<boolean>(false);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);

  const form = useForm<Omit<Expense, 'uid'>>({
    defaultValues: {
      date: expense.date,
      memo: expense.memo,
      categories: expense.categories,
      amount: expense.amount === 0 ? undefined : expense.amount,
      consumptionKind: expense.consumptionKind ?? ConsumptionKind.none,
    },
    mode: 'onChange',
  });

  const { handleSubmit, watch } = form;

  const memo = watch('memo');
  const categories = watch('categories');
  const amount = watch('amount');
  const consumptionKind = watch('consumptionKind');

  const disabled = useMemo(() => {
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
  }, [memo, categories.length, amount]);

  return (
    <Form {...form}>
      {categoryOpen && (
        <CategoriesPopoverPage
          selectedCategories={categories}
          setSelectedCategories={(values) => {
            form.setValue('categories', values);
          }}
          onClose={() => {
            setCategoryOpen(false);
          }}
        />
      )}
      <form
        className='flex flex-col gap-6 h-screen pt-6 px-5'
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
                className='text-[15px] font-semibold text-[#222]'
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
                  placeholder={`어디서, 무엇을 결제하셨나요?\r\n그때 기분과 소비 이유도 같이 기록해요.`}
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
            <FormItem className='flex flex-col gap-4'>
              <div className='flex flex-row items-center'>
                <FormLabel
                  htmlFor='categories'
                  className='text-[15px] font-semibold text-[#222]'
                >
                  카테고리
                </FormLabel>
                <button
                  type='button'
                  id='categories'
                  aria-label='카테고리 설정 버튼'
                  className='flex flex-row items-center gap-1 ml-auto'
                  onClick={() => {
                    setCategoryOpen(true);
                  }}
                >
                  <span className='text-[15px] text-[#28a745]'>설정</span>
                  <ArrowRight size={16} color='#28a745' />
                </button>
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
              <FormLabel className='text-[15px] font-semibold text-[#222]'>
                금액
              </FormLabel>
              <FormControl>
                <NumericFormat
                  inputMode='numeric'
                  value={field.value}
                  max={EXPENSE_AMOUNT_MAX}
                  min={1}
                  isAllowed={(values: NumberFormatValues) => {
                    if (values.value === '') {
                      return true;
                    }
                    const value = values.floatValue ?? 0;
                    return value > 0 && value <= EXPENSE_AMOUNT_MAX;
                  }}
                  onValueChange={(values: NumberFormatValues) => {
                    field.onChange(values.floatValue ?? '');
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
        <FormField
          control={form.control}
          name='consumptionKind'
          render={({ field }) => (
            <FormItem className='flex flex-row'>
              <FormLabel className='text-[15px] font-semibold text-[#222]'>
                소비 분류
              </FormLabel>
              <FormControl>
                <button
                  type='button'
                  className='flex flex-row items-center gap-1 ml-auto'
                  onClick={() => {
                    setConsumptionKindOpen(true);
                  }}
                >
                  <span className='text-[15px] text-[#28a745]'>
                    {consumptionKind === ConsumptionKind.none ||
                    consumptionKind === undefined
                      ? '소비를 리뷰하세요'
                      : getConsumptionTitle(consumptionKind)}
                  </span>
                  <ArrowRight size={16} color='#28a745' />
                </button>
              </FormControl>
              <ConsumptionKindDrawer
                isOpen={consumptionKindOpen}
                onClose={() => {
                  setConsumptionKindOpen(false);
                }}
                setConsumptionKind={(kind) => {
                  field.onChange(kind);
                }}
              />
            </FormItem>
          )}
        />
        <div className='fixed bottom-0 left-0 right-0 w-full min-w-[360px] max-w-[430px] mx-auto px-5 py-4 bg-white border-t border-gray-100'>
          <Button
            type='submit'
            className='w-full h-13 text-[15px] font-semibold mt-auto rounded-full'
            disabled={disabled}
          >
            저장
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ExpenseForm;
