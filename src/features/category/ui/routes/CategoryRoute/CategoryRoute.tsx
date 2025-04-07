import { useNavigate, useParams } from '@tanstack/react-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  useCategories,
  useCategoryByUid,
  useDeleteCategory,
  useUpdateCategory,
} from '@/features/category/api/useCategoryQuery';
import Layout from '@/shared/ui/layout/Layout';
import { cn } from '@/shared/ui/styles/utils';
import SubPageHeader from '@/shared/ui/SubPageHeader';
import UnderlinedTextInput from '@/shared/ui/UnderlinedTextInput';

const CategoryRoute: React.FC = () => {
  const navigate = useNavigate();
  const { uid, category_uid } = useParams({ strict: false });

  if (category_uid === undefined) {
    throw new Error('failed to get category_uid on useParams');
  }

  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const { categories } = useCategories();
  const { category, isError, error } = useCategoryByUid(category_uid);

  if (isError) {
    if (error) {
      throw error;
    }
    throw new Error('failed on useCategoryByUid in CategoryRoute');
  }

  const [disabled, setDisabled] = React.useState<boolean>(true);

  const form = useForm<{ categoryName: string }>({
    defaultValues: { categoryName: '' },
  });

  React.useEffect(() => {
    form.reset({ categoryName: category?.name });
  }, [category, form]);

  const onChangeInput = (newValue: string) => {
    if (
      newValue === category?.name ||
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
      categories?.find((c) => c.name === values.categoryName && c.uid !== uid)
    ) {
      toast.error('동일한 카테고리 이름이 존재합니다.');
      return;
    }

    updateCategory.mutate({ uid, name: values.categoryName });
  };

  const onDelete = () => {
    deleteCategory.mutate(category_uid, {
      onSuccess: () => {
        if (uid) {
          void navigate({ to: '/expenses/$uid/categories', params: { uid } });
          return;
        }

        void navigate({ to: '/expenses/new/categories' });
      },
    });
  };

  return (
    <Layout guarded>
      <SubPageHeader title='카테고리명 편집' close />
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
                      onChangeInput(newValue);
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
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'flex-1 rounded-full h-13 text-[15px] text-[#222] bg-[#efefef] hover:bg-[#efefef]/80'
                )}
              >
                삭제
              </DrawerTrigger>
              <DrawerContent className='w-full max-w-sm mx-auto py-8 px-5 rounded-t-[20px]'>
                <DrawerHeader className='p-0'>
                  <DrawerTitle className='text-[19px] text-[#222] font-semibold'>
                    카테고리를 삭제할까요?
                  </DrawerTitle>
                  <DrawerDescription className='text-15px text-[#555]'>
                    카테고리를 삭제하면, 연결된 지출 내역의 {category?.name}{' '}
                    태그도 함께 삭제돼요.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className='p-0 mt-9'>
                  <Button className='h-13 rounded-full' onClick={onDelete}>
                    삭제
                  </Button>
                  <DrawerClose>
                    <Button
                      variant='ghost'
                      className='h-13 w-full rounded-full'
                    >
                      취소
                    </Button>
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
  );
};

export default CategoryRoute;
