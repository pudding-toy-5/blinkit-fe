import { cn } from '@/shared/ui/styles/utils';

interface NavItemProps {
  item: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, isSelected, onClick }) => {
  return (
    <li
      className={cn(
        'flex flex-1 items-center justify-center pb-[10px]',
        'text-[17px] text-[#999999] font-semibold',
        'border-b-[2px] border-transparent',
        isSelected && 'text-[#222222] border-[#222222]'
      )}
      onClick={onClick}
    >
      {item}
    </li>
  );
};

interface NavBarProps {
  selectedIndex: 0 | 1 | 2;
  setSelected: (index: 0 | 1 | 2) => void;
}

const BottomNavBar: React.FC<NavBarProps> = ({
  selectedIndex,
  setSelected,
}) => {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0',
        'w-full min-w-[360px] max-w-[430px] mx-auto',
        'rounded-t-[16px] border-t-[1px] border-[#efefef]'
      )}
    >
      <ul className='flex flex-row w-full'>
        <NavItem
          item='1'
          isSelected={selectedIndex === 0}
          onClick={() => {
            setSelected(0);
          }}
        />
        <NavItem
          item='2'
          isSelected={selectedIndex === 1}
          onClick={() => {
            setSelected(1);
          }}
        />
        <NavItem
          item='3'
          isSelected={selectedIndex === 2}
          onClick={() => {
            setSelected(2);
          }}
        />
      </ul>
    </nav>
  );
};

export default BottomNavBar;
