import { createFileRoute } from '@tanstack/react-router';

import SubPageHeader from '@/shared/ui/SubPageHeader';
import ExpenseForm from '@/features/expense/ui/ExpenseForm';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

export function AboutPage() {
  return (
    <div className='max-w-sm mx-auto h-screen bg-gray-100 flex flex-col'>
      <SubPageHeader backLink='/' title='About Page' />
      <ExpenseForm />
    </div>
  );
}

export default AboutPage;
