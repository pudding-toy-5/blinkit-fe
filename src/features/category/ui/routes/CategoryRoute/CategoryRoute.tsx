import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
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
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';
import UnderlinedTextInput from '@/shared/ui/UnderlinedTextInput';

const CategoryRoute: React.FC = () => {
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
            <Drawer>
              <DrawerTrigger>
                <Button
                  className='flex-1 rounded-full h-13 text-[15px] text-[#222] bg-[#efefef] hover:bg-[#efefef]/80'
                  asChild
                >
                  삭제
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>카테고리를 삭제할까요?</DrawerTitle>
                  <DrawerDescription>
                    카테고리를 삭제하면, 연결된 지출 내역의 친구 생일선물 태그도
                    함께 삭제돼요.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button className='rounded-full'>Submit</Button>
                  <DrawerClose>
                    <Button variant='ghost'>취소</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <Button className='flex-1 rounded-full h-13 text-[15px] text-white bg-[#222] hover:bg-[#222]/80'>
              저장
            </Button>
          </div>
        </form>
      </Form>
    </Layout>
  );
};

export default CategoryRoute;
