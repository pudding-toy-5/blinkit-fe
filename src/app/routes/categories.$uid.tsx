import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import {
  useCategoryByUid,
  useUpdateCategory,
} from '@/features/category/api/useCategoryQuery';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';
import UnderlinedTextInput from '@/shared/ui/UnderlinedTextInput';

export const Route = createFileRoute('/categories/$uid')({
  component: RouteComponent,
});

function RouteComponent() {
  const updateCategory = useUpdateCategory();

  const { uid } = Route.useParams();
  const { category } = useCategoryByUid(uid);

  const onChangeCategory = (name: string) => {
    updateCategory.mutate({ uid, name });
  };

  return (
    <Layout>
      <SubPageHeader title='카테고리명 편집' close />
      <UnderlinedTextInput
        value={category.name}
        onChange={(name) => {
          onChangeCategory(name);
        }}
      />
      <div className='flex flex-row gap-2 mt-auto mb-0'>
        <Button>삭제</Button>
        <Button>저장</Button>
      </div>
    </Layout>
  );
}
