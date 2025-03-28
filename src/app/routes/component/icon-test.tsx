import { createFileRoute } from '@tanstack/react-router';

import Layout from '@/shared/ui/layout/Layout';

import Setting from '@/shared/ui/icons/Setting';

export const Route = createFileRoute('/component/icon-test')({
  component: RouteComponent,
});

function RouteComponent() {
  const sizes: number[] = [16, 20, 24, 32, 40, 48];

  return (
    <Layout>
      <div className='flex flex-row'>
        {sizes.map((size) => (
          <Setting key={size} size={size} />
        ))}
      </div>
    </Layout>
  );
}
