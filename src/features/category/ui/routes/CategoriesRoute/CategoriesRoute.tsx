import { Link } from '@tanstack/react-router';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  useAddCategory,
  useCategories,
} from '@/features/category/api/useCategoryQuery';
import CategoryTag from '@/features/category/ui/CategoryTag';
import InputCategoryTags from '@/features/category/ui/InputCategoryTags';
import { useNewExpense } from '@/features/expense/api/useExpenseQuery';
import Ellipsis from '@/shared/ui/icons/Ellipsis';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

const CategoriesRoute: React.FC = () => {
  const addCategory = useAddCategory();
  const { categories } = useCategories();
  const { newExpense, updateExpenseCategories } = useNewExpense();

  const [inputCategories, setInputCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    setInputCategories(newExpense.categories.map((category) => category.name));

    inputCategories.forEach((inputCategory) => {
      categories.forEach((category) => {
        if (category.name !== inputCategory) {
          addCategory.mutate({ name: inputCategory });
        }
      });
    });
  }, [
    newExpense,
    addCategory,
    categories,
    inputCategories,
    setInputCategories,
    updateExpenseCategories,
  ]);

  return (
    <Layout>
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
        {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          categories === undefined ? (
            <p className='text-[13px] text-[#999] mt-47.5 mx-auto'>
              아직 추가한 카테고리가 없어요.
            </p>
          ) : (
            <ul className='flex flex-col gap-4 items-center list-none overflow-y-scroll scroll mt-4'>
              {categories.map((category) => (
                <li className='flex flex-row items-center' key={category.uid}>
                  <CategoryTag tagName={category.name} size='medium' />
                  <Button
                    variant='ghost'
                    className='size-6 p-0 ml-auto'
                    asChild
                  >
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
          )
        }
        <Button className='h-13 rounded-full text-[15px] mt-auto'>완료</Button>
      </div>
    </Layout>
  );
};

export default CategoriesRoute;
