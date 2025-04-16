import { useState } from 'react';

import { useExpenses } from '@/features/expense/api/useExpenseQuery';
import {
  consumptionConscious,
  consumptionEmotional,
  consumptionEssential,
} from '@/features/expense/consts';
import { ConsumptionKind } from '@/features/expense/model/types/ConsumptionKind';
import { useRetrospectives } from '@/features/retrospective/api/useRetrospectives';

import RetrospectiveCard from './RetrospectiveCard';
import RetrospectiveDetailPopover from './RetrospectiveDetailPopover';

const RetrospectiveView: React.FC<{ onMoveReview: () => void }> = ({
  onMoveReview,
}) => {
  const { data: totalExpenses } = useExpenses({
    period: { year: 2025, month: 4 },
  });
  const { data: retrospectives } = useRetrospectives();

  const [consumptionKind, setConsumptionKind] =
    useState<ConsumptionKind | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  if (!retrospectives) {
    return null;
  }

  if (!totalExpenses) {
    return;
  }

  return (
    <div className='flex-1 flex flex-col overflow-y-auto scroll'>
      {totalExpenses.length === 0 ? (
        <div className='flex-1 flex flex-col items-center justify-center text-center'>
          <span className='text-[15px] text-[#555] leading-[150%]'>
            아직 리뷰한 소비가 없어요.
            <br />
            리뷰 탭으로 이동해 소비를 분류해주세요.
          </span>
          <button
            className='text-[13px] text-[#555] rounded-full px-3 py-2 bg-[#efefef] mt-4'
            onClick={onMoveReview}
          >
            리뷰 탭으로 이동하기
          </button>
        </div>
      ) : (
        <>
          {open && consumptionKind && (
            <RetrospectiveDetailPopover
              consumptionKind={consumptionKind}
              onClose={() => {
                setOpen(false);
                setConsumptionKind(null);
              }}
            />
          )}
          <RetrospectiveCard
            consumption={consumptionEmotional}
            retrospective={retrospectives.find(
              (retrospective) =>
                retrospective.consumptionKind === ConsumptionKind.emotional
            )}
            onClickRetrospectiveDetail={() => {
              setConsumptionKind(ConsumptionKind.emotional);
              setOpen(true);
            }}
          />
          <div className='h-2 bg-[#F5F3F0] shrink-0' />
          <RetrospectiveCard
            consumption={consumptionConscious}
            retrospective={retrospectives.find(
              (retrospective) =>
                retrospective.consumptionKind === ConsumptionKind.conscious
            )}
            onClickRetrospectiveDetail={() => {
              setConsumptionKind(ConsumptionKind.conscious);
              setOpen(true);
            }}
          />
          <div className='h-2 bg-[#F5F3F0] shrink-0' />
          <RetrospectiveCard
            consumption={consumptionEssential}
            retrospective={retrospectives.find(
              (retrospective) =>
                retrospective.consumptionKind === ConsumptionKind.essential
            )}
            onClickRetrospectiveDetail={() => {
              setConsumptionKind(ConsumptionKind.essential);
              setOpen(true);
            }}
          />
        </>
      )}
    </div>
  );
};

export default RetrospectiveView;
