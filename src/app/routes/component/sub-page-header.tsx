import { createFileRoute } from '@tanstack/react-router';

import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/component/sub-page-header')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <SubPageHeader title='only title' />
      <SubPageHeader title='title with back' back />
      <SubPageHeader title='title with close' close />
      <SubPageHeader title='title with back and close' back close />
    </Layout>
  );
}
