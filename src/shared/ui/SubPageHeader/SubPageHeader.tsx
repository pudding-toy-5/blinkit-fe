import { useRouter } from '@tanstack/react-router';
import { X } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import ArrowLeft from '@/shared/ui/icons/ArrowLeft';
import { cn } from '@/shared/ui/styles/utils';

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

  const handleClickBack = () => {
    router.history.back();
  };

  const handleClickClose = () => {
    if (!onClose) {
      router.history.back();
      return;
    }

    onClose();
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
      {onClose && (
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant='ghost'
              className={cn(
                'text-[15px] text-[#222]',
                'absolute right-5 h-auto p-0'
              )}
            >
              삭제
            </Button>
          </DrawerTrigger>
          <DrawerContent className='w-full max-w-sm mx-auto py-8 px-5 rounded-t-[20px]'>
            <DrawerHeader className='p-0'>
              <DrawerTitle className='text-[19px] text-[#222] font-semibold'>
                내역을 삭제할까요?
              </DrawerTitle>
              <DrawerDescription className='text-15px text-[#555]'>
                선택한 내역이 지출 내역에서 삭제돼요.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className='p-0 mt-9'>
              <Button className='h-13 rounded-full' onClick={handleClickClose}>
                삭제
              </Button>
              <DrawerClose>
                <Button variant='ghost' className='h-13 w-full rounded-full'>
                  취소
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </header>
  );
};

export default SubPageHeader;
