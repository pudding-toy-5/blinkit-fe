import { PopoverArrow } from '@radix-ui/react-popover';
import { useState } from 'react';

import {
  consumptionConscious,
  consumptionEmotional,
  consumptionEssential,
} from '@/features/expense/consts';
import {
  Consumption,
  ConsumptionKind,
} from '@/features/expense/model/ConsumptionKind';
import { Button } from '@/shared/ui/atoms/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui/atoms/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/atoms/popover';
import Check from '@/shared/ui/icons/Check';
import Exclamation from '@/shared/ui/icons/Exclamation';
import X from '@/shared/ui/icons/X';
import { cn } from '@/shared/ui/styles/utils';

interface RadioItemProps {
  isSelected: boolean;
  consumption: Consumption;
  onClick: () => void;
}

const RadioItem: React.FC<RadioItemProps> = ({
  isSelected,
  consumption,
  onClick,
}) => {
  const { consumptionTexts } = consumption;
  const { title, description, helperText } = consumptionTexts;

  return (
    <div className='flex flex-row items-center rounded-[8px] px-4 py-5.5 bg-[#F5F3F0]'>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center gap-1'>
          <span className='text-[15px] text-[#222] font-semibold'>{title}</span>
          <Popover modal={true}>
            <PopoverTrigger>
              <div className='rotate-180'>
                <Exclamation size={16} color='#999' />
              </div>
            </PopoverTrigger>
            <PopoverContent
              className='rounded-[4px] bg-[#222] text-white pt-2 px-2 pb-0 text-[13px] whitespace-pre-wrap w-auto p-2 font-normal border-none'
              side='bottom'
              sideOffset={0}
              arrowPadding={16}
              align='start'
            >
              {helperText}
              <PopoverArrow
                fill='#222'
                width={14}
                height={10}
                style={{ visibility: 'visible' }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <span className='text-[13px] text-[#555] mt-1'>{description}</span>
      </div>
      <Button
        variant='ghost'
        className={cn(
          'w-6 h-6 ml-auto rounded-full shadow-none p-0',
          isSelected
            ? 'bg-[#89F336] p-[4px] hover:bg-[#89F336]'
            : 'bg-white border-[1px] border-[#CCC]'
        )}
        onClick={onClick}
      >
        {isSelected && <Check size={16} />}
      </Button>
    </div>
  );
};

const consumptions: Consumption[] = [
  consumptionEssential,
  consumptionConscious,
  consumptionEmotional,
];

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  setConsumptionKind: (consumptionKind: ConsumptionKind) => void;
}

const ConsumptionKindDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  setConsumptionKind,
}) => {
  const [selectedKind, setSelectedKind] = useState<ConsumptionKind>(
    ConsumptionKind.none
  );

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent className='px-5 py-6 rounded-t-[20px] bg-white'>
        <DrawerHeader className='flex flex-col gap-0 p-0'>
          <div className='flex flex-row'>
            <div className='flex-1' />
            <DrawerTitle className='font-[17px] font-semibold'>
              다음으로 분류
            </DrawerTitle>
            <DrawerClose className='flex-1 flex justify-end' asChild>
              <div role='button' aria-label='close button'>
                <X size={24} />
              </div>
            </DrawerClose>
          </div>
          <DrawerDescription className='text-[13px] text-[#555] mt-6'>
            지출 내역을 아래 소비 중 하나로 분류해 리뷰하세요.
            <br />
            리뷰한 결과는 회고 탭에서 확인할 수 있어요.
          </DrawerDescription>
        </DrawerHeader>
        <div className='flex flex-col gap-2 mt-6'>
          {consumptions.map((consumption) => (
            <RadioItem
              key={consumption.consumptionKind}
              isSelected={selectedKind === consumption.consumptionKind}
              consumption={consumption}
              onClick={() => {
                setSelectedKind(consumption.consumptionKind);
              }}
            />
          ))}
        </div>
        <DrawerFooter className='mt-8 p-0'>
          <Button
            type='button'
            className='h-13 rounded-full text-white bg-[#222] font-semibold disabled:bg-[#CCC]'
            onClick={() => {
              if (selectedKind !== ConsumptionKind.none) {
                setConsumptionKind(selectedKind);
                setSelectedKind(ConsumptionKind.none);
                onClose();
              }
            }}
            disabled={selectedKind === ConsumptionKind.none}
          >
            완료
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ConsumptionKindDrawer;
