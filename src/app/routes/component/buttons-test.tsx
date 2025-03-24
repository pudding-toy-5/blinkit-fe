import { createFileRoute } from '@tanstack/react-router';

import Layout from '@/shared/ui/layout/Layout';
import SignInButton from '@/features/sign-in/ui/SignInButton';
import SubmitButton from '@/shared/ui/SubmitButton';
import AddExpenseButton from '@/features/expense/ui/AddExpenseButton';

export const Route = createFileRoute('/component/buttons-test')({
  component: RouteComponent,
});

function RouteComponent() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleClick = () => {};

  return (
    <Layout>
      <SignInButton service='google' onClick={handleClick} />
      <SignInButton service='naver' onClick={handleClick} />
      <SubmitButton text='버튼' state='default' onClick={handleClick} />
      <SubmitButton text='버튼' state='disabled' onClick={handleClick} />
      <AddExpenseButton onClick={handleClick} />
    </Layout>
  );
}
