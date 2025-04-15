import { useState } from 'react';

import {
  consumptionConscious,
  consumptionEmotional,
  consumptionEssential,
} from '@/features/expense/consts';
import { ConsumptionKind } from '@/features/expense/model/types/ConsumptionKind';

import { Retrospective } from '../model/Retrospective';
import RetrospectiveCard from './RetrospectiveCard';
import RetrospectiveDetailPopover from './RetrospectiveDetailPopover';

const RetrospectiveView: React.FC = () => {
  // todo: update this to useConsumptionRetrospectives
  const retrospective: Omit<Retrospective, 'consumptionKind'> = {
    totalCount: 3,
    totalAmount: 100000,
    items: [
      {
        category: { uid: 'category-1', name: 'category-1' },
        totalAmount: 50000,
      },
      {
        category: { uid: 'category-2', name: 'category-2' },
        totalAmount: 30000,
      },
      {
        category: { uid: 'category-3', name: 'category-3' },
        totalAmount: 20000,
      },
    ],
  };

  const [consumptionKind, setConsumptionKind] =
    useState<ConsumptionKind | null>(null);

  const [open, setOpen] = useState<boolean>(false);

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
        retrospective={{
          ...retrospective,
          consumptionKind: ConsumptionKind.emotional,
        }}
        onClickRetrospectiveDetail={() => {
          setConsumptionKind(ConsumptionKind.emotional);
          setOpen(true);
        }}
      />
      <div className='h-2 bg-[#F5F3F0] shrink-0' />
      <RetrospectiveCard
        consumption={consumptionConscious}
        retrospective={{
          ...retrospective,
          consumptionKind: ConsumptionKind.conscious,
        }}
        onClickRetrospectiveDetail={() => {
          setConsumptionKind(ConsumptionKind.emotional);
          setOpen(true);
        }}
      />
      <div className='h-2 bg-[#F5F3F0] shrink-0' />
      <RetrospectiveCard
        consumption={consumptionEssential}
        retrospective={{
          ...retrospective,
          consumptionKind: ConsumptionKind.essential,
        }}
        onClickRetrospectiveDetail={() => {
          setConsumptionKind(ConsumptionKind.emotional);
          setOpen(true);
        }}
      />
    </div>
  );
};

export default RetrospectiveView;
