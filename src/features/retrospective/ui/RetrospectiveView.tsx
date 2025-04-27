import { Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import {
  consumptionConscious,
  consumptionEmotional,
  consumptionEssential,
} from '@/features/expense/consts';
import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';
import { useRetrospectivesByRange } from '@/features/retrospective/api/useRetrospective';
import useDateRange from '@/shared/lib/useDateRange';

import RetrospectiveCard, { RetrospectiveCardProps } from './RetrospectiveCard';
import RetrospectiveDetailPopoverPage from './RetrospectiveDetailPopoverPage';
// import RetrospectiveSummary, {
//   RetrospectiveSummaryProps,
// } from './RetrospectiveSummary';

const RetrospectiveView: React.FC = () => {
  const { dateRange, setDateRange } = useDateRange();

  const { data: retrospectives = [] } = useRetrospectivesByRange({
    start: dateRange?.from ?? new Date('2025-04-01'),
    end: dateRange?.to ?? new Date('2025-05-31'),
  });

  const [consumptionKind, setConsumptionKind] = useState<ConsumptionKind>(
    ConsumptionKind.none
  );
  const [open, setOpen] = useState<boolean>(false);

  const sortedRetrospectiveCards: RetrospectiveCardProps[] = useMemo(() => {
    const essential = retrospectives.find(
      (retrospective) =>
        retrospective.consumptionKind === ConsumptionKind.essential
    );

    const conscious = retrospectives.find(
      (retrospective) =>
        retrospective.consumptionKind === ConsumptionKind.conscious
    );

    const emotional = retrospectives.find(
      (retrospective) =>
        retrospective.consumptionKind === ConsumptionKind.emotional
    );

    if (!essential || !conscious || !emotional) {
      return [];
    }

    return [
      {
        retrospective: emotional,
        consumption: consumptionEmotional,
        onClickRetrospectiveDetail: () => {
          setConsumptionKind(ConsumptionKind.emotional);
          setOpen(true);
        },
      },
      {
        retrospective: conscious,
        consumption: consumptionConscious,
        onClickRetrospectiveDetail: () => {
          setConsumptionKind(ConsumptionKind.conscious);
          setOpen(true);
        },
      },
      {
        retrospective: essential,
        consumption: consumptionEssential,
        onClickRetrospectiveDetail: () => {
          setConsumptionKind(ConsumptionKind.essential);
          setOpen(true);
        },
      },
    ];
  }, [retrospectives]);

  // const amounts: RetrospectiveSummaryProps = useMemo(() => {
  //   if (sortedRetrospectiveCards.length === 0) {
  //     return { essential: 0, conscious: 0, emotional: 0 };
  //   }

  //   return {
  //     emotional: sortedRetrospectiveCards[0].retrospective?.totalAmount ?? 0,
  //     conscious: sortedRetrospectiveCards[1].retrospective?.totalAmount ?? 0,
  //     essential: sortedRetrospectiveCards[2].retrospective?.totalAmount ?? 0,
  //   };
  // }, [retrospectives]);

  const isRecordEmpty = useMemo(
    () => retrospectives.reduce((acc, cur) => (acc += cur.totalCount), 0) === 0,
    [retrospectives]
  );

  if (isRecordEmpty) {
    return (
      <div className='flex-1 flex flex-col overflow-y-auto scroll'>
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
      </div>
    );
  }

  return (
    <>
      {open && consumptionKind && (
        <RetrospectiveDetailPopoverPage
          consumptionKind={consumptionKind}
          onClose={() => {
            setOpen(false);
            setConsumptionKind(ConsumptionKind.none);
          }}
        />
      )}
      <div className='flex-1 flex flex-col overflow-y-auto scroll'>
        {/* <div className='px-5 py-4'>
          <RetrospectiveSummary
            essential={amounts.essential}
            conscious={amounts.conscious}
            emotional={amounts.emotional}
          />
        </div> */}
        {sortedRetrospectiveCards.map(
          ({ retrospective, consumption, onClickRetrospectiveDetail }) => (
            <div key={consumption.consumptionKind}>
              <div className='h-3 bg-[#F5F3F0] shrink-0' />
              <RetrospectiveCard
                retrospective={retrospective}
                consumption={consumption}
                onClickRetrospectiveDetail={onClickRetrospectiveDetail}
              />
            </div>
          )
        )}
        <div className='h-4 w-full bg-white shrink-0' />
      </div>
    </>
  );
};

export default RetrospectiveView;
