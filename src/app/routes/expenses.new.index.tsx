import { createFileRoute } from '@tanstack/react-router';

import { useNewExpense } from '@/features/expense/api/useExpenseQuery';
import ExpenseForm from '@/features/expense/ui/ExpenseForm';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/expenses/new/')({
  component: RouteComponent,
});

export function RouteComponent() {
  const { newExpense } = useNewExpense();
  return (
    <Layout guarded>
      <SubPageHeader title='지출 내역 추가' back />
      <ExpenseForm expense={newExpense} />
    </Layout>
  );
}

export default RouteComponent;
