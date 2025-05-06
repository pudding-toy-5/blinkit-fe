import { useMemo } from 'react';

import { getConsumptionTitle } from '@/features/expense/lib/consumption';
import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';
import { CONSUMPTION_COLORS } from '@/shared/consts';

export interface ItemProps {
  consumptionKind: ConsumptionKind;
  percentage: number;
  amount: number;
}

const SummaryItem: React.FC<ItemProps> = ({
  consumptionKind,
  percentage,
  amount,
}) => {
  return (
    <li className='flex flex-row items-center gap-2'>
      <div
        className='size-4 rounded-full'
        style={{ backgroundColor: CONSUMPTION_COLORS[consumptionKind] }}
      />
      <div className='flex flex-col gap-1'>
        <span className='text-[17px] text-[#222] font-semibold'>
          {getConsumptionTitle(consumptionKind)}
        </span>
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
        consumptionKind: ConsumptionKind.essential,
        percentage: calculatePercentage(essential),
        amount: essential,
      },
      {
        consumptionKind: ConsumptionKind.conscious,
        percentage: calculatePercentage(conscious),
        amount: conscious,
      },
      {
        consumptionKind: ConsumptionKind.emotional,
        percentage: calculatePercentage(emotional),
        amount: emotional,
      },
    ];

    const compareItems = (a: ItemProps, b: ItemProps) => {
      const consumptionOrderArray: ConsumptionKind[] = [
        ConsumptionKind.essential,
        ConsumptionKind.conscious,
        ConsumptionKind.emotional,
      ];

      const compareConsumption = (a: ConsumptionKind, b: ConsumptionKind) => {
        return (
          consumptionOrderArray.findIndex((item) => item === a) -
          consumptionOrderArray.findIndex((item) => item === b)
        );
      };

      if (a.amount === b.amount) {
        return compareConsumption(a.consumptionKind, b.consumptionKind);
      }

      return a.amount - b.amount;
    };

    return unsorted.sort(compareItems).reverse();
  }, [essential, emotional, conscious, calculatePercentage]);

  return (
    <header className='flex flex-col'>
      <span className='text-[22px] text-[#222] font-semibold mt-4'>
        {total.toLocaleString()}원
      </span>
      <div className='flex flex-row w-full h-6 shrink-0 rounded-[4px] bg-gray-100 mt-4 mb-8 overflow-hidden'>
        {summaries.map(({ consumptionKind, percentage }) => (
          <div
            key={consumptionKind}
            style={{
              width: `${percentage.toString()}%`,
              backgroundColor: CONSUMPTION_COLORS[consumptionKind],
            }}
          />
        ))}
      </div>
      <ul className='flex flex-col gap-6'>
        {summaries.map(({ consumptionKind, percentage, amount }) => (
          <SummaryItem
            key={consumptionKind}
            consumptionKind={consumptionKind}
            percentage={percentage}
            amount={amount}
          />
        ))}
      </ul>
    </header>
  );
};

export default RetrospectiveSummary;
