import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useMe, useUpdateMe } from '@/features/auth/api/useAuth';
import LabeledTextInput from '@/shared/ui/LabeledTextInput';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/settings/account')({
  component: RouteComponent,
});

function RouteComponent() {
  const updateMe = useUpdateMe();
  const { data, isLoading, isError, error } = useMe();

  const [nickname, setNickname] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');

  if (isError) {
    throw error;
  }

  React.useEffect(() => {
    if (data?.nickname !== undefined && data.email !== undefined) {
      setNickname(data.nickname);
      setEmail(data.email);
    }
  }, [data]);

  const onSubmit = () => {
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
      !data.email &&
      !data.isStaff &&
      !data.isSuperuser
    ) {
      updateMe.mutate(
        { ...data, nickname },
        {
          onSuccess: () => {
            toast.success('회원정보를 성공적으로 업데이트했습니다.');
          },
          onError: (error) => {
            toast.error(
              '회원정보 업데이트 중 오류가 발생했습니다. ' + error.message
            );
          },
        }
      );
    }
  };

  return (
    <Layout guarded>
      <SubPageHeader title='회원정보' back />
      <LabeledTextInput
        id='nickname'
        label='닉네임'
        value={nickname}
        onChange={setNickname}
      />
      <LabeledTextInput
        id='email'
        label='이메일'
        value={email}
        state='disabled'
      />
      <Button onClick={onSubmit}>저장</Button>
    </Layout>
  );
}
