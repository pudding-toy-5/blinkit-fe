import { createFileRoute } from '@tanstack/react-router';

import CategoryRoute from '@/features/category/ui/routes/CategoryRoute';

export const Route = createFileRoute('/category')({
  component: () => <CategoryRoute />,
});
