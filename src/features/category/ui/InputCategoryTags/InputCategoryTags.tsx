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
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder: string;
};

const InputCategoryTags = React.forwardRef<
  HTMLInputElement,
  InputCategoryTagProps
>(({ className, value, onChange, placeholder, ...props }, ref) => {
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
        'has-[:focus-visible]:outline-none has-[:focus-visible]:ring has-[:focus-visible]:ring-[#555] has-[:focus-visible]:ring-offset-2',
        'min-h-12 flex flex-row w-full',
        'rounded-md border border-[#ccc] bg-white px-4 py-3 text-sm ring-offset-white',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      {/* todo: fix min-w */}
      <div className={cn('flex flex-row flex-wrap gap-2 mr-5', 'min-w-[70%]')}>
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
          className='flex-1 outline-none placeholder:text-[#999] placeholder:text-[15px]'
          aria-label='카테고리 추가 입력'
          value={pendingDataPoint}
          placeholder={placeholder}
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
        className='h-full p-0 ml-auto disabled:text-[#999] text-[#28A745] hover:text-[#28A745]'
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
