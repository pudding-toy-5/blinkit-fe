import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import {
  consumptionConscious,
  consumptionEmotional,
  consumptionEssential,
} from '@/features/expense/consts';
import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';
import { useRetrospectivesByRange } from '@/features/retrospective/api/useRetrospective';
import useDateRange from '@/shared/lib/useDateRange';

import RetrospectiveCard from './RetrospectiveCard';
import RetrospectiveDetailPopoverPage from './RetrospectiveDetailPopoverPage';

const RetrospectiveView: React.FC = () => {
  const {
    dateRange: { start, end },
  } = useDateRange();

  const { data: retrospectives = [] } = useRetrospectivesByRange({
    start,
    end,
  });

  const [consumptionKind, setConsumptionKind] =
    useState<ConsumptionKind | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const [reviewedExpenseCount, setReviewedExpenseCount] = useState<number>(0);

  useEffect(() => {
    setReviewedExpenseCount(
      retrospectives.reduce((acc, cur) => acc + cur.totalCount, 0)
    );
  }, [retrospectives]);

  return (
    <>
      {open && consumptionKind && (
        <RetrospectiveDetailPopoverPage
          consumptionKind={consumptionKind}
          onClose={() => {
            setOpen(false);
            setConsumptionKind(null);
          }}
        />
      )}
      <div className='flex-1 flex flex-col overflow-y-auto scroll'>
        {reviewedExpenseCount === 0 ? (
          <div className='flex-1 flex flex-col items-center justify-center text-center'>
            <span className='text-[15px] text-[#555] leading-[150%]'>
              아직 리뷰한 소비가 없어요.
              <br />
              기록 화면으로 이동해 소비를 분류해주세요.
            </span>
            <Link to='/expenses'>
              <button className='text-[13px] text-[#555] rounded-full px-3 py-2 bg-[#efefef] mt-4'>
                기록 화면으로 이동하기
              </button>
            </Link>
          </div>
        ) : (
          <>
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
            <div className='h-4 w-full bg-white shrink-0' />
          </>
        )}
      </div>
    </>
  );
};

export default RetrospectiveView;
