import { createFileRoute } from '@tanstack/react-router';

import ExpenseForm from '@/features/expense/ui/ExpenseForm';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/expenses/new')({
  component: AboutPage,
});

export function AboutPage() {
  return (
    <Layout>
      <SubPageHeader title='지출 내역 추가' back />
      <ExpenseForm submitButtonText='저장' />
    </Layout>
  );
}

export default AboutPage;
