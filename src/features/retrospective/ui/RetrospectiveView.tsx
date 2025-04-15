import { useState } from 'react';

import {
  consumptionConscious,
  consumptionEmotional,
  consumptionEssential,
} from '@/features/expense/consts';
import { ConsumptionKind } from '@/features/expense/model/types/ConsumptionKind';
import { useRetrospectives } from '@/features/retrospective/api/useRetrospectives';

import RetrospectiveCard from './RetrospectiveCard';
import RetrospectiveDetailPopover from './RetrospectiveDetailPopover';

const RetrospectiveView: React.FC = () => {
  const { data: retrospectives } = useRetrospectives();

  const [consumptionKind, setConsumptionKind] =
    useState<ConsumptionKind | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  if (!retrospectives) {
    return;
  }

  return (
    <div className='flex flex-col overflow-y-scroll scroll'>
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
            retrospective.consumptionKind === ConsumptionKind.emotional
        )}
        onClickRetrospectiveDetail={() => {
          setConsumptionKind(ConsumptionKind.emotional);
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
          setConsumptionKind(ConsumptionKind.emotional);
          setOpen(true);
        }}
      />
    </div>
  );
};

export default RetrospectiveView;
