import SelectMonthDrawer from '@/features/expense/ui/SelectMonthDrawer';
import YearMonth from '@/shared/model/YearMonth';
import { Button } from '@/shared/ui/atoms/button';
import ArrowLeftFilled from '@/shared/ui/icons/ArrowLeftFilled';
import ArrowRightFilled from '@/shared/ui/icons/ArrowRightFilled';

interface MonthSelectorProps {
  yearMonth: YearMonth;
  onSetYearMonth: (yearMonth: YearMonth) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  yearMonth,
  onSetYearMonth,
}) => {
  const { year, month } = yearMonth;

  const handleClickPrevious = () => {
    if (month === 1) {
      onSetYearMonth({ year: year - 1, month: 12 });
    } else {
      onSetYearMonth({ year, month: month - 1 });
    }
  };

  const handleClickNext = () => {
    if (month === 12) {
      onSetYearMonth({ year: year + 1, month: 1 });
    } else {
      onSetYearMonth({ year, month: month + 1 });
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
      <SelectMonthDrawer
        yearMonth={yearMonth}
        onSetYearMonth={onSetYearMonth}
      />
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

export default MonthSelector;
