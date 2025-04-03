import { createFileRoute } from '@tanstack/react-router';

import CategoriesRoute from '@/features/category/ui/routes/CategoriesRoute';

export const Route = createFileRoute('/expenses/$uid/categories')({
  component: CategoriesRoute,
});
