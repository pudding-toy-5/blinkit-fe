import { useRouter } from '@tanstack/react-router';

import { buttonVariants } from '@/components/ui/button';
import ArrowLeft from '@/shared/ui/icons/ArrowLeft';
import X from '@/shared/ui/icons/X';
import { cn } from '@/shared/ui/styles/utils';

export interface SubPageHeaderProps {
  title: string;
  back?: boolean;
  close?: boolean;
}

const SubPageHeader: React.FC<SubPageHeaderProps> = ({
  title,
  back,
  close,
}) => {
  const router = useRouter();

  const handleClickBack = () => {
    router.history.back();
  };

  const handleClickClose = () => {
    router.history.back();
  };

  return (
    <header className='flex flex-row justify-center items-center h-12 px-5 py-4'>
      {back && (
        <div
          aria-label='back button'
          role='button'
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute left-5 size-6'
          )}
          onClick={() => {
            handleClickBack();
          }}
        >
          <ArrowLeft size={24} />
        </div>
      )}
      <h1 className='text-[17px] text-[#222] font-semibold'>{title}</h1>
      {close && (
        <div
          aria-label='close button'
          role='button'
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-5 size-6'
          )}
          onClick={() => {
            handleClickClose();
          }}
        >
          <X size={24} />
        </div>
      )}
    </header>
  );
};

export default SubPageHeader;
