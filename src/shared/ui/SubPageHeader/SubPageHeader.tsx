import { Button, buttonVariants } from '@/shared/ui/atoms/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/atoms/drawer';
import ArrowLeft from '@/shared/ui/icons/ArrowLeft';
import X from '@/shared/ui/icons/X';
import { cn } from '@/shared/ui/styles/utils';

export interface SubPageHeaderProps {
  title?: string;
  onClickBack?: () => void;
  onClose?: () => void;
  onDelete?: () => void;
}

const SubPageHeader: React.FC<SubPageHeaderProps> = ({
  title,
  onClickBack,
  onClose,
  onDelete,
}) => {
  return (
    <header className='flex flex-row justify-center items-center h-14 px-5 py-4'>
      {onClickBack && (
        <div
          aria-label='back button'
          role='button'
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute left-5 size-6'
          )}
          onClick={onClickBack}
        >
          <ArrowLeft size={24} />
        </div>
      )}
      <h1 className='text-[17px] text-[#222] font-semibold'>{title}</h1>
      {onClose && (
        <Button
          aria-label='close button'
          variant='ghost'
          role='button'
          className={cn('absolute right-[20px] size-[24px] has-[>svg]:p-0')}
          onClick={onClose}
        >
          <X size={24} />
        </Button>
      )}
      {onDelete && (
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
          <DrawerContent className='py-8 px-5 !rounded-t-[20px]'>
            <DrawerHeader className='p-0'>
              <DrawerTitle className='text-[19px] text-[#222] font-semibold'>
                내역을 삭제할까요?
              </DrawerTitle>
              <DrawerDescription className='text-15px text-[#555]'>
                선택한 내역이 지출 내역에서 삭제돼요.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className='p-0 mt-9 gap-0'>
              <Button className='h-13 rounded-full' onClick={onDelete}>
                삭제
              </Button>
              <DrawerClose asChild>
                <button className='h-auto w-auto mx-auto mt-[25px] text-[15px] text-[#555] font-semibold'>
                  취소
                </button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </header>
  );
};

export default SubPageHeader;
