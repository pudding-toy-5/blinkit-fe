import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import { useAddExpense } from '@/features/expense/api/useExpenseQuery';
import { Expense } from '@/features/expense/model/types/Expense';
import ExpenseForm from '@/features/expense/ui/ExpenseForm';
import UserLayout from '@/shared/ui/layout/UserLayout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/expenses/new/')({
  component: RouteComponent,
});

export function RouteComponent() {
  const navigate = useNavigate();
  const addExpense = useAddExpense();

  const initialExpense: Omit<Expense, 'uid'> = {
    date: new Date(),
    memo: '',
    categories: [],
    amount: 0,
  };

  const handleSubmit = (expense: Omit<Expense, 'uid'>) => {
    addExpense.mutate(
      { ...expense },
      {
        onSuccess: () => {
          toast.success('지출내역을 추가했어요.');
          void navigate({ to: '/expenses' });
        },
        onError: () => {
          toast.error('지출내역을 추가하는데 실패했어요.');
        },
      }
    );
  };

  return (
    <UserLayout>
      <SubPageHeader
        title='지출 내역 추가'
        onClickBack={() => {
          void navigate({ to: '/expenses' });
        }}
      />
      <ExpenseForm expense={initialExpense} onSubmit={handleSubmit} />
    </UserLayout>
  );
}

export default RouteComponent;
