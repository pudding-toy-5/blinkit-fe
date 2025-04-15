import { cn } from '@/shared/ui/styles/utils';

interface NavItemProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ text, isSelected, onClick }) => {
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
      {text}
    </li>
  );
};

interface NavBarProps {
  isRetrospective: boolean;
  setIsRetrospective: (isRewind: boolean) => void;
}

const ReviewTopNavBar: React.FC<NavBarProps> = ({
  isRetrospective,
  setIsRetrospective,
}) => {
  return (
    <nav className='px-5 pt-4'>
      <ul className='flex flex-row items-center justify-center gap-5'>
        <NavItem
          text='리뷰'
          isSelected={!isRetrospective}
          onClick={() => {
            setIsRetrospective(false);
          }}
        />
        <NavItem
          text='회고'
          isSelected={isRetrospective}
          onClick={() => {
            setIsRetrospective(true);
          }}
        />
      </ul>
    </nav>
  );
};

export default ReviewTopNavBar;
