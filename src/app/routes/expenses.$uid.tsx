import { createFileRoute } from '@tanstack/react-router';

import { useExpenseByUid } from '@/features/expense/api/useExpenseQuery';
import ExpenseForm from '@/features/expense/ui/ExpenseForm';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/expenses/$uid')({
  component: RouteComponent,
  notFoundComponent: () => <p>expense with id not found</p>,
});

export function RouteComponent() {
  const { uid } = Route.useParams();
  const {
    data: expense,
    isLoading,
    isError,
    error,
  } = useExpenseByUid(uid as string);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    throw error;
  }

  if (!expense) {
    throw new Error('Expense not found');
  }

  return (
    <Layout>
      <SubPageHeader title='지출 내역 수정' back />
      <ExpenseForm expense={expense} />
    </Layout>
  );
}

export default RouteComponent;
