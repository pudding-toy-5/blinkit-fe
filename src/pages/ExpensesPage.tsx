import Layout from '@/shared/ui/layout/Layout';
import MonthSelector from '@/features/expense/ui/MonthSelector';

const ExpensesPage: React.FC = () => {
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
};

export default ExpensesPage;
