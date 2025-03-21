import { createFileRoute } from '@tanstack/react-router';

import Layout from '@/shared/ui/layout/Layout';
import LabeledTextInput from '@/shared/ui/LabeledTextInput';

export const Route = createFileRoute('/component-test')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <LabeledTextInput label='component-test' />
    </Layout>
  );
}
