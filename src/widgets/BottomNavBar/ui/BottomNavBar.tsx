import { Link, useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import Review from '@/shared/ui/icons/Review';
import ReviewFilled from '@/shared/ui/icons/ReviewFilled';
import Settings from '@/shared/ui/icons/Settings';
import SettingsFilled from '@/shared/ui/icons/SettingsFilled';
import Write from '@/shared/ui/icons/Write';
import WriteFilled from '@/shared/ui/icons/WriteFilled';
import { cn } from '@/shared/ui/styles/utils';

import { type BottomNavigationType } from '../model/BottomNavigation';
import { BottomNavigation } from '../model/BottomNavigation';

interface NavItemProps {
  nav: BottomNavigationType;
  icon: React.ReactNode;
  clickedIcon: React.ReactNode;
  isClicked: boolean;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({
  nav,
  icon,
  clickedIcon,
  isClicked,
  to,
}) => {
  return (
    <li className='flex-1 flex flex-col items-center'>
      <Link
        className='flex flex-col h-full w-full py-[9px] shadow-none items-center justify-center hover:bg-[#efefef]'
        to={to}
        aria-label={`${nav} 페이지로 이동`}
      >
        {isClicked ? clickedIcon : icon}
        <span
          className={cn(
            'text-[10px] text-[#222] mt-[2px]',
            isClicked ? 'font-semibold' : 'font-medium'
          )}
        >
          {nav}
        </span>
      </Link>
    </li>
  );
};

const BottomNavBar: React.FC<{ variant: 'white' | 'accent' }> = ({
  variant = 'white',
}) => {
  const pathname = useLocation({ select: (location) => location.pathname });

  const [selectedNav, setSelectedNav] = useState<BottomNavigationType>(
    BottomNavigation.record
  );

  const navItems: Omit<NavItemProps, 'isClicked'>[] = [
    {
      nav: BottomNavigation.record,
      icon: <Write size={24} color='#222222' />,
      clickedIcon: <WriteFilled size={24} color='#222222' />,
      to: '/expenses',
    },
    {
      nav: BottomNavigation.review,
      icon: <Review size={24} color='#222222' />,
      clickedIcon: <ReviewFilled size={24} color='#222222' />,
      to: '/expenses/review',
    },
    {
      nav: BottomNavigation.settings,
      icon: <Settings size={24} color='#222222' />,
      clickedIcon: <SettingsFilled size={24} color='#222222' />,
      to: '/settings',
    },
  ];

  useEffect(() => {
    const pathToNav = {
      '/expenses': BottomNavigation.record,
      '/expenses/review': BottomNavigation.review,
      '/settings': BottomNavigation.settings,
    };

    if (pathname in pathToNav) {
      setSelectedNav(pathToNav[pathname as keyof typeof pathToNav]);
    }
  }, [pathname]);

  return (
    <div
      className={cn(
        'mt-auto',
        variant === 'white' && 'bg-white',
        variant === 'accent' && 'bg-[#F5F3F0]'
      )}
    >
      <nav
        className={cn(
          'flex flex-row items-center w-full border-[1px] border-[#efefef] rounded-t-[16px] bg-white'
        )}
      >
        <ul className='flex flex-row w-full'>
          {navItems.map(({ nav, icon, clickedIcon, to }) => (
            <NavItem
              key={nav}
              nav={nav}
              icon={icon}
              clickedIcon={clickedIcon}
              isClicked={nav === selectedNav}
              to={to}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};
export default BottomNavBar;
