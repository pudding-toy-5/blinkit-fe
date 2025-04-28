import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  useCategories,
  useDeleteCategory,
  useUpdateCategory,
} from '@/features/category/api/useCategoryQuery';
import { Category } from '@/features/category/model/types/Category';
import { Button, buttonVariants } from '@/shared/ui/atoms/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/atoms/drawer';
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/atoms/form';
import Layout from '@/shared/ui/layout/Layout';
import { cn } from '@/shared/ui/styles/utils';
import SubPageHeader from '@/shared/ui/SubPageHeader';
import UnderlinedTextInput from '@/shared/ui/UnderlinedTextInput';

interface Props {
  category: Category;
  onUpdateCategory: (category: Category) => void;
  onDeleteCategory: (uid: string) => void;
  onClose: () => void;
}

export default function CategoryPopoverPage({
  category,
  onUpdateCategory,
  onDeleteCategory,
  onClose,
}: Props) {
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const { categories } = useCategories();

  const [disabled, setDisabled] = React.useState<boolean>(true);

  const form = useForm<{ categoryName: string }>({
    defaultValues: { categoryName: category.name },
  });

  const validateInput = (newValue: string) => {
    if (
      newValue === category.name ||
      newValue.length === 0 ||
      newValue.length > 20
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const onSubmit = (values: { categoryName: string }) => {
    if (values.categoryName.length === 0) {
      toast.error('카테고리는 최소 한 글자 이상 입력해야 합니다.');
      return;
    }

    if (
      categories?.find(
        (c) => c.name === values.categoryName && c.uid !== category.uid
      )
    ) {
      toast.error('동일한 카테고리 이름이 존재합니다.');
      return;
    }

    const updatedCategory: Category = {
      uid: category.uid,
      name: values.categoryName,
    };

    updateCategory.mutate(updatedCategory, {
      onSuccess: () => {
        toast.success('카테고리 이름을 업데이트했어요.');
        onUpdateCategory(updatedCategory);
        onClose();
      },
    });
  };

  const onDelete = () => {
    deleteCategory.mutate(category.uid, {
      onSuccess: () => {
        toast.success(category.name + '카테고리를 삭제했어요.');
        onDeleteCategory(category.uid);
        onClose();
      },
    });
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
      <Layout>
        <SubPageHeader title='카테고리명 편집' onClose={onClose} />
        <Form {...form}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 flex flex-col h-fit py-6 px-5 mb-auto'
          >
            <FormField
              control={form.control}
              name='categoryName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UnderlinedTextInput
                      value={field.value}
                      onChange={(newValue) => {
                        validateInput(newValue);
                        field.onChange(newValue);
                      }}
                      placeholder='카테고리명을 입력하세요.'
                      guideText='최대 20자 입력'
                      maxLength={20}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex flex-row w-full gap-2 mt-auto'>
              <Drawer>
                <DrawerTrigger
                  type='button'
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'flex-1 rounded-full h-13 text-[15px] text-[#555555] bg-[#efefef] hover:bg-[#efefef]/80 shadow-none'
                  )}
                >
                  삭제
                </DrawerTrigger>
                <DrawerContent className='py-8 px-5 !rounded-t-[20px]'>
                  <DrawerHeader className='p-0'>
                    <DrawerTitle className='text-[19px] text-[#222] font-semibold'>
                      카테고리를 삭제할까요?
                    </DrawerTitle>
                    <DrawerDescription className='text-15px text-[#555]'>
                      카테고리를 삭제하면, 연결된 지출 내역의 {category.name}{' '}
                      태그도 함께 삭제돼요.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter className='p-0 mt-8 gap-0'>
                    <Button className='h-13 rounded-full' onClick={onDelete}>
                      삭제
                    </Button>
                    <DrawerClose asChild>
                      <button className='w-auto h-auto mx-auto mt-[25px] text-[15px] text-[#555] font-semibold'>
                        취소
                      </button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <Button
                type='submit'
                className='flex-1 rounded-full h-13 text-[15px] text-white bg-[#222] hover:bg-[#222]/80'
                disabled={disabled}
              >
                저장
              </Button>
            </div>
          </form>
        </Form>
      </Layout>
    </div>
  );
}
