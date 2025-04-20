import React from 'react';
import { toast } from 'sonner';

import { Button } from '@/shared/ui/atoms/button';
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
  selectedCategories: Category[];
  setSelectedCategories: (values: Category[]) => void;
  onClose: () => void;
}

export default function CategoriesPopover({
  selectedCategories,
  setSelectedCategories,
  onClose,
}: Props) {
  const addCategory = useAddCategory();
  const { categories } = useCategories();

  const [values, setValues] = React.useState<string[]>(
    selectedCategories.map((selectedCategory) => selectedCategory.name)
  );

  const [open, setOpen] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<Category | undefined>(
    undefined
  );

  React.useEffect(() => {
    setValues(
      selectedCategories.map((selectedCategory) => selectedCategory.name)
    );
  }, [selectedCategories]);

  const handleValues = (newValues: string[]) => {
    if (categories === undefined) {
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
            const addedCategory = categories.find(
              (c) => c.name === notAddedValue
            );

            if (addedCategory) {
              setSelectedCategories([...selectedCategories, addedCategory]);
            }
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

  const onUpdateCategory = (newCategory: Category) => {
    const index = selectedCategories.findIndex(
      (selectedCategory) => selectedCategory.uid === newCategory.uid
    );

    if (index === -1) {
      return;
    }

    const newSelectedCategories = [...selectedCategories];
    newSelectedCategories.splice(index, 1, newCategory);
    setSelectedCategories(newSelectedCategories);
  };

  const onDeleteCategory = (uid: string) => {
    const newCategories = selectedCategories.filter(
      (selectedCategory) => selectedCategory.uid !== uid
    );

    setSelectedCategories(newCategories);
  };

  return (
    <div className='fixed z-10 top-0 left-0 w-full h-full flex flex-col overflow-hidden'>
      {open && category && (
        <CategoryPopover
          category={category}
          onUpdateCategory={onUpdateCategory}
          onDeleteCategory={onDeleteCategory}
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

        <div className='flex flex-col flex-1 overflow-hidden'>
          <p className='text-[13px] font-semibold text-[#999] my-4 px-5'>
            카테고리 선택
          </p>
          <div className='flex-1 overflow-hidden'>
            {categories === undefined || categories.length === 0 ? (
              <div className='mt-47.5 mx-auto flex items-center justify-center'>
                <span className='text-[13px] text-[#999]'>
                  아직 추가한 카테고리가 없어요.
                </span>
              </div>
            ) : (
              <div className='h-full overflow-y-auto mx-auto px-5 pr-1 pb-24 scroll'>
                <ul className='flex flex-col gap-4 list-none'>
                  {categories.map((category) => {
                    return (
                      <li
                        className='flex flex-row items-center'
                        key={category.uid}
                      >
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
                          className='size-6 p-0 ml-auto mr-[16px]'
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
              </div>
            )}
          </div>
        </div>
        <div className='fixed bottom-0 left-0 right-0 w-full min-w-[360px] max-w-[430px] mx-auto px-5 py-4 bg-white border-t border-gray-100'>
          <Button
            className='h-13 rounded-full text-[15px] w-full'
            onClick={() => {
              setSelectedCategories(
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
