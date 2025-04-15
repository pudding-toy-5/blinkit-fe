import {
  Consumption,
  ConsumptionKind,
} from '@/features/expense/model/types/ConsumptionKind';
import { Retrospective } from '@/features/retrospective/model/Retrospective';
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
    <div className='flex flex-col px-5 py-8'>
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
      <span className='text-[22px] text-[#222] font-semibold'>
        {totalAmount.toLocaleString()}원
      </span>
    </div>
  );
};

export default RetrospectiveCard;
