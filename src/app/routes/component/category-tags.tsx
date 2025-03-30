import { createFileRoute } from '@tanstack/react-router';

import CategoryTag from '@/features/category/ui/CategoryTag';
import Layout from '@/shared/ui/layout/Layout';

export const Route = createFileRoute('/component/category-tags')({
  component: RouteComponent,
});

function RouteComponent() {
  const texts: string[] = [
    '1',
    '22',
    '333',
    '1010101010',
    '20202020202020202020',
  ];
  return (
    <Layout>
      <div className='flex flex-row flex-wrap gap-x-1 gap-y-1.5 mt-6 w-full'>
        {texts.map((text) => (
          <CategoryTag key={text} tagName={text} />
        ))}
      </div>
    </Layout>
  );
}
