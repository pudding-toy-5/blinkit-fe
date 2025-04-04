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
  const { data: expense, isLoading, isError, error } = useExpenseByUid(uid);

  if (isLoading) {
    return (
      <Layout guarded>
        <SubPageHeader title='지출 내역 수정' back />
        <div className='flex flex-1 justify-center items-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#222]' />
        </div>
      </Layout>
    );
  }

  if (isError) {
    throw error;
  }

  if (!expense) {
    throw new Error('Expense not found');
  }

  return (
    <Layout guarded>
      <SubPageHeader title='지출 내역 수정' back />
      <ExpenseForm expense={expense} />
    </Layout>
  );
}

export default RouteComponent;
