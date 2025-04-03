import { createFileRoute } from '@tanstack/react-router';

import CategoriesRoute from '@/features/category/ui/routes/CategoriesRoute/CategoriesRoute';

export const Route = createFileRoute('/expenses/new/categories/')({
  component: () => <CategoriesRoute />,
});
