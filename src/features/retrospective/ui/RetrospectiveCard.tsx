import { Button } from '@/components/ui/button';
import CategoryTag from '@/features/category/ui/CategoryTag';
import {
  Consumption,
  ConsumptionKind,
} from '@/features/expense/model/types/ConsumptionKind';
import { Retrospective } from '@/features/retrospective/model/Retrospective';
import ArrowRight from '@/shared/ui/icons/ArrowRight';
import { cn } from '@/shared/ui/styles/utils';

export interface RetrospectiveCardProps {
  retrospective: Retrospective;
  consumption: Consumption;
}

const RetrospectiveCard: React.FC<RetrospectiveCardProps> = ({
  retrospective,
  consumption,
}) => {
  const { totalCount, totalAmount, items } = retrospective;
  const { consumptionKind, consumptionTexts } = consumption;
  const { title, description } = consumptionTexts;

  return (
    <div className='flex flex-col pt-8 pb-4 pl-5 pr-4 bg-white'>
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
      <span className='mt-1'>{description}</span>
      <span className='text-[22px] text-[#222] font-semibold mt-3'>
        {totalAmount.toLocaleString()}원
      </span>
      <ul className='flex flex-col gap-4 mt-8'>
        {items.map((item) => (
          <li className='flex flex-row'>
            <CategoryTag tagName={item.category.name} size='small' />
            <span className='flex ml-auto items-center text-[17px] text-[#222] font-semibold'>
              {item.totalAmount}원
            </span>
          </li>
        ))}
      </ul>
      <div className='flex flex-row justify-center items-center w-full mt-6 pt-4 border-t-[1px] border-[#efefef]'>
        <Button variant='ghost' className='shadow-none'>
          자세히보기
          <ArrowRight size={16} color='#555555' />
        </Button>
      </div>
    </div>
  );
};

export default RetrospectiveCard;
