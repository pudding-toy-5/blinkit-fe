import { createFileRoute } from '@tanstack/react-router';

import { useNewExpenseByUid } from '@/features/expense/api/useExpenseQuery';
import ExpenseForm from '@/features/expense/ui/ExpenseForm';
import UserLayout from '@/shared/ui/layout/UserLayout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/expenses/new/')({
  component: RouteComponent,
});

export function RouteComponent() {
  const { newExpense } = useNewExpenseByUid('new');

  return (
    <UserLayout>
      <SubPageHeader title='지출 내역 추가' back />
      <ExpenseForm expense={newExpense} />
    </UserLayout>
  );
}

export default RouteComponent;
