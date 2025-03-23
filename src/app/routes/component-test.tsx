import React from 'react';

import { createFileRoute } from '@tanstack/react-router';

import Layout from '@/shared/ui/layout/Layout';
import LabeledTextInput from '@/shared/ui/LabeledTextInput';

export const Route = createFileRoute('/component-test')({
  component: RouteComponent,
});

function RouteComponent() {
  const [value, setValue] = React.useState<string>('');

  const handleChange = (newValue: string) => setValue(newValue);

  return (
    <Layout>
      <LabeledTextInput
        label='1 default'
        placeholder='placeholder'
        id='id'
        value={value}
        onChange={handleChange}
        maxLength={20}
      />
      <LabeledTextInput label='2 focused' id='focused' />
      <LabeledTextInput label='3 completed' id='completed' state='completed' />
      <LabeledTextInput label='4 disabled' id='disabled' state='disabled' />
      <LabeledTextInput
        label='5 error'
        id='error'
        state='error'
        value={'333'}
        maxLength={1}
      />
    </Layout>
  );
}
