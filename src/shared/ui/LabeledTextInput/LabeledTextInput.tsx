import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface LabeledTextInputProps {
  label: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (newValue: string) => void;
  maxLength?: number;
}

const LabeledTextInput: React.FC<LabeledTextInputProps> = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  maxLength,
}) => {
  const inputRef = React.useRef(null);

  return (
    <div className='flex flex-col items-center gap-1.5'>
      <Label className='mr-auto text-base' htmlFor={id}>
        {label}
      </Label>
      <Input
        ref={inputRef}
        id={id}
        type='text'
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
      />
      {maxLength && value !== undefined && (
        <p
          aria-label={`${id}-length-counter`}
          id={`${id}-length-counter`}
          className='ml-auto'
        >
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
};

export default LabeledTextInput;
