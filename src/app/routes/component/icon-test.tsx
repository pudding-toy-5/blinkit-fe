import { createFileRoute } from '@tanstack/react-router';

import Layout from '@/shared/ui/layout/Layout';

import ArrowLeft from '@/shared/ui/icons/ArrowLeft';
import ArrowLeftFilled from '@/shared/ui/icons/ArrowLeftFilled';
import Check from '@/shared/ui/icons/Check';
import FilledExclamation from '@/shared/ui/icons/FilledExclamation';
import FilledSuccess from '@/shared/ui/icons/FilledSuccess';
import ArrowRight from '@/shared/ui/icons/ArrowRight';
import Setting from '@/shared/ui/icons/Setting';
import X from '@/shared/ui/icons/X';

export const Route = createFileRoute('/component/icon-test')({
  component: RouteComponent,
});

function RouteComponent() {
  const sizes: number[] = [16, 20, 24, 32, 40, 48];

  return (
    <Layout>
      <div className='flex flex-row'>
        {sizes.map((size) => (
          <ArrowLeft key={size} size={size} />
        ))}
      </div>
      <div className='flex flex-row'>
        {sizes.map((size) => (
          <ArrowLeftFilled key={size} size={size} />
        ))}
      </div>
      <div className='flex flex-row'>
        {sizes.map((size) => (
          <ArrowRight key={size} size={size} />
        ))}
      </div>
      <div className='flex flex-row'>
        {sizes.map((size) => (
          <Check key={size} size={size} />
        ))}
      </div>
      <div className='flex flex-row'>
        {sizes.map((size) => (
          <FilledExclamation key={size} size={size} />
        ))}
      </div>
      <div className='flex flex-row'>
        {sizes.map((size) => (
          <FilledSuccess key={size} size={size} />
        ))}
      </div>
      <div className='flex flex-row'>
        {sizes.map((size) => (
          <Setting key={size} size={size} />
        ))}
      </div>
      <div className='flex flex-row'>
        {sizes.map((size) => (
          <X key={size} size={size} />
        ))}
      </div>
    </Layout>
  );
}
