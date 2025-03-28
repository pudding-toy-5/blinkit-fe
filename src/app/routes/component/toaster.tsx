import { createFileRoute } from '@tanstack/react-router';

import { toast } from 'sonner';

import Layout from '@/shared/ui/layout/Layout';

import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/component/toaster')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <Button onClick={() => toast.success('Event has been created')}>
        success toast
      </Button>
      <Button onClick={() => toast.error('message')}>error toast</Button>
    </Layout>
  );
}
