import { useEffect, useState } from 'react';

import {
  consumptionConsciousTexts,
  consumptionEmotionalTexts,
  consumptionEssentialTexts,
} from '@/features/expense/consts';
import {
  ConsumptionKind,
  ConsumptionTexts,
} from '@/features/expense/model/types/ConsumptionKind';
import UserLayout from '@/shared/ui/layout/UserLayout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

import { useExpenses } from '../../expense/api/useExpenseQuery';

interface Props {
  consumptionKind: ConsumptionKind;
  onClose: () => void;
}

const RetrospectiveDetailPopover: React.FC<Props> = ({
  consumptionKind,
  onClose,
}) => {
  const { data: expenses } = useExpenses({
    period: { year: 2025, month: 4 },
    consumptionKind,
  });

  const [consumptionTexts, setConsumptionTexts] =
    useState<ConsumptionTexts | null>(null);

  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  useEffect(() => {
    if (!expenses) {
      return;
    }

    setTotalAmount(
      expenses.reduce((total, expense) => total + expense.amount, 0)
    );
  }, []);

  useEffect(() => {
    if (consumptionKind === ConsumptionKind.conscious) {
      setConsumptionTexts(consumptionConsciousTexts);
    }

    if (consumptionKind === ConsumptionKind.emotional) {
      setConsumptionTexts(consumptionEmotionalTexts);
    }

    if (consumptionKind === ConsumptionKind.essential) {
      setConsumptionTexts(consumptionEssentialTexts);
    }
  }, [consumptionKind]);

  if (!expenses) {
    return <div>asdf</div>;
  }

  return (
    <div className='fixed z-10 top-0 left-0 w-full h-dvh flex flex-col overflow-hidden'>
      <UserLayout>
        <SubPageHeader onClickBack={onClose} />
        <div className='flex flex-col px-5'>
          <h1 className='text-[19px] text-[#222] font-semibold'>
            {consumptionTexts?.title}
          </h1>
          <span className='text-[13px] text-[#555] mt-1'>
            {consumptionTexts?.description}
          </span>
          <span className='text-[22px] text-[#222] font-semibold mt-3'>
            {totalAmount}원
          </span>
        </div>
      </UserLayout>
    </div>
  );
};

export default RetrospectiveDetailPopover;
