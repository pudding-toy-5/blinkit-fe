import { Button } from '@/components/ui/button';
import { cn } from '@/shared/ui/styles/utils';

export interface SubmitButtonProps {
  text: string;
  state: 'default' | 'disabled';
  onClick: () => void;
  className?: React.ComponentProps<'button'>['className'] | undefined;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  state,
  onClick,
  className,
}) => {
  return (
    <Button
      disabled={state === 'disabled'}
      onClick={onClick}
      className={cn(
        'h-13 rounded-[26px] text-white font-[15px]',
        state === 'default' && 'bg-[#222]',
        state === 'disabled' && 'bg-[#ccc]',
        className
      )}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
