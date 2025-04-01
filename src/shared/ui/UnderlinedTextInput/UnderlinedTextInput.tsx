import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Delete from '@/shared/ui/icons/Delete';

import { cn } from '../styles/utils';

export interface UnderlinedTextInputProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  guideText?: string;
  maxLength?: number;
}

const UnderlinedTextInput: React.FC<UnderlinedTextInputProps> = ({
  value,
  onChange,
  placeholder,
  guideText,
  maxLength,
}) => {
  return (
    <div className='flex flex-col w-full p-4'>
      <div className='flex flex-row items-center'>
        <Input
          type='text'
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          maxLength={maxLength}
          placeholder={placeholder}
          className={cn(
            'w-full !h-5 !text-[17px] p-0',
            ' focus-visible:text-[#222] text-[#999]',
            'shadow-none focus-visible:ring-0 focus-visible:outline-none border-0 rounded-none'
          )}
        />
        {value.length > 0 && (
          <Button
            className='size-4 ml-auto'
            variant='ghost'
            onClick={() => {
              onChange('');
            }}
          >
            <Delete color='#CCCCCC' size={16} />
          </Button>
        )}
      </div>
      <div
        className={cn(
          'h-0 border w-full my-1 border-[#999] group-focus:border-[#222]'
        )}
      />
      <div className='flex flex-row'>
        {guideText && (
          <span className='text-[13px] text-[#555]'>{guideText}</span>
        )}
        {maxLength && (
          <span className={cn('flex flex-row ml-auto')}>
            <p
              className={cn(
                'text-[#222]'
                // value.length > maxLength && 'text-[#d32f2f]'
              )}
            >
              {value.length}
            </p>
            <p className='text-[#999]'>/{maxLength}</p>
          </span>
        )}
      </div>
    </div>
  );
};

export default UnderlinedTextInput;
