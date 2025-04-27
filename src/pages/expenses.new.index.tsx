import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import AuthGuard from '@/features/auth/ui/AuthGuard';
import {
  useAddExpense,
  useUpdateExpense,
} from '@/features/expense/api/useExpenseQuery';
import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';
import { Expense } from '@/features/expense/model/Expense';
import ExpenseForm from '@/features/expense/ui/ExpenseForm';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/expenses/new/')({
  component: () => (
    <AuthGuard>
      <RouteComponent />
    </AuthGuard>
  ),
});

export function RouteComponent() {
  const navigate = useNavigate();
  const addExpense = useAddExpense();
  const updateExpense = useUpdateExpense();

  const initialExpense: Omit<Expense, 'uid'> = {
    date: new Date(),
    memo: '',
    categories: [],
    consumptionKind: ConsumptionKind.none,
    amount: 0,
    consumptionKind: ConsumptionKind.none,
  };

  const handleSubmit = (expense: Omit<Expense, 'uid'>) => {
    const consumptionKind = expense.consumptionKind ?? ConsumptionKind.none;

    addExpense.mutate(
      { ...expense },
      {
        onSuccess: (data) => {
          // todo: remove this
          updateExpense.mutate(
            { ...expense, uid: data.uid, consumptionKind },
            {
              onSuccess: () => {
                toast.success('지출내역을 추가했어요.');
                void navigate({ to: '/expenses' });
              },
              onError: () => {
                toast.error(
                  '지출내역 업데이트에 실패했어요. 소비 종류가 기본값으로 설정되었습니다.'
                );
              },
            }
          );
        },
        onError: () => {
          toast.error('지출내역을 추가하는데 실패했어요.');
        },
      }
    );
  };

  return (
    <>
      <SubPageHeader
        title='지출 내역 추가'
        onClickBack={() => {
          void navigate({ to: '/expenses' });
        }}
      />
      <ExpenseForm expense={initialExpense} onSubmit={handleSubmit} />
    </>
  );
}

export default RouteComponent;
