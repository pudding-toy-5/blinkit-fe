import { ConsumptionKind } from '@/features/expense/model/types/ConsumptionKind';
import UserLayout from '@/shared/ui/layout/UserLayout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

interface Props {
  consumptionKind: ConsumptionKind;
  onClose: () => void;
}

const RetrospectiveDetailPopover: React.FC<Props> = ({
  consumptionKind,
  onClose,
}) => {
  return (
    <div>
      <UserLayout>
        <SubPageHeader onClickBack={onClose} />
      </UserLayout>
    </div>
  );
};

export default RetrospectiveDetailPopover;
