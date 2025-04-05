import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  useAddCategory,
  useCategories,
} from '@/features/category/api/useCategoryQuery';
import CategoryTag from '@/features/category/ui/CategoryTag';
import InputCategoryTags from '@/features/category/ui/InputCategoryTags';
import Ellipsis from '@/shared/ui/icons/Ellipsis';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/expenses/$uid/categories/')({
  loader: ({ params: { uid } }) => {
    return uid;
  },
  component: ExpenseUidCategoriesRoute,
});

export function ExpenseUidCategoriesRoute() {
  const uid = Route.useLoaderData();
  const addCategory = useAddCategory();
  const { categories } = useCategories();

  const [inputCategories, setInputCategories] = React.useState<string[]>([]);

  return (
    <Layout guarded>
      <SubPageHeader title='카테고리 설정' close />
      <div className='mt-6 px-5'>
        <InputCategoryTags
          value={inputCategories}
          onChange={setInputCategories}
          placeholder='카테고리명을 입력해주세요. (예: 카페)'
        />
      </div>
      <div className='flex flex-col px-5 pt-9 pb-6 h-screen'>
        <p className='text-[13px] font-semibold text-[#999]'>카테고리 선택</p>
        {categories === undefined ? (
          <p className='text-[13px] text-[#999] mt-47.5 mx-auto'>
            아직 추가한 카테고리가 없어요.
          </p>
        ) : (
          <ul className='flex flex-col gap-4 list-none overflow-y-scroll scroll mt-4'>
            {categories.map((category) => {
              const category_uid = category.uid;
              return (
                <li className='flex flex-row items-center' key={category.uid}>
                  <CategoryTag tagName={category.name} size='medium' />
                  <Button
                    variant='ghost'
                    className='size-6 p-0 ml-auto'
                    asChild
                  >
                    <Link
                      to='/expenses/$uid/categories/$category_uid'
                      params={{ uid, category_uid }}
                    >
                      <Ellipsis size={24} color='#555' />
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
        <Button className='h-13 rounded-full text-[15px] mt-auto'>완료</Button>
      </div>
    </Layout>
  );
}
