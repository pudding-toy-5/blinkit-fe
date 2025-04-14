import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import Logo from '@/shared/ui/icons/Logo';
import UserLayout from '@/shared/ui/layout/UserLayout';
import { cn } from '@/shared/ui/styles/utils';

export const Route = createFileRoute('/expenses/review/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isRewind, setIsRewind] = React.useState<boolean>(false);

  return (
    <UserLayout>
      <header className='px-5 py-4'>
        <Logo />
      </header>
      <nav className='px-5 pt-4'>
        <ul className='flex flex-row items-center justify-center gap-5'>
          <li
            className={cn(
              'flex items-center justify-center w-[50%]',
              'text-[17px] text-[#999999] font-semibold',
              'border-b-[2px] border-transparent',
              !isRewind && 'text-[#222222] border-[#222222]'
            )}
            onClick={() => {
              setIsRewind(false);
            }}
          >
            리뷰
          </li>
          <li
            className={cn(
              'flex items-center justify-center w-[50%]',
              'text-[17px] text-[#999999] font-semibold',
              'border-b-[2px] border-transparent',
              isRewind && 'text-[#222222] border-[#222222]'
            )}
            onClick={() => {
              setIsRewind(true);
            }}
          >
            회고
          </li>
        </ul>
      </nav>
    </UserLayout>
  );
}
