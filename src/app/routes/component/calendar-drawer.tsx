import { createFileRoute } from '@tanstack/react-router';

import { useState } from 'react';

import Layout from '@/shared/ui/layout/Layout';
import CalendarDrawer from '@/features/expense/ui/CalendarDrawer';

export const Route = createFileRoute('/component/calendar-drawer')({
  component: RouteComponent,
});

function RouteComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Layout>
      <CalendarDrawer date={date} setDate={setDate} />
    </Layout>
  );
}
