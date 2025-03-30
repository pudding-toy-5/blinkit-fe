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
    '20202020202020202020',
  ];
  return (
    <Layout>
      <div className='flex flex-row flex-wrap gap-x-2 gap-y-2 w-full'>
        {texts.map((text) => (
          <CategoryTag key={text} tagName={text} size='small' />
        ))}
      </div>
      <div className='flex flex-row flex-wrap gap-2 w-full'>
        {texts.map((text) => (
          <CategoryTag key={text} tagName={text} size='medium' />
        ))}
      </div>
      <div className='flex flex-row flex-wrap gap-2 w-full'>
        {texts.map((text) => (
          <CategoryTag key={text} tagName={text} size='large' />
        ))}
      </div>
      <div className='flex flex-row flex-wrap gap-2 w-full'>
        {texts.map((text) => (
          <CategoryTag
            key={text}
            tagName={text}
            size='small'
            onDelete={() => {}}
          />
        ))}
      </div>
    </Layout>
  );
}
