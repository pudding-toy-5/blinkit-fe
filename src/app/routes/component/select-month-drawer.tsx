import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import Layout from '@/shared/ui/layout/Layout';
import SelectMonthDrawer from '@/features/expense/ui/SelectMonthDrawer';

import Period from '@/features/expense/model/types/Period';

export const Route = createFileRoute('/component/select-month-drawer')({
  component: RouteComponent,
});

function RouteComponent() {
  const [period, setPeriod] = useState<Period>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  return (
    <Layout>
      <SelectMonthDrawer
        trigger='trigger'
        period={period}
        onSetPeriod={setPeriod}
      />
      <p>{period.year}</p>
      <p>{period.month}</p>
    </Layout>
  );
}
