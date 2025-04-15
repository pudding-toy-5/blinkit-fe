import { useEffect } from 'react';

import { ConsumptionKind } from '@/features/expense/model/types/ConsumptionKind';
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
  const { data } = useExpenses({
    period: { year: 2024, month: 4 },
    consumptionKind,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='fixed z-10 top-0 left-0 w-full h-dvh flex flex-col overflow-hidden'>
      <UserLayout>
        <SubPageHeader onClickBack={onClose} />
        <div className='flex-1 bg-gray-100'></div>
      </UserLayout>
    </div>
  );
};

export default RetrospectiveDetailPopover;
