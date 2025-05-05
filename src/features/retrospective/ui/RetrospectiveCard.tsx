import { useEffect, useState } from 'react';

import CategoryTag from '@/features/category/ui/CategoryTag';
import {
  Consumption,
  ConsumptionKind,
} from '@/features/expense/model/ConsumptionKind';
import {
  Retrospective,
  RetrospectiveCategory,
} from '@/features/retrospective/model/Retrospective';
import ArrowRight from '@/shared/ui/icons/ArrowRight';
import { cn } from '@/shared/ui/styles/utils';

export interface RetrospectiveCardProps {
  retrospective?: Retrospective;
  consumption: Consumption;
  onClickRetrospectiveDetail: () => void;
}

const RetrospectiveCard: React.FC<RetrospectiveCardProps> = ({
  retrospective,
  consumption,
  onClickRetrospectiveDetail,
}) => {
  if (!retrospective) {
    throw new Error('retrospective is falsy in RetrospectiveCard');
  }

  const { totalCount, totalAmount, items } = retrospective;
  const { consumptionKind, consumptionTexts } = consumption;
  const { title, description } = consumptionTexts;

  const [sortedItems, setSortedItems] = useState<RetrospectiveCategory[]>([]);

  const sortRetrospectiveCategories = (
    a: RetrospectiveCategory,
    b: RetrospectiveCategory
  ) => {
    if (a.totalAmount !== b.totalAmount) {
      return b.totalAmount - a.totalAmount;
    }

    return a.category.name.localeCompare(b.category.name, ['ko', 'en']);
  };

  useEffect(() => {
    setSortedItems([...items].sort(sortRetrospectiveCategories));
  }, [items]);

  return (
    <div className='flex flex-col pb-4 pl-5 pr-4 bg-white pt-8'>
      <div className='flex flex-row items-center'>
        <span className='text-[19px] text-[#222] font-semibold'>{title}</span>
        <span
          className={cn(
            'text-[15px] font-semibold ml-1',
            consumptionKind === ConsumptionKind.emotional && 'text-[#FF6B6B]',
            consumptionKind === ConsumptionKind.conscious && 'text-[#E7B60F]',
            consumptionKind === ConsumptionKind.essential && 'text-[#28A745]'
          )}
        >
          {totalCount}건
        </span>
      </div>
      <span className='text-[15px] text-[#555] mt-1'>{description}</span>
      <span className='text-[22px] text-[#222] font-semibold mt-3'>
        {Math.floor(totalAmount).toLocaleString()}원
      </span>
      {items.length !== 0 && (
        <ul className='flex flex-col gap-4 mt-8'>
          {sortedItems.map((item) => (
            <li className='flex flex-row' key={item.category.uid}>
              <CategoryTag tagName={item.category.name} size='medium' />
              <span className='flex ml-auto items-center text-[17px] text-[#222] font-semibold'>
                {Math.floor(item.totalAmount).toLocaleString()}원
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className='flex flex-row justify-center items-center w-full mt-6 pt-4 border-t-[1px] border-[#efefef]'>
        <button
          className='flex flex-row gap-[2px] items-center'
          onClick={onClickRetrospectiveDetail}
        >
          <span className='text-[13px] text-[#555]'>자세히보기</span>
          <ArrowRight size={16} color='#555555' />
        </button>
      </div>
    </div>
  );
};

export default RetrospectiveCard;
