import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/shared/ui/atoms/button';
import ArrowLeft from '@/shared/ui/icons/ArrowLeft';
import ArrowRight from '@/shared/ui/icons/ArrowRight';
import { cn } from '@/shared/ui/styles/utils';

function Calendar({
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className='w-full p-0'
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
        cell: 'w-[14.2857143%] aspect-square first:rounded-l-full last:rounded-r-full',
        day: 'relative size-full flex items-center justify-center font-[15px]',
        day_range_start: cn(
          'relative',
          '!bg-[#89f336] text-[#222] rounded-full',
          "before:content-['']",
          'before:absolute before:inset-0',
          'before:right-[-2px]',
          'before:h-full before:w-[calc(100% + 4px)] before:-z-10',
          'before:bg-[#DAFBC1] before:rounded-l-full'
        ),
        day_range_end: cn(
          'relative',
          '!bg-[#89f336] text-[#222] rounded-full',
          "before:content-['']",
          'before:absolute before:inset-0',
          'before:left-[-2px]',
          'before:h-full before:w-[calc(100% + 4px)] before:-z-10',
          'before:bg-[#DAFBC1] before:rounded-r-full'
        ),
        day_range_middle: cn(
          'bg-[#DAFBC1] text-[#222]',
          "before:content-['']",
          'before:absolute before:inset-y-0',
          'before:-z-10',
          'before:left-[-2px] before:right-[-2px]',
          'before:bg-[#DAFBC1]'
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
