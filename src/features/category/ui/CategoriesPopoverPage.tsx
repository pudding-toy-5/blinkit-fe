import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import {
  useAddCategory,
  useCategories,
} from '@/features/category/api/useCategoryQuery';
import { Category } from '@/features/category/model/types/Category';
import CategoryTag from '@/features/category/ui/CategoryTag';
import InputCategoryTags from '@/features/category/ui/InputCategoryTags';
import { Button } from '@/shared/ui/atoms/button';
import Ellipsis from '@/shared/ui/icons/Ellipsis';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

import CategoryPopoverPage from './CategoryPopoverPage';

interface Props {
  selectedCategories: Category[];
  setSelectedCategories: (values: Category[]) => void;
  onClose: () => void;
}

export default function CategoriesPopoverPage({
  selectedCategories,
  setSelectedCategories,
  onClose,
}: Props) {
  const addCategory = useAddCategory();
  const { categories } = useCategories();

  const [values, setValues] = useState<string[]>(
    selectedCategories.map((selectedCategory) => selectedCategory.name)
  );

  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<Category | undefined>(undefined);

  const submitButtonText = useMemo(
    () =>
      values.length === 0 ? '완료' : `${values.length.toString()}개 설정 완료`,
    [values]
  );

  useEffect(() => {
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
        <CategoryPopoverPage
          category={category}
          onUpdateCategory={onUpdateCategory}
          onDeleteCategory={onDeleteCategory}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
      <Layout>
        <SubPageHeader title='카테고리 설정' onClose={onClose} />
        <div className='mt-6 px-5'>
          <InputCategoryTags
            value={values}
            onChange={handleValues}
            placeholder='카테고리를 선택하거나 입력해주세요.'
            maxLength={20}
          />
        </div>

        <div className='flex flex-col flex-1 overflow-hidden'>
          <p className='text-[13px] font-semibold text-[#999] mt-8 mb-4 px-5'>
            내가 추가한 카테고리
          </p>
          <div className='flex-1 overflow-hidden'>
            {categories === undefined || categories.length === 0 ? (
              <div className='mt-47.5 mx-auto flex items-center justify-center text-center'>
                <span className='text-[15px] text-[#999]'>
                  카테고리를 추가해두면
                  <br />
                  다음에도 쉽게 찾을 수 있어요.
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
        <button
          className='h-13 rounded-full text-[15px] text-white mt-auto mb-8 mx-5 disabled:bg-[#ccc] bg-[#222]'
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
          {submitButtonText}
        </button>
      </Layout>
    </div>
  );
}
