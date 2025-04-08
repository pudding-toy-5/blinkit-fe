import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  useAddCategory,
  useCategories,
} from '@/features/category/api/useCategoryQuery';
import { Category } from '@/features/category/model/types/Category';
import CategoryTag from '@/features/category/ui/CategoryTag';
import InputCategoryTags from '@/features/category/ui/InputCategoryTags';
import { useNewExpenseByUid } from '@/features/expense/api/useExpenseQuery';
import Ellipsis from '@/shared/ui/icons/Ellipsis';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/expenses/$uid/categories/')({
  component: ExpenseUidCategoriesRoute,
});

export function ExpenseUidCategoriesRoute() {
  const navigate = useNavigate();
  const { uid }: { uid: string } = Route.useParams();

  const addCategory = useAddCategory();
  const { newExpense, updateNewExpenseCategories } = useNewExpenseByUid(uid);
  const { categories, isLoading, isError, error } = useCategories();

  const [values, setValues] = React.useState<string[]>(
    newExpense.categories.map((category) => category.name)
  );

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError && error) {
    throw error;
  }

  const handleValues = (newValues: string[]) => {
    if (categories === undefined) {
      setValues(newValues);

      return;
    }

    const notAddedValues = newValues.filter(
      (value) => !categories.some((c) => c.name === value)
    );

    notAddedValues.forEach((notAddedValue) => {
      addCategory.mutate({ name: notAddedValue });
    });

    setValues(newValues);
  };

  const onClickCategory = (clickedCategory: Category) => {
    if (values.length >= 3) {
      toast.error('카테고리는 최대 3개까지 선택할 수 있어요.');
      return;
    }

    if (values.find((value) => clickedCategory.name === value)) {
      toast.error('추가하려는 카테고리는 이미 선택되었어요.');
      return;
    }

    setValues([...values, clickedCategory.name]);
  };

  const handleSubmit = () => {
    const selectedCategories =
      categories?.filter((category) => values.includes(category.name)) ?? [];

    updateNewExpenseCategories(selectedCategories);
    void navigate({ to: `/expenses/${uid}` });
  };

  return (
    <Layout guarded>
      <SubPageHeader title='카테고리 설정' close />
      <div className='mt-6 px-5'>
        <InputCategoryTags
          value={values}
          onChange={handleValues}
          placeholder='카테고리명을 입력해주세요. (예: 카페)'
          maxLength={20}
        />
      </div>
      <div className='flex flex-col px-5 pt-9 pb-6 h-screen'>
        <p className='text-[13px] font-semibold text-[#999]'>카테고리 선택</p>
        {categories === undefined || categories.length === 0 ? (
          <p className='text-[13px] text-[#999] mt-47.5 mx-auto'>
            아직 추가한 카테고리가 없어요.
          </p>
        ) : (
          <ul className='flex flex-col gap-4 list-none overflow-y-scroll scroll mt-4'>
            {categories.map((category) => {
              const category_uid = category.uid;
              return (
                <li className='flex flex-row items-center' key={category.uid}>
                  <CategoryTag
                    tagName={category.name}
                    size='medium'
                    onClick={() => {
                      onClickCategory(category);
                    }}
                  />
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
        <Button
          //origin: mt-auto
          className='h-13 rounded-full text-[15px] mt-10'
          onClick={handleSubmit}
          disabled={
            !categories || categories.length === 0 || values.length === 0
          }
        >
          완료
        </Button>
      </div>
    </Layout>
  );
}
