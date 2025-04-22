import { createRootRoute, Outlet } from '@tanstack/react-router';

import Layout from '@/shared/ui/layout/Layout';
import Toaster from '@/shared/ui/Toaster';

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      <Toaster />
    </Layout>
  ),
});
