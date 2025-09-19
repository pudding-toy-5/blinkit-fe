import { Button } from '@/shared/ui/atoms/button';
import { DrawerTrigger } from '@/shared/ui/atoms/drawer';

import type { YearMonthTriggerProps } from './types';

const YearMonthTrigger = ({ yearMonth }: YearMonthTriggerProps) => {
  const { year, month } = yearMonth;

  const isCurrentYear = year !== new Date().getFullYear();

  return (
    <DrawerTrigger asChild>
      <Button
        variant='ghost'
        className='h-auto p-0 text-[15px] min-w-[22px] rounded-none text-decoration-line: underline decoration-solid decoration-auto underline-offset-auto tabular-nums'
        style={{ textUnderlinePosition: 'from-font' }}
      >
        {isCurrentYear && `${year.toString()}년 `}
        {month}월
      </Button>
    </DrawerTrigger>
  );
};

export default YearMonthTrigger;
