import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { cn } from '@/shared/ui/styles/utils';

export interface LabeledTextInputProps {
  label: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (newValue: string) => void;
  maxLength?: number;
  state?: 'completed' | 'disabled' | 'error';
}

const LabeledTextInput: React.FC<LabeledTextInputProps> = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  maxLength,
  state,
}) => {
  const inputRef = React.useRef(null);

  return (
    <div className='flex flex-col items-center gap-1.5'>
      <Label className='mr-auto text-base text-[#222]' htmlFor={id}>
        {label}
      </Label>
      <Input
        ref={inputRef}
        id={id}
        type='text'
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        disabled={state && state === 'disabled'}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        className={cn(
          'text-base text-[#999] border-[#999] ',
          'focus:border-[#222] focus:outlined-none focus:ring-0 focus:text-[#222]',
          state && state === 'completed' && 'border-[#28a745]',
          state && state === 'disabled' && 'border-[#ccc]',
          state && state === 'error' && 'border-[#d32f2f]'
        )}
      />
      {maxLength && value !== undefined && (
        <span aria-live='polite' className={cn('flex flex-row ml-auto')}>
          <p
            className={cn(
              'text-[#222]',
              state &&
                state === 'error' &&
                value.length > maxLength &&
                'text-[#d32f2f]'
            )}
          >
            {value.length}
          </p>
          <p className='text-[#999]'>/{maxLength}</p>
        </span>
      )}
    </div>
  );
};

export default LabeledTextInput;
