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
import Ellipsis from '@/shared/ui/icons/Ellipsis';
import UserLayout from '@/shared/ui/layout/UserLayout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

import CategoryPopover from './CategoryPopover';

interface Props {
  selected: Category[];
  setSelected: (values: Category[]) => void;
  onClose: () => void;
}

export default function CategoriesPopover({
  selected,
  setSelected,
  onClose,
}: Props) {
  const addCategory = useAddCategory();
  const { categories, isLoading, isError, error } = useCategories();

  const [open, setOpen] = React.useState<boolean>(false);
  const [values, setValues] = React.useState<string[]>(
    selected.map((s) => s.name)
  );

  const [category, setCategory] = React.useState<Category | undefined>(
    undefined
  );

  React.useEffect(() => {
    setValues(selected.map((s) => s.name));
  }, [selected]);

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError && error) {
    throw error;
  }

  const handleValues = (newValues: string[]) => {
    if (categories === undefined) {
      toast.error('어떠한 문제상황');
      return;
    }

    const notAddedValues = newValues.filter(
      (value) => !categories.some((c) => c.name === value)
    );

    notAddedValues.forEach((notAddedValue) => {
      addCategory.mutate(
        { name: notAddedValue },
        {
          onSuccess: () => {
            const addedCategory: Category[] = categories.filter(
              (c) => c.name !== notAddedValue
            );

            setSelected([...selected, ...addedCategory]);
          },
          onError: () => {
            toast.error(notAddedValue + ' 카테고리를 추가하는데 실패했어요.');
          },
        }
      );
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

    handleValues([...values, clickedCategory.name]);
  };

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      {open && category && (
        <CategoryPopover
          category={category}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
      <UserLayout>
        <SubPageHeader title='카테고리 설정' onClose={onClose} />
        <div className='mt-6 px-5'>
          <InputCategoryTags
            value={values}
            onChange={handleValues}
            placeholder='카테고리명을 입력해주세요. (예: 카페)'
            maxLength={20}
          />
        </div>

        {/* origin: pb-6  */}
        <div className='flex-1 flex flex-col px-5 pt-9 pb-16'>
          <p className='text-[13px] font-semibold text-[#999]'>카테고리 선택</p>
          {categories === undefined || categories.length === 0 ? (
            <p className='text-[13px] text-[#999] mt-47.5 mx-auto'>
              아직 추가한 카테고리가 없어요.
            </p>
          ) : (
            <ul className='flex flex-col gap-4 list-none overflow-y-scroll scroll mt-4'>
              {categories.map((category) => {
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
                      type='button'
                      variant='ghost'
                      className='size-6 p-0 ml-auto'
                      onClick={() => {
                        setCategory(category);
                        setOpen(true);
                      }}
                    >
                      <Ellipsis size={24} color='#555' />
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
          <Button
            //origin: mt-auto
            className='h-13 rounded-full text-[15px] mt-auto'
            onClick={() => {
              setSelected(
                categories
                  ? categories.filter((c) =>
                      values.find((value) => value === c.name)
                    )
                  : []
              );
              onClose();
            }}
            disabled={
              !categories || categories.length === 0 || values.length === 0
            }
          >
            완료
          </Button>
        </div>
      </UserLayout>
    </div>
  );
}
