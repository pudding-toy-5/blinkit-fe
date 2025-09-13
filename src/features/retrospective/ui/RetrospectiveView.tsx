import { Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';

import {
  consumptionConscious,
  consumptionEmotional,
  consumptionEssential,
} from '@/features/expense/consts';
import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';
import { useRetrospectivesByRange } from '@/features/retrospective/api/useRetrospective';
import { DEFAULT_FROM_DATE, DEFAULT_TO_DATE } from '@/shared/consts/date';
import { formatDateRange } from '@/shared/lib/dateUtils';
import useDateRange from '@/shared/lib/useDateRange';
import ArrowLeft from '@/shared/ui/icons/ArrowLeft';
import DateRangePicker from '@/widgets/DateRangePicker';

import RetrospectiveCard, { RetrospectiveCardProps } from './RetrospectiveCard';
import RetrospectiveDetailPopoverPage from './RetrospectiveDetailPopoverPage';
import RetrospectiveSummary, {
  RetrospectiveSummaryProps,
} from './RetrospectiveSummary';

const CalendarTrigger: React.FC<{ dateRange: DateRange | undefined }> = ({
  dateRange,
}) => {
  return (
    <div className='flex flex-row items-center gap-1'>
      <span className='text-[15px] text-[#222] font-semibold'>
        {dateRange ? formatDateRange(dateRange) : '전체 기간'}
      </span>
      <div className='rotate-[-90deg]'>
        <ArrowLeft size={16} color='#222' />
      </div>
    </div>
  );
};

const RetrospectiveView: React.FC = () => {
  const { dateRange, setDateRange } = useDateRange();

  const { data: retrospectives = [] } = useRetrospectivesByRange({
    from: DEFAULT_FROM_DATE,
    to: DEFAULT_TO_DATE,
  });

  const { data: rangeRetrospectives = [] } = useRetrospectivesByRange({
    from: dateRange?.from ?? DEFAULT_FROM_DATE,
    to: dateRange?.to ?? DEFAULT_TO_DATE,
  });

  const [consumptionKind, setConsumptionKind] = useState<ConsumptionKind>(
    ConsumptionKind.none
  );
  const [open, setOpen] = useState<boolean>(false);

  const sortedRetrospectiveCards: RetrospectiveCardProps[] = useMemo(() => {
    const essential = rangeRetrospectives.find(
      (retrospective) =>
        retrospective.consumptionKind === ConsumptionKind.essential
    );

    const conscious = rangeRetrospectives.find(
      (retrospective) =>
        retrospective.consumptionKind === ConsumptionKind.conscious
    );

    const emotional = rangeRetrospectives.find(
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
  }, [rangeRetrospectives]);

  const amounts: RetrospectiveSummaryProps = useMemo(() => {
    if (sortedRetrospectiveCards.length === 0) {
      return { essential: 0, conscious: 0, emotional: 0 };
    }

    return {
      emotional: sortedRetrospectiveCards[0].retrospective?.totalAmount ?? 0,
      conscious: sortedRetrospectiveCards[1].retrospective?.totalAmount ?? 0,
      essential: sortedRetrospectiveCards[2].retrospective?.totalAmount ?? 0,
    };
  }, [sortedRetrospectiveCards]);

  const isRetrospectiveEmpty = useMemo(
    () => retrospectives.reduce((acc, cur) => (acc += cur.totalCount), 0) === 0,
    [retrospectives]
  );

  const isSelectedRangeRecordEmpty = useMemo(
    () =>
      rangeRetrospectives.reduce((acc, cur) => (acc += cur.totalCount), 0) ===
      0,
    [rangeRetrospectives]
  );

  if (isRetrospectiveEmpty) {
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

  if (dateRange && isSelectedRangeRecordEmpty) {
    return (
      <div className='flex-1 flex flex-col overflow-y-auto scroll'>
        <div className='flex-1 flex flex-col items-center justify-center text-center'>
          <span className='text-[15px] text-[#555] leading-[150%]'>
            {formatDateRange(dateRange)}에는
            <br />
            리뷰한 소비가 없어요.
          </span>
          <button
            onClick={() => {
              setDateRange(undefined);
            }}
            className='text-[13px] text-[#555] rounded-full px-3 py-2 bg-[#efefef] mt-4'
          >
            다시 기간 설정하기
          </button>
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
        <div className='px-5 py-4'>
          <DateRangePicker
            trigger={<CalendarTrigger dateRange={dateRange} />}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          <RetrospectiveSummary
            essential={amounts.essential}
            conscious={amounts.conscious}
            emotional={amounts.emotional}
          />
        </div>
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
