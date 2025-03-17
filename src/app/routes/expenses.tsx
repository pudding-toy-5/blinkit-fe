import { createFileRoute } from '@tanstack/react-router';

import Layout from '@/shared/ui/layout/Layout';
import MonthSelector from '@/features/expense/ui/MonthSelector';

export const Route = createFileRoute('/expenses')({
  component: ExpensesPage,
});

export function ExpensesPage() {
  return (
    <Layout>
      <header>
        <h1>ExpensesPage</h1>
      </header>
      <main>
        <MonthSelector />
      </main>
    </Layout>
  );
}

export default ExpensesPage;
