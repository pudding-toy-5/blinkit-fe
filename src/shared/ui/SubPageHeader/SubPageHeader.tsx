import { useRouter } from '@tanstack/react-router';

import ArrowLeft from '@/shared/ui/icons/ArrowLeft';
import X from '@/shared/ui/icons/X';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '../styles/utils';

export interface SubPageHeaderProps {
  title: string;
  back?: boolean;
  close?: boolean;
  onClose?: () => void;
}

const SubPageHeader: React.FC<SubPageHeaderProps> = ({
  title,
  back,
  close,
  onClose,
}) => {
  const router = useRouter();

  return (
    <header className='flex flex-row justify-center items-center h-12 px-5 py-4'>
      {back && (
        <div
          role='button'
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute left-5 size-6'
          )}
          onClick={() => {
            router.history.back();
          }}
        >
          <ArrowLeft size={24} />
        </div>
      )}
      <h1 className='ml-2 text-[17px] text-[#222] font-semibold'>{title}</h1>
      {close && (
        <div
          role='button'
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-5 size-6'
          )}
          onClick={onClose}
        >
          <X size={24} />
        </div>
      )}
    </header>
  );
};

export default SubPageHeader;
