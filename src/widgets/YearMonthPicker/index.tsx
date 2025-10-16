import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/shared/ui/atoms/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/atoms/drawer';
import ArrowLeftFilled from '@/shared/ui/icons/ArrowLeftFilled';
import ArrowRightFilled from '@/shared/ui/icons/ArrowRightFilled';
import X from '@/shared/ui/icons/X';

import YearMonthList from './YearMonthList';

export interface YearMonthPickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

const YearMonthPicker: React.FC<YearMonthPickerProps> = ({
  value,
  onChange,
}) => {
  const current = useMemo(() => new Date(), []);
  const maxDate = useMemo(
    () =>
      new Date(current.getFullYear(), current.getMonth(), current.getDate()),
    [current]
  );
  const minDate = useMemo(
    () =>
      new Date(
        current.getFullYear() - 5,
        current.getMonth() + 1,
        current.getDate()
      ),
    [current]
  );

  const [isCurrentYear, setIsCurrentYear] = useState<boolean>(false);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState<boolean>(false);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsCurrentYear(value.getFullYear() === current.getFullYear());

    setIsPreviousDisabled(
      value.getFullYear() <= minDate.getFullYear() &&
        value.getMonth() <= minDate.getMonth()
    );

    setIsNextDisabled(
      value.getFullYear() >= maxDate.getFullYear() &&
        value.getMonth() >= maxDate.getMonth()
    );
  }, [value, current, minDate, maxDate]);

  const handleClickPrevious = () => {
    const previous = new Date(value.getFullYear(), value.getMonth() - 1, 1);

    onChange(previous);
  };

  const handleClickNext = () => {
    const next = new Date(value.getFullYear(), value.getMonth() + 1, 1);

    onChange(next);
  };

  return (
    <div className='flex flex-row items-center' aria-label='조회 월 선택'>
      <Button
        variant='ghost'
        size='icon'
        aria-label='이전 월로 이동'
        onClick={handleClickPrevious}
        disabled={isPreviousDisabled}
        className='size-4 mr-2'
      >
        <ArrowLeftFilled size={16} color='#222' />
      </Button>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant='ghost'
            className='h-auto p-0 text-[15px] min-w-[22px] rounded-none text-decoration-line: underline decoration-solid decoration-auto underline-offset-auto tabular-nums'
            style={{ textUnderlinePosition: 'from-font' }}
          >
            {!isCurrentYear && `${value.getFullYear().toString()}년` + ' '}
            {value.getMonth() + 1}월
          </Button>
        </DrawerTrigger>
        <DrawerContent
          className='py-6 px-5'
          style={{ borderRadius: '20px 20px 0 0 ' }}
          aria-label='조회 월 선택 드로어'
        >
          <DrawerHeader className='flex flex-row items-center justify-between p-0'>
            <div className='flex-1' />
            <DrawerTitle className='font-[17px]'>조회 월 선택</DrawerTitle>
            <DrawerClose className='flex-1 flex justify-end'>
              <div role='button' aria-label='close button'>
                <X />
              </div>
            </DrawerClose>
          </DrawerHeader>
          <div className='items-center mt-8'>
            <YearMonthList
              minDate={minDate}
              maxDate={maxDate}
              selected={value}
              onSelect={(selected) => {
                onChange(selected);
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>

      <Button
        variant='ghost'
        size='icon'
        aria-label='다음 월로 이동'
        onClick={handleClickNext}
        disabled={isNextDisabled}
        className='size-4 ml-2'
      >
        <ArrowRightFilled size={16} color='#222' />
      </Button>
    </div>
  );
};

export default YearMonthPicker;
