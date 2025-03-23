import React from 'react';

import { createFileRoute } from '@tanstack/react-router';

import Layout from '@/shared/ui/layout/Layout';
import LabeledTextarea from '@/shared/ui/LabeledTextArea';

export const Route = createFileRoute('/component/text-area')({
  component: RouteComponent,
});

function RouteComponent() {
  const [value, setValue] = React.useState<string>('');

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <LabeledTextarea
        id='id'
        label='default'
        placeholder='placeholder'
        value={value}
        onChange={handleChange}
        state='default'
        maxLength={120}
      />
      <LabeledTextarea
        id='id-2'
        label='focus'
        placeholder='placeholder'
        value={value}
        onChange={handleChange}
        state='focus'
        maxLength={120}
      />
      <LabeledTextarea
        id='id-3'
        label='completed'
        placeholder='placeholder'
        value={value}
        onChange={handleChange}
        state='completed'
        maxLength={120}
      />
      <LabeledTextarea
        id='id-4'
        label='error'
        placeholder='placeholder'
        value={value}
        onChange={handleChange}
        state='error'
        maxLength={120}
      />
    </Layout>
  );
}
