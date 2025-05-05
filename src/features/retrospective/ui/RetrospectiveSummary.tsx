import { useMemo } from 'react';

import { getConsumptionTitle } from '@/features/expense/lib/consumption';
import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';
import { CONSUMPTION_COLORS } from '@/shared/consts';

export interface ItemProps {
  color: (typeof CONSUMPTION_COLORS)[keyof typeof CONSUMPTION_COLORS];
  title: string;
  percentage: number;
  amount: number;
}

const SummaryItem: React.FC<ItemProps> = ({
  color,
  title,
  percentage,
  amount,
}) => {
  return (
    <li className='flex flex-row items-center gap-2'>
      <div className='size-4 rounded-full' style={{ backgroundColor: color }} />
      <div className='flex flex-col gap-1'>
        <span className='text-[17px] text-[#222] font-semibold'>{title}</span>
        <span className='text-[13px] text-[#555]'>{percentage}%</span>
      </div>
      <span className='text-[17px] text-[#222] font-semibold ml-auto'>{`${amount.toLocaleString()}원`}</span>
    </li>
  );
};

export interface RetrospectiveSummaryProps {
  essential: number;
  conscious: number;
  emotional: number;
}

const RetrospectiveSummary: React.FC<RetrospectiveSummaryProps> = ({
  essential,
  conscious,
  emotional,
}) => {
  const total = useMemo(() => {
    return essential + conscious + emotional;
  }, [essential, conscious, emotional]);

  const calculatePercentage = useMemo(
    () => (amount: number) => {
      if (total === 0) {
        return 0;
      }

      return Number(((amount / total) * 100).toFixed(2));
    },
    [total]
  );

  const summaries: ItemProps[] = useMemo(() => {
    const unsorted: ItemProps[] = [
      {
        color: CONSUMPTION_COLORS[ConsumptionKind.essential],
        title: getConsumptionTitle(ConsumptionKind.essential),
        percentage: calculatePercentage(essential),
        amount: essential,
      },
      {
        color: CONSUMPTION_COLORS[ConsumptionKind.conscious],
        title: getConsumptionTitle(ConsumptionKind.conscious),
        percentage: calculatePercentage(conscious),
        amount: conscious,
      },
      {
        color: CONSUMPTION_COLORS[ConsumptionKind.emotional],
        title: getConsumptionTitle(ConsumptionKind.emotional),
        percentage: calculatePercentage(emotional),
        amount: emotional,
      },
    ];

    const compareItems = (a: ItemProps, b: ItemProps) => {
      if (a.amount === b.amount) {
        return 0;
      }

      return a.amount - b.amount;
    };

    return unsorted.sort(compareItems);
  }, [essential, emotional, conscious, calculatePercentage]);

  return (
    <header className='flex flex-col'>
      <span className='text-[22px] text-[#222] font-semibold'>
        {total.toLocaleString()}원
      </span>
      <div className='flex flex-row w-full h-4 rounded-[4px] bg-gray-100 mt-4 mb-8 overflow-hidden'>
        {summaries.map(({ color, percentage, title: key }) => (
          <div
            key={key}
            style={{
              width: `${percentage.toString()}%`,
              backgroundColor: color,
            }}
          />
        ))}
      </div>
      <ul className='flex flex-col gap-6'>
        {summaries.map(({ color, title, percentage, amount }) => (
          <SummaryItem
            key={title}
            color={color}
            title={title}
            percentage={percentage}
            amount={amount}
          />
        ))}
      </ul>
    </header>
  );
};

export default RetrospectiveSummary;
