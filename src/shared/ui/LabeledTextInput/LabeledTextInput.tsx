import { cn } from '@/shared/lib/cn';
import { Input } from '@/shared/ui/atoms/input';
import { Label } from '@/shared/ui/atoms/label';

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
  return (
    <div className='flex flex-col items-center gap-2'>
      <Label
        className='mr-auto text-[15px] text-[#222] font-semibold'
        htmlFor={id}
      >
        {label}
      </Label>
      <Input
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
          'h-12',
          'text-[15px] p-4 transition-[color] shadow-none',
          'text-[#999] border-[#ccc] placeholder:text-[#999999]',
          'focus-visible:border-[#555] focus:outline-none focus-visible:ring-0 focus-visible:text-[#222]',
          'disabled:text-[#555555] disabled:border-[#cccccc] disabled:bg-[#efefef]',
          state === 'completed' && 'border-[#28a745]',
          state === 'disabled' &&
            'text-[#555555] border-[#cccccc] bg-[#efefef]',
          state === 'error' && 'border-[#d32f2f]'
        )}
      />
      {maxLength && value !== undefined && (
        <span aria-live='polite' className={cn('flex flex-row ml-auto')}>
          <p
            className={cn(
              'text-[#222] text-[13px]',
              state === 'error' && value.length > maxLength && 'text-[#d32f2f]'
            )}
          >
            {value.length}
          </p>
          <p className='text-[#999] text-[13px]'>/{maxLength}</p>
        </span>
      )}
    </div>
  );
};

export default LabeledTextInput;
