import { TooltipArrow } from '@radix-ui/react-tooltip';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Consumption } from '@/features/expense/model/types/ConsumptionKind';
import Check from '@/shared/ui/icons/Check';
import Exclamation from '@/shared/ui/icons/Exclamation';
import X from '@/shared/ui/icons/X';
import { cn } from '@/shared/ui/styles/utils';

import { ConsumptionKind } from '../../model/types/ConsumptionKind';

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
  const { title, description, tooltipText } = consumptionTexts;

  return (
    <div className='flex flex-row items-center rounded-[8px] px-4 py-5.5 bg-[#F5F3F0]'>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center gap-1'>
          <span className='text-[15px] text-[#222] font-semibold'>{title}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className='rotate-180'>
                  <Exclamation size={16} color='#999' />
                </div>
              </TooltipTrigger>
              <TooltipContent
                className='rounded-[4px] bg-[#222] text-white text-[13px] whitespace-pre-line p-2 font-normal'
                side='bottom'
                sideOffset={1}
                align='start'
                arrowPadding={16}
              >
                {tooltipText}
                <TooltipArrow fill='#222' />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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

interface Props {
  isOpen: boolean;
  setConsumptionKind: (consumptionKind: ConsumptionKind) => void;
  onOpenChange: (open: boolean) => void;
}

const consumptions: Consumption[] = [
  {
    consumptionKind: ConsumptionKind.essential,
    title: '필수 소비',
    description: '생존, 생활 유지에 반드시 필요한 소비',
    info: '예시로 월세, 공과금, 식비 등이 있어요.',
  },
  {
    consumptionKind: ConsumptionKind.conscious,
    title: '의식적 소비',
    description: '내 가치관에 따라 선택한 소비',
    info: '예시로 자기계발, 친구와의 약속 등이 있어요.',
  },
  {
    consumptionKind: ConsumptionKind.emotional,
    title: '감정적 소비',
    description: '필요 없거나 충동적으로 한 소비',
    info: '예시로 필요 없는 구독, 스트레스 해소용 쇼핑\n등이 있어요.',
  },
];

const ClassifyExpenseDrawer: React.FC<Props> = ({
  isOpen,
  setConsumptionKind,
  onOpenChange,
}) => {
  const [selectedKind, setSelectedKind] = useState<ConsumptionKind | null>(
    null
  );

  return (
    <Drawer
      open={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => {
        setSelectedKind(null);
      }}
    >
      <DrawerContent className='px-5 py-6 rounded-t-[20px] bg-white'>
        <DrawerHeader className='flex flex-col gap-0'>
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
        <div className='flex flex-col gap-2'>
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
            className='h-13 rounded-full text-white bg-[#222] font-semibold disabled:bg-[#CCC]'
            onClick={() => {
              if (selectedKind) {
                setConsumptionKind(selectedKind);
                setSelectedKind(null);
                onOpenChange(false);
              }
            }}
            disabled={selectedKind === null}
          >
            완료
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ClassifyExpenseDrawer;
