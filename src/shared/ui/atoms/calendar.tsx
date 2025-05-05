import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/shared/ui/atoms/button';
import ArrowLeft from '@/shared/ui/icons/ArrowLeft';
import ArrowRight from '@/shared/ui/icons/ArrowRight';
import { cn } from '@/shared/ui/styles/utils';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('w-full p-0', className)}
      classNames={{
        months: 'flex flex-col gap-2',
        month: 'flex flex-col gap-4',
        caption: 'flex justify-center pt-1 relative items-center w-full',
        caption_label: 'font-[17px] font-medium',
        nav: 'flex items-center gap-1',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full',
        head_row: 'flex mb-[16px]',
        head_cell:
          'text-muted-foreground rounded-md w-[14.2857143%] font-normal text-[0.8rem]',
        row: 'flex w-full mt-[2px] gap-1',
        cell: 'group relative w-[14.2857143%] aspect-square overflow-visible',
        day: 'relative size-full flex items-center justify-center font-[15px]',
        day_range_start: cn(
          'range-start',
          'relative',
          '!bg-[#89f336] text-[#222] rounded-full',
          "before:content-['']",
          'before:absolute before:inset-0',
          'before:right-[-2px]',
          'before:-z-10',
          'before:bg-[#DAFBC1] before:rounded-l-full'
        ),
        day_range_end: cn(
          'range-end',
          'relative',
          '!bg-[#89f336] text-[#222] rounded-full',
          "before:content-['']",
          'before:absolute before:inset-0',
          'before:left-[-2px]',
          'before:-z-10',
          'before:bg-[#DAFBC1] before:rounded-r-full'
        ),
        day_range_middle: cn(
          'bg-[#DAFBC1] text-[#222]',
          "before:content-['']",
          'before:absolute before:inset-y-0',
          'before:-z-10',
          'before:left-[-2px] before:right-[-2px]',
          'before:bg-[#DAFBC1]',
          'group-first:rounded-l-full group-first:before:left-0 group-first:before:rounded-l-full',
          'group-last:rounded-r-full  group-last:before:right-0 group-last:before:rounded-r-full'
        ),
        day_today: 'text-[#28a745]',
        day_disabled: 'text-[#999999]',
        day_hidden: 'invisible',
        day_selected: 'bg-[#89f336] text-[#222] rounded-full',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ArrowLeft size={24} />,
        IconRight: () => <ArrowRight size={24} />,
      }}
      {...props}
    />
  );
}

export { Calendar };
