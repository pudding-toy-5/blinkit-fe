import { Button } from '@/components/ui/button';
import Record from '@/shared/ui/icons/Record';
import Review from '@/shared/ui/icons/Review';
import SettingsFilled from '@/shared/ui/icons/SettingsFilled';

interface NavItemProps {
  text: string;
  icon: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ text, icon }) => {
  return (
    <li className='flex-1'>
      <Button
        variant='ghost'
        className='flex flex-col h-auto w-auto has-[>svg]:p-0 items-center'
      >
        {icon}
        <span className='text-[10px] text-[#222] font-medium'>{text}</span>
      </Button>
    </li>
  );
};

const navItems: NavItemProps[] = [
  { text: '기록', icon: <Record size={24} color='#222222' /> },
  { text: '리뷰', icon: <Review size={24} color='#222222' /> },
  { text: '설정', icon: <SettingsFilled size={24} color='#222222' /> },
];

const BottomNavBar: React.FC = () => {
  return (
    <div className='fixed bottom-0 left-0 right-0 w-full min-w-[360px] max-w-[430px] mx-auto bg-white rounded-t-[16px]'>
      <nav className='flex flex-row items-center w-full'>
        <ul className='flex flex-row'>
          {navItems.map(({ text, icon }) => (
            <NavItem key={text} text={text} icon={icon} />
          ))}
        </ul>
      </nav>
    </div>
  );
};
export default BottomNavBar;
