import { createFileRoute } from '@tanstack/react-router';

import CategoryRoute from '@/features/category/ui/routes/CategoryRoute';

export const Route = createFileRoute('/expenses/$uid/categories/$category_uid')(
  {
    component: CategoryRoute,
  }
);
