import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  // useCategoryByUid,
  useUpdateCategory,
} from '@/features/category/api/useCategoryQuery';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';
import UnderlinedTextInput from '@/shared/ui/UnderlinedTextInput';

export const Route = createFileRoute('/category')({
  component: RouteComponent,
});

function RouteComponent() {
  // const updateCategory = useUpdateCategory();
  // const { uid } = Route.useParams();
  // const { category } = useCategoryByUid(uid);

  const [input, setInput] = React.useState<string>('');

  const form = useForm<{ categoryName: string }>({
    defaultValues: { categoryName: '' },
  });

  const onSubmit = (values: { categoryName: string }) => {
    console.log(value);
  };

  return (
    <Layout>
      <SubPageHeader title='카테고리명 편집' close />
      <Form {...form}>
        <form
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
            <Button className='flex-1 rounded-full h-13 text-[15px] text-[#222] bg-[#efefef] hover:bg-[#efefef]/80'>
              삭제
            </Button>
            <Button className='flex-1 rounded-full h-13 text-[15px] text-white bg-[#222] hover:bg-[#222]/80'>
              저장
            </Button>
          </div>
        </form>
      </Form>
    </Layout>
  );
}
