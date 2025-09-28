import YearMonth from '@/shared/model/YearMonth';
import { Button } from '@/shared/ui/atoms/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui/atoms/drawer';
import ArrowLeftFilled from '@/shared/ui/icons/ArrowLeftFilled';
import ArrowRightFilled from '@/shared/ui/icons/ArrowRightFilled';
import X from '@/shared/ui/icons/X';

import YearMonthList from './YearMonthList';
import YearMonthTrigger from './YearMonthTrigger';

export interface YearMonthPickerProps {
  value: YearMonth;
  onChange: (yearMonth: YearMonth) => void;
}

const YearMonthPicker: React.FC<YearMonthPickerProps> = ({
  value,
  onChange,
}) => {
  const { year, month } = value;

  const handleClickPrevious = () => {
    if (month === 1) {
      onChange({ year: year - 1, month: 12 });
    } else {
      onChange({ year, month: month - 1 });
    }
  };

  const handleClickNext = () => {
    if (month === 12) {
      onChange({ year: year + 1, month: 1 });
    } else {
      onChange({ year, month: month + 1 });
    }
  };

  return (
    <div className='flex flex-row items-center' aria-label='조회 월 선택'>
      <Button
        variant='ghost'
        size='icon'
        aria-label='이전 월로 이동'
        onClick={handleClickPrevious}
        className='size-4 mr-2'
      >
        <ArrowLeftFilled size={16} color='#222' />
      </Button>
      <Drawer>
        <YearMonthTrigger yearMonth={value} />
        <DrawerContent
          className='py-6 px-5'
          style={{ borderRadius: '20px 20px 0 0 ' }}
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
              selected={value}
              onSelect={(value) => {
                onChange(value);
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
        disabled={
          year === new Date().getFullYear() &&
          month === new Date().getMonth() + 1
        }
        className='size-4 ml-2'
      >
        <ArrowRightFilled size={16} color='#222' />
      </Button>
    </div>
  );
};

export default YearMonthPicker;
