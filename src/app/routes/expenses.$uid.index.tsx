import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import {
  useDeleteExpense,
  useExpenseByUid,
  useNewExpenseByUid,
} from '@/features/expense/api/useExpenseQuery';
import ExpenseForm from '@/features/expense/ui/ExpenseForm';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/expenses/$uid/')({
  component: RouteComponent,
});

export function RouteComponent() {
  const navigate = useNavigate();
  const deleteExpense = useDeleteExpense();

  const { uid }: { uid: string } = Route.useParams();
  const { data: expense, isLoading, isError, error } = useExpenseByUid(uid);
  const { newExpense, updateNewExpense } = useNewExpenseByUid(uid);

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

  if (isError || !expense) {
    toast.error('해당 지출내역을 찾을 수 없어요.');
    void navigate({ to: '/expenses' });
    return;
  }

  updateNewExpense(expense);

  const handleDelete = () => {
    deleteExpense.mutate(uid, {
      onSuccess: () => {
        toast.success('지출내역을 삭제했어요.');
        void navigate({ to: '/expenses' });
      },
      onError: () => {
        toast.error('해당 지출내역을 삭제하지 못했어요.');
      },
    });
  };

  return (
    <Layout guarded>
      <SubPageHeader title='지출 내역 수정' back onClose={handleDelete} />
      <ExpenseForm expense={newExpense} />
    </Layout>
  );
}

export default RouteComponent;
