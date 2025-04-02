import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import CalendarDrawer from '@/features/expense/ui/CalendarDrawer';
import Layout from '@/shared/ui/layout/Layout';

export const Route = createFileRoute('/component/calendar-drawer')({
  component: RouteComponent,
});

function RouteComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Layout>
      <CalendarDrawer
        trigger='trigger to open calendar drawer'
        date={date}
        setDate={setDate}
      />
    </Layout>
  );
}
