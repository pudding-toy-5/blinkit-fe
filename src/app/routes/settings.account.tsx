import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useMe, useUpdateMe } from '@/features/auth/api/useAuth';
import LabeledTextInput from '@/shared/ui/LabeledTextInput';
import UserLayout from '@/shared/ui/layout/UserLayout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/settings/account')({
  component: RouteComponent,
});

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import SubmitButton from '@/shared/ui/SubmitButton';

const formSchema = z.object({
  nickname: z
    .string()
    .min(1, {
      message: '닉네임은 최소 1글자 이상이어야 해요.',
    })
    .max(20, {
      message: '닉네임은 최대 20글자까지 입력할 수 있어요.',
    }),
  email: z.string(),
});

function RouteComponent() {
  const navigate = useNavigate();
  const updateMe = useUpdateMe();
  const { data, isError, error } = useMe();

  if (isError) {
    throw error;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { nickname: '', email: '' },
  });

  React.useEffect(() => {
    if (!data) {
      return;
    }

    if (data.nickname) {
      form.setValue('nickname', data.nickname);
    }

    if (data.email) {
      form.setValue('email', data.email);
    }
  }, [form, data]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const nickname = values.nickname;

    if (nickname.length === 0) {
      toast.error('닉네임은 최소 1글자 이상이어야 해요.');
      return;
    }

    if (nickname.length > 20) {
      toast.error('닉네임은 최대 20자까지만 입력 가능해요.');
      return;
    }

    if (
      data?.uid !== undefined &&
      data.email
      // &&data.isStaff !== undefined &&
      // data.isSuperuser !== undefined
    ) {
      updateMe.mutate(
        { ...data, nickname },
        {
          onSuccess: () => {
            void navigate({ to: '/expenses' });
          },
          onError: () => {
            toast.error('닉네임 설정에 실패했어요.');
          },
        }
      );
    }
  };

  return (
    <UserLayout>
      <SubPageHeader
        title='회원정보'
        onClickBack={() => {
          void navigate({ to: '/settings' });
        }}
      />
      <Form {...form}>
        <form
          className='flex flex-col flex-1 pt-6 pb-8 px-5'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='nickname'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LabeledTextInput
                    id='nickname'
                    label='닉네임'
                    value={field.value}
                    onChange={field.onChange}
                    maxLength={20}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LabeledTextInput
                    id='email'
                    label='이메일'
                    value={field.value}
                    onChange={field.onChange}
                    state='disabled'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='mt-auto'>
            <SubmitButton
              type='submit'
              text='저장'
              className='w-full font-semibold'
            />
          </div>
        </form>
      </Form>
    </UserLayout>
  );
}
