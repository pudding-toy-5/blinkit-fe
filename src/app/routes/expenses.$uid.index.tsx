import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import {
  useDeleteExpense,
  useExpenseByUid,
  useNewExpenseByUid,
} from '@/features/expense/api/useExpenseQuery';
import ExpenseForm from '@/features/expense/ui/ExpenseForm';
import UserLayout from '@/shared/ui/layout/UserLayout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/expenses/$uid/')({
  component: RouteComponent,
});

export function RouteComponent() {
  const navigate = useNavigate();
  const deleteExpense = useDeleteExpense();

  const { uid }: { uid: string } = Route.useParams();
  const { data: expense, isLoading, isError } = useExpenseByUid(uid);
  const { newExpense, updateNewExpense } = useNewExpenseByUid(uid);

  if (isLoading) {
    return (
      <UserLayout>
        <SubPageHeader title='지출 내역 수정' />
        <div className='flex flex-1 justify-center items-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#222]' />
        </div>
      </UserLayout>
    );
  }

  if (isError) {
    toast.error('해당 지출내역을 찾을 수 없어요.');
    void navigate({ to: '/expenses' });
    return;
  }

  if (!expense) {
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
    <UserLayout>
      <SubPageHeader
        title='지출 내역 수정'
        onClickBack={() => {
          void navigate({ to: '/expenses' });
        }}
        onDelete={handleDelete}
      />
      <ExpenseForm expense={newExpense} />
    </UserLayout>
  );
}

export default RouteComponent;
