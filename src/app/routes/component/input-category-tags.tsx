import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

// import { InputTags } from '@/components/ui/input-tags';
import InputCategoryTags from '@/features/category/ui/InputCategoryTags';
import Layout from '@/shared/ui/layout/Layout';

export const Route = createFileRoute('/component/input-category-tags')({
  component: RouteComponent,
});

function RouteComponent() {
  const [values, setValues] = React.useState<string[]>([]);

  return (
    <Layout>
      <InputCategoryTags
        value={values}
        onChange={setValues}
        placeholder='카테고리명을 입력해주세요. (예: 카페)'
      />
    </Layout>
  );
}
