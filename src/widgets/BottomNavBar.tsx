import { useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import Record from '@/shared/ui/icons/Record';
import Review from '@/shared/ui/icons/Review';
import SettingsFilled from '@/shared/ui/icons/SettingsFilled';

interface NavItemProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ text, icon, onClick }) => {
  return (
    <li className='flex-1 flex flex-col py-[9px] px-5 items-center'>
      <Button
        variant='ghost'
        className='flex flex-col h-auto w-auto has-[>svg]:p-0 shadow-none items-center'
        onClick={onClick}
      >
        {icon}
        <span className='text-[10px] text-[#222] font-medium'>{text}</span>
      </Button>
    </li>
  );
};

const BottomNavBar: React.FC = () => {
  const navigate = useNavigate();

  const navItems: NavItemProps[] = [
    {
      text: '기록',
      icon: <Record size={24} color='#222222' />,
      onClick: () => void navigate({ to: '/expenses' }),
    },
    {
      text: '리뷰',
      icon: <Review size={24} color='#222222' />,
      onClick: () => void navigate({ to: '/expenses/review' }),
    },
    {
      text: '설정',
      icon: <SettingsFilled size={24} color='#222222' />,
      onClick: () => void navigate({ to: '/settings' }),
    },
  ];

  return (
    <nav className='flex flex-row items-center w-full mt-auto bg-[#F5F3F0]'>
    <nav className='flex flex-row items-center w-full mt-auto'>
      <ul className='flex flex-row w-full'>
        {navItems.map(({ text, icon, onClick }) => (
          <NavItem key={text} text={text} icon={icon} onClick={onClick} />
        ))}
      </ul>
    </nav>
  );
};
export default BottomNavBar;
