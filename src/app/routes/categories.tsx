import { createFileRoute } from '@tanstack/react-router';

import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/categories')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <SubPageHeader title='카테고리 설정' close />
      dasdf
    </Layout>
  );
}
