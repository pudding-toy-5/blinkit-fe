import { useLocation, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import Navigation from '@/shared/model/Navigation';
import Review from '@/shared/ui/icons/Review';
import ReviewFilled from '@/shared/ui/icons/ReviewFilled';
import Settings from '@/shared/ui/icons/Settings';
import SettingsFilled from '@/shared/ui/icons/SettingsFilled';
import Write from '@/shared/ui/icons/Write';
import WriteFilled from '@/shared/ui/icons/WriteFilled';
import { cn } from '@/shared/ui/styles/utils';

interface NavItemProps {
  nav: Navigation;
  icon: React.ReactNode;
  clickedIcon: React.ReactNode;
  isClicked: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  nav,
  icon,
  clickedIcon,
  isClicked,
  onClick,
}) => {
  return (
    <li className='flex-1 flex flex-col py-[9px] items-center'>
      <button
        className='flex flex-col h-auto w-auto has-[>svg]:p-0 shadow-none items-center'
        onClick={onClick}
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
      </button>
    </li>
  );
};

const BottomNavBar: React.FC<{ variant: 'white' | 'accent' }> = ({
  variant = 'white',
}) => {
  const navigate = useNavigate();
  const pathname = useLocation({ select: (location) => location.pathname });

  const [selectedNav, setSelectedNav] = useState<Navigation>(Navigation.record);

  const navItems: Omit<NavItemProps, 'isClicked'>[] = [
    {
      nav: Navigation.record,
      icon: <Write size={24} color='#222222' />,
      clickedIcon: <WriteFilled size={24} color='#222222' />,
      onClick: () => void navigate({ to: '/expenses' }),
    },
    {
      nav: Navigation.review,
      icon: <Review size={24} color='#222222' />,
      clickedIcon: <ReviewFilled size={24} color='#222222' />,
      onClick: () => void navigate({ to: '/expenses/review' }),
    },
    {
      nav: Navigation.settings,
      icon: <Settings size={24} color='#222222' />,
      clickedIcon: <SettingsFilled size={24} color='#222222' />,
      onClick: () => void navigate({ to: '/settings' }),
    },
  ];

  useEffect(() => {
    if (pathname === '/expenses') {
      setSelectedNav(Navigation.record);
    }
    if (pathname === '/expenses/review') {
      setSelectedNav(Navigation.review);
    }
    if (pathname === '/settings') {
      setSelectedNav(Navigation.settings);
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
          {navItems.map(({ nav, icon, clickedIcon, onClick }) => (
            <NavItem
              key={nav}
              nav={nav}
              icon={icon}
              clickedIcon={clickedIcon}
              isClicked={nav === selectedNav}
              onClick={onClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};
export default BottomNavBar;
