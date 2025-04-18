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
  onClickReview: () => void;
  onClickRetrospective: () => void;
}

const ReviewTopNavBar: React.FC<NavBarProps> = ({
  isRetrospective,
  onClickReview,
  onClickRetrospective,
}) => {
  return (
    <nav className='px-5 pt-4 border-b border-[#EFEFEF]'>
      <ul className='flex flex-row items-center justify-center gap-5'>
        <NavItem
          text='리뷰'
          isSelected={!isRetrospective}
          onClick={onClickReview}
        />
        <NavItem
          text='회고'
          isSelected={isRetrospective}
          onClick={onClickRetrospective}
        />
      </ul>
    </nav>
  );
};

export default ReviewTopNavBar;
