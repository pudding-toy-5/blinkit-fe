import { Link } from '@tanstack/react-router';
import React from 'react';

import { Button } from '@/components/ui/button';
import { useCategories } from '@/features/category/api/useCategoryQuery';
import CategoryTag from '@/features/category/ui/CategoryTag';
import InputCategoryTags from '@/features/category/ui/InputCategoryTags';
import Ellipsis from '@/shared/ui/icons/Ellipsis';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

const CategoriesRoute: React.FC = () => {
  const { categories } = useCategories();

  const [values, setValues] = React.useState<string[]>([]);

  return (
    <Layout>
      <SubPageHeader title='카테고리 설정' close />
      <div className='mt-6 px-5'>
        <InputCategoryTags
          value={values}
          onChange={setValues}
          placeholder='카테고리명을 입력해주세요. (예: 카페)'
        />
      </div>
      <div className='flex flex-col px-5 pt-9 pb-6 h-screen'>
        <p className='text-[13px] font-semibold text-[#999]'>카테고리 선택</p>
        <ul className='flex flex-col gap-4 list-none overflow-y-scroll scroll mt-4'>
          {categories.map((category) => (
            <li className='flex flex-row items-center' key={category.uid}>
              <CategoryTag tagName={category.name} size='medium' />
              <Button variant='ghost' className='size-6 p-0 ml-auto' asChild>
                <Link
                  to='/categories/$uid'
                  params={(prev: { uid?: string }) => ({
                    ...prev,
                    uid: category.uid,
                  })}
                >
                  <Ellipsis size={24} color='#555' />
                </Link>
              </Button>
            </li>
          ))}
        </ul>
        <Button className='h-13 rounded-full text-[15px] mt-auto'>완료</Button>
      </div>
    </Layout>
  );
};

export default CategoriesRoute;
