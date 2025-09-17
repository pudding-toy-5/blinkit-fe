import { Badge } from '@/shared/ui/atoms/badge';
import { Button } from '@/shared/ui/atoms/button';
import X from '@/shared/ui/icons/X';
import { cn } from '@/shared/lib/cn';

export interface CategoryTagProps {
  tagName: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  onDelete?: () => void;
}

const CategoryTag: React.FC<CategoryTagProps> = ({
  tagName,
  size = 'small',
  onClick,
  onDelete,
}) => {
  return (
    <Badge
      className={cn(
        'flex flex-row gap-[4px] items-center bg-[#EAF6EC] text-[#28A745] rounded-full text-[13px]',
        size === 'small' && 'px-[8px] py-[4px]',
        size === 'medium' && 'px-[12px] py-[8px]',
        size === 'large' && 'px-[16px] py-[12px]'
      )}
      aria-label={`카테고리: ${tagName}`}
      onClick={() => {
        if (onDelete === undefined && onClick) {
          onClick();
        }
      }}
    >
      {tagName}
      {onDelete && (
        <Button
          className='size-[12px]'
          size='icon'
          variant='ghost'
          aria-label={`category tag - ${tagName} - delete button`}
          onClick={() => {
            onDelete();
          }}
        >
          <X size={12} color='#28A745' />
        </Button>
      )}
    </Badge>
  );
};

export default CategoryTag;
