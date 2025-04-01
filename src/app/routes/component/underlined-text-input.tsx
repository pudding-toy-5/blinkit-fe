import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import Layout from '@/shared/ui/layout/Layout';
import UnderlinedTextInput from '@/shared/ui/UnderlinedTextInput';

export const Route = createFileRoute('/component/underlined-text-input')({
  component: RouteComponent,
});

function RouteComponent() {
  const [value, setValue] = React.useState<string>('');

  return (
    <Layout>
      <UnderlinedTextInput
        value={value}
        onChange={setValue}
        placeholder='카테고리명을 입력하세요.'
        maxLength={20}
        guideText='최대 20자 입력'
      />
      <input />
    </Layout>
  );
}
