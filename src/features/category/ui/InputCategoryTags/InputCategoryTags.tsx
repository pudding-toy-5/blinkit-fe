// https://github.com/shadcn-ui/ui/issues/3647

'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { type InputProps } from '@/components/ui/input';
import CategoryTag from '@/features/category/ui/CategoryTag';
import { cn } from '@/shared/ui/styles/utils';

export type InputCategoryTagProps = Omit<
  InputProps,
  'value' | 'onChange' | 'placeholder'
> & {
  value: string[];
  onChange: (newValue: string[]) => void;
  placeholder: string;
};

const InputCategoryTags = React.forwardRef<
  HTMLInputElement,
  InputCategoryTagProps
>(({ className, value, onChange, placeholder, ...props }, ref) => {
  if (value.length > 3) {
    throw new Error('InputCategoryTags > value > has more than three items');
  }

  const [pendingDataPoint, setPendingDataPoint] = React.useState<string>('');

  const addPendingDataPoint = () => {
    if (pendingDataPoint) {
      const newDataPoints = new Set([...value, pendingDataPoint]);
      onChange(Array.from(newDataPoints));
      setPendingDataPoint('');
    }
  };

  return (
    <div
      className={cn(
        // caveat: :has() variant requires tailwind v3.4 or above: https://tailwindcss.com/blog/tailwindcss-v3-4#new-has-variant
        'has-[:focus-visible]:border-[#555]',
        'min-h-12 flex flex-row w-full',
        'flex flex-row items-center rounded-md border border-[#ccc] bg-white px-4 py-3 text-sm ring-offset-white',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      <div className={cn('flex flex-row flex-1 flex-wrap gap-[8px] mr-5')}>
        {value.map((item) => (
          <CategoryTag
            key={item}
            size='small'
            tagName={item}
            onDelete={() => {
              onChange(value.filter((i) => i !== item));
            }}
          />
        ))}
        <input
          className='outline-none placeholder:text-[#999] placeholder:text-[15px]'
          aria-label='카테고리 추가 입력'
          value={pendingDataPoint}
          placeholder={value.length === 0 ? placeholder : undefined}
          disabled={value.length >= 3}
          onChange={(e) => {
            setPendingDataPoint(e.target.value);
          }}
          {...props}
          ref={ref}
        />
      </div>
      <Button
        variant='ghost'
        className='h-full p-0 disabled:text-[#999] text-[#28A745] hover:text-[#28A745] text-[15px]'
        aria-label='카테고리 태그 추가 버튼'
        disabled={pendingDataPoint.length === 0}
        onClick={() => {
          if (pendingDataPoint.length > 0) {
            addPendingDataPoint();
          }
        }}
      >
        추가
      </Button>
    </div>
  );
});

InputCategoryTags.displayName = 'InputCategoryTags';

export default InputCategoryTags;
