import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import { Button } from '@/components/ui/button';
import LabeledTextInput from '@/shared/ui/LabeledTextInput';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/account/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, useName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');

  React.useEffect(() => {});

  return (
    <Layout>
      <SubPageHeader title='회원정보' back />
      <LabeledTextInput />
      <LabeledTextInput />
      <Button />
    </Layout>
  );
}
