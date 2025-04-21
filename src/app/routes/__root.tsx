import { createRootRoute, Outlet } from '@tanstack/react-router';

import Toaster from '@/shared/ui/Toaster';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});
