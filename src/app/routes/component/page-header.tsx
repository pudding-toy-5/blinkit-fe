import { createFileRoute } from '@tanstack/react-router';

import Layout from '@/shared/ui/layout/Layout';
import PageHeader from '@/shared/ui/PageHeader';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/component/page-header')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <PageHeader />
      <SubPageHeader backLink='tt' title='very long title' />
    </Layout>
  );
}
