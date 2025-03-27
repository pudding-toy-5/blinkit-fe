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
      <Button onClick={() => toast('Event has been created', {})}>
        error toast
      </Button>
      <Button>success toast</Button>
    </Layout>
  );
}
